import type { ReactNode } from 'react'
import { Arrow } from './Arrow'

type FeatureCardProps = {
  index: string
  eyebrow: string
  title: string
  description: string
  href: string
  children?: ReactNode
}

export function FeatureCard({ index, eyebrow, title, description, href, children }: FeatureCardProps) {
  return <a className="feature-card" href={href}>
    <span className="feature-card-index">{index}</span>
    <span className="feature-card-icon" aria-hidden="true">{children ?? '✳'}</span>
    <span className="eyebrow">{eyebrow}</span>
    <strong>{title}<Arrow diagonal /></strong>
    <span className="feature-description">{description}</span>
  </a>
}
