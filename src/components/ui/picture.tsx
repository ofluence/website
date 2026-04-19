import type { ImgHTMLAttributes } from 'react'

import { cn } from '@/utils/global.utils'

type PictureProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'loading'> & {
  src: string
  alt: string
  width: number
  height: number
  /**
   * Marks this as an LCP-candidate image. Emits fetchpriority="high" and
   * loading="eager". Only one image per route should be marked priority.
   */
  priority?: boolean
  /**
   * Render a `<picture>` with AVIF + WebP sources for URLs whose query
   * params the format-negotiator helper understands (Unsplash, at present).
   * Plain `<img>` otherwise.
   */
  sizes?: string
}

const UNSPLASH_HOST = 'images.unsplash.com'

function withUnsplashFormat(src: string, format: 'avif' | 'webp'): string | null {
  try {
    const url = new URL(src)
    if (url.host !== UNSPLASH_HOST) return null
    url.searchParams.set('fm', format)
    return url.toString()
  } catch {
    return null
  }
}

/**
 * `<picture>` wrapper that negotiates AVIF/WebP for supported hosts
 * (Unsplash today) and always emits width/height to reserve layout.
 *
 * Usage:
 *   <Picture src={url} alt="..." width={400} height={600} />
 *   <Picture src={hero} alt="..." width={1200} height={800} priority />
 */
export function Picture({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  sizes,
  ...rest
}: PictureProps) {
  const avifUrl = withUnsplashFormat(src, 'avif')
  const webpUrl = withUnsplashFormat(src, 'webp')

  const common = {
    alt,
    width,
    height,
    decoding: (priority ? 'sync' : 'async') as 'sync' | 'async',
    loading: (priority ? 'eager' : 'lazy') as 'eager' | 'lazy',
    fetchPriority: priority ? 'high' : 'auto',
    className: cn(className),
    sizes,
    ...rest,
  }

  if (!avifUrl && !webpUrl) {
    return <img src={src} {...common} />
  }

  return (
    // `display: contents` makes <picture> layout-transparent so `className`
    // styles on the <img> (e.g. `size-full`, `object-cover`) behave exactly
    // as they would on a bare <img>.
    <picture style={{ display: 'contents' }}>
      {avifUrl && <source type="image/avif" srcSet={avifUrl} />}
      {webpUrl && <source type="image/webp" srcSet={webpUrl} />}
      <img src={src} {...common} />
    </picture>
  )
}
