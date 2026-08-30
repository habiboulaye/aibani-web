export type StatItem = {
  id: string
  label: string
  value: number | string
  confirmed?: boolean
}

export type Testimonial = {
  id: string
  quote: string
  author: string
  role?: string
}
