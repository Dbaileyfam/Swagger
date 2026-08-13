/**
 * Swagger Stripe sandbox checkout + paid R2 download delivery.
 * Supports one or more CD / digital-album line items per checkout.
 */

const PRODUCTS = {
  'trouble-cd': {
    name: 'Trouble on the Green — CD',
    amount: 1800,
    shipping: true,
    priceEnv: 'TROUBLE_CD_PRICE_ID',
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
  'Access-Control-Allow-Origin': 'https://dbaileyfam.github.io',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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
