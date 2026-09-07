type InstagramEmbedProps = {
  permalink: string
  caption?: string
  imageUrl?: string
}

export function InstagramEmbed({ permalink, caption, imageUrl }: InstagramEmbedProps) {
  return (
    <a
      className="home-reel__card home-reel__card--play"
      href={permalink}
      target="_blank"
      rel="noreferrer"
    >
      {imageUrl ? (
        <img src={imageUrl} alt={caption || 'Swagger Instagram post'} />
      ) : (
        <span className="home-reel__watch-label">Watch on Instagram</span>
      )}
      <span className="home-reel__play" aria-hidden="true" />
    </a>
  )
}
