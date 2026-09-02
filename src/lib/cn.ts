import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Merges Tailwind classes safely: without this, a consumer-passed className can
// silently lose to a component's own hardcoded classes because Tailwind's cascade
// resolves by stylesheet order, not by class-attribute order.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
