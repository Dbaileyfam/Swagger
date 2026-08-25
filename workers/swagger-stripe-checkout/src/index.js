/**
 * Swagger Stripe checkout + paid R2 download delivery.
 * Supports one or more CD / digital-album line items per checkout.
 */

const PRODUCTS = {
  'trouble-cd': {
    name: 'Trouble on the Green — CD',
    amount: 1800,
    shipping: true,
  },
  'trouble-album': {
    name: 'Trouble on the Green — Digital download',
    amount: 1299,
    shipping: false,
    priceEnv: 'TROUBLE_ALBUM_PRICE_ID',
    r2Key: 'Albums/Trouble on the Green.zip',
  },
  'grave-cd': {
    name: 'The Grave — CD',
    amount: 1800,
    shipping: true,
    priceEnv: 'THE_GRAVE_CD_PRICE_ID',
  },
  'grave-album': {
    name: 'The Grave — Digital download',
    amount: 1299,
    shipping: false,
    priceEnv: 'THE_GRAVE_ALBUM_PRICE_ID',
    r2Key: 'Albums/The Grave zip.zip',
  },
  'america-land-cd': {
    name: 'America Land — CD',
    amount: 1800,
    shipping: true,
    priceEnv: 'America_Land_CD_Price_ID',
  },
  'america-land-album': {
    name: 'America Land — Digital download',
    amount: 1299,
    shipping: false,
    priceEnv: 'America_Land_Album_Price_ID',
    r2Key: 'Albums/America Land.zip',
  },
  'gypsy-road-cd': {
    name: 'Gypsy Road — CD',
    amount: 1800,
    shipping: true,
    priceEnv: 'Gypsy_Road_CD_Price_ID',
  },
  'gypsy-road-album': {
    name: 'Gypsy Road — Digital download',
    amount: 1299,
    shipping: false,
    priceEnv: 'Gypsy_Road_Album_Price_ID',
    r2Key: 'Albums/Gypsy Road.zip',
  },
}

const DEFAULT_SUCCESS =
  'https://dbaileyfam.github.io/Swagger/store?checkout=success&session_id={CHECKOUT_SESSION_ID}'
const DEFAULT_CANCEL =
  'https://dbaileyfam.github.io/Swagger/store?checkout=cancel'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Max-Age': '86400',
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...CORS_HEADERS,
    },
  })
}

function normalizeItems(body) {
  if (Array.isArray(body.items) && body.items.length > 0) {
    return body.items.map((item) => ({
      sku: typeof item?.sku === 'string' ? item.sku : '',
      quantity: Number(item?.quantity),
    }))
  }
  // Backward compatible single-item body
  if (typeof body.sku === 'string') {
    return [{ sku: body.sku, quantity: Number(body.quantity) }]
  }
  return null
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS })
    }

    if (request.method === 'GET' && url.pathname === '/') {
      return json({
        status: 'Swagger Stripe checkout is running',
        skus: Object.keys(PRODUCTS),
      })
    }

    if (
      request.method === 'POST' &&
      url.pathname === '/create-checkout-session'
    ) {
      return createCheckoutSession(request, env)
    }

    if (request.method === 'GET' && url.pathname === '/download') {
      return downloadPaidFile(url, env)
    }

    if (request.method === 'GET' && url.pathname === '/session-downloads') {
      return listSessionDownloads(url, env)
    }

    if (request.method === 'GET' && url.pathname === '/ads') {
      return listPublicAds(request, env)
    }

    if (request.method === 'POST' && url.pathname === '/ads') {
      return createPublicAd(request, env)
    }

    if (request.method === 'DELETE' && url.pathname === '/ads') {
      return deletePublicAd(request, env)
    }

    if (request.method === 'GET' && url.pathname === '/ad-image') {
      return servePublicAdImage(url, env)
    }

    return json({ error: 'Not found' }, 404)
  },
}

