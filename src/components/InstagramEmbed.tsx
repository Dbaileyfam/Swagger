import { useEffect } from 'react'

type InstagramEmbedProps = {
  permalink: string
  caption?: string
}

type InstagramSDK = {
  Embeds: { process: () => void }
}

function instagramWindow() {
  return window as Window & { instgrm?: InstagramSDK }
}

export function InstagramEmbed({ permalink, caption }: InstagramEmbedProps) {
  useEffect(() => {
    const sdk = instagramWindow()
    const process = () => sdk.instgrm?.Embeds.process()

    if (sdk.instgrm) {
      process()
      return
    }

    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.instagram.com/embed.js"]',
    )
    if (existing) {
      existing.addEventListener('load', process)
      return () => existing.removeEventListener('load', process)
    }

    const script = document.createElement('script')
    script.src = 'https://www.instagram.com/embed.js'
    script.async = true
    script.onload = process
    document.body.appendChild(script)
  }, [permalink])

  return (
    <blockquote
      className="instagram-media home-reel__instagram"
      data-instgrm-captioned
      data-instgrm-permalink={`${permalink}?utm_source=ig_embed`}
      data-instgrm-version="14"
      style={{
        background: '#fff',
        border: 0,
        borderRadius: '12px',
        margin: 0,
        maxWidth: '540px',
        minWidth: '326px',
        padding: 0,
        width: 'calc(100% - 2px)',
      }}
    >
      <a href={permalink} target="_blank" rel="noreferrer">
        {caption || 'View this post on Instagram'}
      </a>
    </blockquote>
  )
}
