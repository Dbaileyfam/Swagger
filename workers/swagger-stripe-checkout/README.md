# Swagger Stripe checkout worker

Cloudflare Worker used by the store:

- Checkout: `POST /create-checkout-session` `{ "items": [{ "sku", "quantity" }] }`
- Session downloads: `GET /session-downloads?session_id=cs_...`
- Download: `GET /download?session_id=cs_...&sku=grave-album`

## SKUs

| SKU | Product | Amount | Stripe price var | R2 object |
|---|---|---|---|---|
| `trouble-cd` | Trouble on the Green CD (out of publication) | $18.00 | — | — |
| `trouble-album` | Trouble on the Green digital | $12.99 | `TROUBLE_ALBUM_PRICE_ID` | `Albums/Trouble on the Green.zip` |
| `grave-cd` | The Grave CD | $18.00 | `THE_GRAVE_CD_PRICE_ID` | — |
| `grave-album` | The Grave digital | $12.99 | `THE_GRAVE_ALBUM_PRICE_ID` | `Albums/The Grave zip.zip` |
| `america-land-cd` | America Land CD | $18.00 | `America_Land_CD_Price_ID` | — |
| `america-land-album` | America Land digital | $12.99 | `America_Land_Album_Price_ID` | `Albums/America Land.zip` |
| `gypsy-road-cd` | Gypsy Road CD | $18.00 | `Gypsy_Road_CD_Price_ID` | — |
| `gypsy-road-album` | Gypsy Road digital | $12.99 | `Gypsy_Road_Album_Price_ID` | `Albums/Gypsy Road.zip` |

## Poster board

Band members can post Instagram links or photo ads from `/poster` (also linked as **Band poster** in the footer).

- List: `GET /ads`
- Publish: `POST /ads` JSON or form `{ "password", "href", "text?" }` — stores the URL so the homepage can embed the full post
- Remove: `DELETE /ads` `{ "password", "id" }`
- Image: `GET /ad-image?id=...`

Set the shared password with:

```bash
npx wrangler secret put ADS_PASSWORD
```

## Deploy

```bash
cd workers/swagger-stripe-checkout
npx wrangler login
npx wrangler secret put STRIPE_SECRET_KEY   # sk_live_...
npx wrangler deploy
```
