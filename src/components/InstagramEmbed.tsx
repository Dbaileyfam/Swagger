type InstagramEmbedProps = {
  permalink: string
  caption?: string
}

export function InstagramEmbed({ permalink, caption }: InstagramEmbedProps) {
  return (
    <iframe
      className="home-reel__page home-reel__instagram"
      title={caption || 'Swagger Instagram post'}
      src={`${permalink}embed/`}
      loading="lazy"
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
    />
  )
}
