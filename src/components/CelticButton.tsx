import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type CelticButtonProps = {
  children: ReactNode
  className?: string
  'aria-label'?: string
  'aria-selected'?: boolean
  'aria-controls'?: string
  id?: string
  role?: ButtonHTMLAttributes<HTMLButtonElement>['role']
  tabIndex?: number
  to?: string
  href?: string
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
  onKeyDown?: ButtonHTMLAttributes<HTMLButtonElement>['onKeyDown']
  disabled?: boolean
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
  onKeyDown,
  disabled,
  target,
  rel,
  id,
  role,
  tabIndex,
  'aria-label': ariaLabel,
  'aria-selected': ariaSelected,
  'aria-controls': ariaControls,
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
    <button
      type={type}
      className={cls}
      id={id}
      role={role}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      aria-selected={ariaSelected}
      aria-controls={ariaControls}
      onClick={onClick}
      onKeyDown={onKeyDown}
      disabled={disabled}
    >
      <RingLabel>{children}</RingLabel>
    </button>
  )
}
