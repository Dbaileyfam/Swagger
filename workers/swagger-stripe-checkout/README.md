# Swagger Stripe checkout worker

Cloudflare Worker used by the store:

- Checkout: `POST /create-checkout-session` `{ "items": [{ "sku", "quantity" }] }`
- Session downloads: `GET /session-downloads?session_id=cs_test_...`
- Download: `GET /download?session_id=cs_test_...&sku=grave-album`

## SKUs

| SKU | Product | Amount | Stripe price var | R2 object |
|---|---|---|---|---|
| `trouble-cd` | Trouble on the Green CD | $18.00 | `TROUBLE_CD_PRICE_ID` | — |
| `trouble-album` | Trouble on the Green digital | $12.99 | `TROUBLE_ALBUM_PRICE_ID` | `Albums/Trouble on the Green.zip` |
| `grave-cd` | The Grave CD | $18.00 | price_data fallback | — |
| `grave-album` | The Grave digital | $12.99 | `THE_GRAVE_ALBUM_PRICE_ID` | `Albums/The Grave zip.zip` |
| `america-land-cd` | America Land CD | $18.00 | price_data fallback | — |
| `america-land-album` | America Land digital | $12.99 | `America_Land_Album_Price_ID` | `Albums/America Land.zip` |
| `gypsy-road-cd` | Gypsy Road CD | $18.00 | price_data fallback | — |
| `gypsy-road-album` | Gypsy Road digital | $12.99 | `Gypsy_Road_Album_Price_ID` | `Albums/Gypsy Road.zip` |

## Deploy

```bash
cd workers/swagger-stripe-checkout
npx wrangler login
npx wrangler secret put STRIPE_SECRET_KEY   # sk_test_...
npx wrangler deploy
```