async function createCheckoutSession(request, env) {
  const secret = env.STRIPE_SECRET_KEY
  if (!secret) {
    return json({ error: 'STRIPE_SECRET_KEY is not configured' }, 500)
  }

  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON body' }, 400)
  }

  const items = normalizeItems(body)
  if (!items) {
    return json(
      {
        error: 'Provide items: [{ sku, quantity }] (or legacy sku + quantity)',
        supported: Object.keys(PRODUCTS),
      },
      400,
    )
  }

  if (items.length > 20) {
    return json({ error: 'Too many line items (max 20)' }, 400)
  }

  let needsShipping = false
  const digitalSkus = []

  for (const item of items) {
    const product = PRODUCTS[item.sku]
    if (!product) {
      return json(
        {
          error: `Unsupported sku: ${item.sku || '(missing)'}`,
          supported: Object.keys(PRODUCTS),
        },
        400,
      )
    }
    if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99) {
      return json(
        { error: `quantity for ${item.sku} must be an integer from 1 to 99` },
        400,
      )
    }
    if (product.shipping) needsShipping = true
    if (product.r2Key) digitalSkus.push(item.sku)
  }

  const successUrl = env.SUCCESS_URL || DEFAULT_SUCCESS
  const cancelUrl = env.CANCEL_URL || DEFAULT_CANCEL

  const params = new URLSearchParams()
  params.set('mode', 'payment')
  params.set('success_url', successUrl)
  params.set('cancel_url', cancelUrl)
  params.set('automatic_tax[enabled]', 'true')
  params.set('billing_address_collection', 'required')
  params.set('customer_creation', 'always')
  params.set('client_reference_id', items.map((item) => item.sku).join(','))
  params.set('metadata[skus]', items.map((item) => item.sku).join(','))
  params.set('metadata[digital_skus]', digitalSkus.join(','))
  if (items.length === 1) {
    params.set('metadata[sku]', items[0].sku)
  }

  items.forEach((item, index) => {
    const product = PRODUCTS[item.sku]
    const priceId = product.priceEnv ? env[product.priceEnv] : null
    params.set(`line_items[${index}][quantity]`, String(item.quantity))
    if (priceId) {
      params.set(`line_items[${index}][price]`, priceId)
    } else {
      params.set(`line_items[${index}][price_data][currency]`, 'usd')
      params.set(
        `line_items[${index}][price_data][unit_amount]`,
        String(product.amount),
      )
      params.set(
        `line_items[${index}][price_data][product_data][name]`,
        product.name,
      )
      params.set(`line_items[${index}][price_data][tax_behavior]`, 'exclusive')
    }
  })

  if (needsShipping) {
    params.set('shipping_address_collection[allowed_countries][0]', 'US')
  }

  const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secret}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  })

  const data = await stripeRes.json()
  if (!stripeRes.ok || !data.url) {
    return json(
      {
        error:
          data.error?.message ||
          `Stripe error (status ${stripeRes.status})`,
      },
      502,
    )
  }

  return json({ url: data.url })
}

async function getPaidSession(sessionId, env) {
  const secret = env.STRIPE_SECRET_KEY
  const stripeRes = await fetch(
    `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
    { headers: { Authorization: `Bearer ${secret}` } },
  )
  const session = await stripeRes.json()
  if (!stripeRes.ok) {
    return {
      error: session.error?.message || 'Could not load checkout session',
      status: 502,
    }
  }
  if (session.payment_status !== 'paid' && session.status !== 'complete') {
    return { error: 'Payment not completed', status: 402 }
  }
  return { session }
}

function digitalSkusFromSession(session) {
  const fromMeta = session.metadata?.digital_skus
  if (typeof fromMeta === 'string' && fromMeta.trim()) {
    return fromMeta
      .split(',')
      .map((sku) => sku.trim())
      .filter((sku) => PRODUCTS[sku]?.r2Key)
  }
  const single = session.metadata?.sku || session.client_reference_id
  if (single && PRODUCTS[single]?.r2Key) return [single]
  return []
}

async function listSessionDownloads(url, env) {
  const secret = env.STRIPE_SECRET_KEY
  const sessionId = url.searchParams.get('session_id')
  if (!secret) return json({ error: 'STRIPE_SECRET_KEY is not configured' }, 500)
  if (!sessionId) return json({ error: 'session_id is required' }, 400)

  const result = await getPaidSession(sessionId, env)
  if (result.error) return json({ error: result.error }, result.status)

  const origin = new URL(url).origin
  const downloads = digitalSkusFromSession(result.session).map((sku) => ({
    sku,
    name: PRODUCTS[sku].name,
    url: `${origin}/download?session_id=${encodeURIComponent(sessionId)}&sku=${encodeURIComponent(sku)}`,
  }))

  return json({ downloads })
}

async function downloadPaidFile(url, env) {
  const secret = env.STRIPE_SECRET_KEY
  const sessionId = url.searchParams.get('session_id')
  const requestedSku = url.searchParams.get('sku')
  if (!secret) return json({ error: 'STRIPE_SECRET_KEY is not configured' }, 500)
  if (!sessionId) return json({ error: 'session_id is required' }, 400)
  if (!env.DOWNLOADS_BUCKET) {
    return json({ error: 'DOWNLOADS_BUCKET is not configured' }, 500)
  }

  const result = await getPaidSession(sessionId, env)
  if (result.error) return json({ error: result.error }, result.status)

  const digitalSkus = digitalSkusFromSession(result.session)
  if (digitalSkus.length === 0) {
    return json(
      { error: 'This purchase does not include a digital download file' },
      400,
    )
  }

  let sku = requestedSku
  if (!sku) {
    if (digitalSkus.length === 1) {
      sku = digitalSkus[0]
    } else {
      return json(
        {
          error: 'Multiple downloads in this purchase — pass sku=',
          downloads: digitalSkus.map((digitalSku) => ({
            sku: digitalSku,
            name: PRODUCTS[digitalSku].name,
          })),
        },
        400,
      )
    }
  }

  if (!digitalSkus.includes(sku)) {
    return json({ error: `SKU not included in this paid session: ${sku}` }, 403)
  }

  const product = PRODUCTS[sku]
  const object = await env.DOWNLOADS_BUCKET.get(product.r2Key)
  if (!object) {
    return json({ error: `Download file missing: ${product.r2Key}` }, 404)
  }

  const filename = product.r2Key.split('/').pop() || 'download.zip'
  const headers = new Headers()
  object.writeHttpMetadata(headers)
  headers.set(
    'Content-Type',
    object.httpMetadata?.contentType || 'application/zip',
  )
  headers.set(
    'Content-Disposition',
    `attachment; filename="${filename.replace(/"/g, '')}"`,
  )
  headers.set('Cache-Control', 'no-store')
  headers.set(
    'Access-Control-Allow-Origin',
    CORS_HEADERS['Access-Control-Allow-Origin'],
  )

  return new Response(object.body, { headers })
}

