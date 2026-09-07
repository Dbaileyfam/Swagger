import { useEffect, useRef, useState } from 'react'

type HomeReelVideoProps = {
  src: string
  poster?: string
  caption?: string
}

export function HomeReelVideo({ src, poster, caption }: HomeReelVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const playMuted = () => {
      video.muted = true
      void video.play().catch(() => {})
    }

    playMuted()

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (entry.isIntersecting) playMuted()
        else video.pause()
      },
      { threshold: 0.25 },
    )
    observer.observe(video)

    return () => observer.disconnect()
  }, [src])

  return (
    <div className="home-reel__playback">
      <video
        ref={videoRef}
        className="home-reel__playback-video"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label={caption || 'Swagger reel'}
      />
      <button
        type="button"
        className="home-reel__sound"
        onClick={() => {
          const video = videoRef.current
          if (!video) return
          const nextMuted = !video.muted
          video.muted = nextMuted
          setMuted(nextMuted)
          void video.play().catch(() => {})
        }}
      >
        {muted ? 'Sound on' : 'Mute'}
      </button>
    </div>
  )
}
