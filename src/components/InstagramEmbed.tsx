type InstagramEmbedProps = {
  permalink: string
  caption?: string
  imageUrl?: string
}

export function InstagramEmbed({ permalink, caption, imageUrl }: InstagramEmbedProps) {
  if (imageUrl) {
    return (
      <a
        className="home-reel__card"
        href={permalink}
        target="_blank"
        rel="noreferrer"
      >
        <img src={imageUrl} alt={caption || 'Swagger Instagram post'} />
      </a>
    )
  }

  return (
    <iframe
      className="home-reel__page home-reel__instagram"
      title={caption || 'Swagger Instagram post'}
      src={`${permalink}embed/`}
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
    />
  )
}