const ADS_INDEX_KEY = 'public-ads/index.json'
const ADS_OBJECT_PREFIX = 'public-ads/'
const MAX_ADS = 12
const MAX_AD_IMAGE_BYTES = 4.5 * 1024 * 1024
const AD_IMAGE_TYPES = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
}

function isAdId(id) {
  return typeof id === 'string' && /^[a-z0-9]{10,32}$/.test(id)
}

function normalizeHref(value) {
  let trimmed = String(value || '').trim()
  if (!trimmed) return ''
  if (!/^https?:\/\//i.test(trimmed)) trimmed = `https://${trimmed}`
  try {
    const parsed = new URL(trimmed)
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null
    return parsed.toString()
  } catch {
    return null
  }
}

function instagramShortcode(url) {
  const match = String(url).match(
    /instagram\.com\/(?:[A-Za-z0-9._]+\/)?(?:reel|reels|p|tv)\/([A-Za-z0-9_-]+)/i,
  )
  return match ? match[1] : null
}

async function readAdsIndex(env) {
  if (!env.DOWNLOADS_BUCKET) return []
  const object = await env.DOWNLOADS_BUCKET.get(ADS_INDEX_KEY)
  if (!object) return []
  try {
    const data = await object.json()
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

async function writeAdsIndex(env, ads) {
  await env.DOWNLOADS_BUCKET.put(ADS_INDEX_KEY, JSON.stringify(ads), {
    httpMetadata: { contentType: 'application/json' },
  })
}

function publicAdPayload(ad, origin) {
  return {
    id: ad.id,
    text: ad.text,
    href: ad.href,
    createdAt: ad.createdAt,
    imageUrl: ad.imageKey
      ? `${origin}/ad-image?id=${encodeURIComponent(ad.id)}`
      : '',
  }
}

function adsUnauthorized(env) {
  if (!env.ADS_PASSWORD) {
    return json({ error: 'Poster password is not configured' }, 503)
  }
  return null
}

function passwordMatches(provided, expected) {
  return typeof provided === 'string' && provided.length > 0 && provided === expected
}

const FETCH_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15',
}

async function bufferFromImageResponse(response) {
  if (!response.ok) return null
  const contentType = (response.headers.get('content-type') || '').split(';')[0]
  if (!AD_IMAGE_TYPES[contentType]) return null
  const body = await response.arrayBuffer()
  if (body.byteLength < 32 || body.byteLength > MAX_AD_IMAGE_BYTES) return null
  return { body, contentType }
}

async function fetchInstagramStill(href) {
  const id = instagramShortcode(href)
  if (!id) return null
  const response = await fetch(`https://www.instagram.com/p/${id}/media/?size=l`, {
    headers: FETCH_HEADERS,
    redirect: 'follow',
  })
  return bufferFromImageResponse(response)
}

function firstMetaImage(html) {
  const patterns = [
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
    /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i,
  ]
  for (const pattern of patterns) {
    const match = html.match(pattern)
    if (match?.[1]) return match[1].replace(/&amp;/g, '&')
  }
  return null
}

async function fetchLinkedImage(href) {
  const fromInstagram = await fetchInstagramStill(href)
  if (fromInstagram) return fromInstagram

  const response = await fetch(href, {
    headers: FETCH_HEADERS,
    redirect: 'follow',
  })
  const asImage = await bufferFromImageResponse(response.clone())
  if (asImage) return asImage

  const html = (await response.text()).slice(0, 250000)
  const imageHref = firstMetaImage(html)
  if (!imageHref) return null
  try {
    const absolute = new URL(imageHref, href).toString()
    const imageResponse = await fetch(absolute, {
      headers: FETCH_HEADERS,
      redirect: 'follow',
    })
    return bufferFromImageResponse(imageResponse)
  } catch {
    return null
  }
}

async function listPublicAds(request, env) {
  const origin = new URL(request.url).origin
  const ads = await readAdsIndex(env)
  return json({ ads: ads.map((ad) => publicAdPayload(ad, origin)) })
}

async function createPublicAd(request, env) {
  const missing = adsUnauthorized(env)
  if (missing) return missing
  if (!env.DOWNLOADS_BUCKET) {
    return json({ error: 'DOWNLOADS_BUCKET is not configured' }, 500)
  }

  let password = ''
  let text = ''
  let rawHref = ''

  const contentTypeHeader = request.headers.get('content-type') || ''
  try {
    if (contentTypeHeader.includes('application/json')) {
      const body = await request.json()
      password = body.password
      text = String(body.text || '').trim().slice(0, 280)
      rawHref = body.href
    } else {
      const form = await request.formData()
      password = String(form.get('password') || '')
      text = String(form.get('text') || '').trim().slice(0, 280)
      rawHref = String(form.get('href') || '')
    }
  } catch {
    return json({ error: 'Could not read that poster' }, 400)
  }

  if (!passwordMatches(password, env.ADS_PASSWORD)) {
    return json({ error: 'Wrong poster password' }, 401)
  }

  const href = normalizeHref(rawHref)
  if (!href) {
    return json({ error: 'Paste the Instagram or ad URL' }, 400)
  }

  const ads = await readAdsIndex(env)
  if (ads.length >= MAX_ADS) {
    return json({ error: `The board is full (max ${MAX_ADS}). Remove one first.` }, 400)
  }

  const id = crypto.randomUUID().replace(/-/g, '').slice(0, 16)
  let imageKey = ''
  try {
    const pulled = await fetchLinkedImage(href)
    if (pulled) {
      imageKey = `${ADS_OBJECT_PREFIX}${id}`
      await env.DOWNLOADS_BUCKET.put(imageKey, pulled.body, {
        httpMetadata: { contentType: pulled.contentType },
      })
    }
  } catch {
    imageKey = ''
  }

  const ad = {
    id,
    text,
    href,
    imageKey,
    createdAt: new Date().toISOString(),
  }
  ads.unshift(ad)
  await writeAdsIndex(env, ads)

  return json({ ad: publicAdPayload(ad, new URL(request.url).origin) }, 201)
}

async function deletePublicAd(request, env) {
  const missing = adsUnauthorized(env)
  if (missing) return missing
  if (!env.DOWNLOADS_BUCKET) {
    return json({ error: 'DOWNLOADS_BUCKET is not configured' }, 500)
  }

  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON body' }, 400)
  }

  if (!passwordMatches(body.password, env.ADS_PASSWORD)) {
    return json({ error: 'Wrong poster password' }, 401)
  }
  if (!isAdId(body.id)) {
    return json({ error: 'Missing ad id' }, 400)
  }

  const ads = await readAdsIndex(env)
  const ad = ads.find((item) => item.id === body.id)
  if (!ad) return json({ error: 'That poster was already removed' }, 404)

  const next = ads.filter((item) => item.id !== body.id)
  await writeAdsIndex(env, next)
  if (
    typeof ad.imageKey === 'string' &&
    ad.imageKey.startsWith(ADS_OBJECT_PREFIX)
  ) {
    await env.DOWNLOADS_BUCKET.delete(ad.imageKey)
  }

  return json({ ok: true })
}

async function servePublicAdImage(url, env) {
  const id = url.searchParams.get('id')
  if (!isAdId(id) || !env.DOWNLOADS_BUCKET) {
    return new Response('Not found', { status: 404, headers: CORS_HEADERS })
  }

  const ads = await readAdsIndex(env)
  const ad = ads.find((item) => item.id === id)
  if (!ad || typeof ad.imageKey !== 'string' || !ad.imageKey.startsWith(ADS_OBJECT_PREFIX)) {
    return new Response('Not found', { status: 404, headers: CORS_HEADERS })
  }

  const object = await env.DOWNLOADS_BUCKET.get(ad.imageKey)
  if (!object) {
    return new Response('Not found', { status: 404, headers: CORS_HEADERS })
  }

  const headers = new Headers()
  object.writeHttpMetadata(headers)
  headers.set(
    'Content-Type',
    object.httpMetadata?.contentType || 'image/jpeg',
  )
  headers.set('Cache-Control', 'public, max-age=3600')
  headers.set(
    'Access-Control-Allow-Origin',
    CORS_HEADERS['Access-Control-Allow-Origin'],
  )
  return new Response(object.body, { headers })
}
