import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type CelticButtonProps = {
  children: ReactNode
  className?: string
  'aria-label'?: string
  to?: string
  href?: string
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
  target?: string
  rel?: string
}

function RingLabel({ children }: { children: ReactNode }) {
  return (
    <>
      <img
        src={`${import.meta.env.BASE_URL}celtic-ring-weave.png`}
        alt=""
        className="celtic-link__ring"
        width={320}
        height={320}
      />
      <span className="celtic-link__label">{children}</span>
    </>
  )
}

export function CelticButton({
  children,
  className = '',
  to,
  href,
  type = 'button',
  onClick,
  target,
  rel,
  'aria-label': ariaLabel,
}: CelticButtonProps) {
  const cls = ['celtic-link', className].filter(Boolean).join(' ')

  if (to) {
    return (
      <Link to={to} className={cls} aria-label={ariaLabel} onClick={onClick as (() => void) | undefined}>
        <RingLabel>{children}</RingLabel>
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        target={target}
        rel={rel}
        onClick={onClick as (() => void) | undefined}
      >
        <RingLabel>{children}</RingLabel>
      </a>
    )
  }

  return (
    <button type={type} className={cls} aria-label={ariaLabel} onClick={onClick}>
      <RingLabel>{children}</RingLabel>
    </button>
  )
}
