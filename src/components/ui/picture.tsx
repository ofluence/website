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
   * Standard `sizes` attribute for responsive selection. Required for
   * `srcset` to do anything useful — without it, browsers assume 100vw.
   */
  sizes?: string
}

const UNSPLASH_HOST = 'images.unsplash.com'

// Widths used to generate srcset candidates for Unsplash URLs. Covers avatar
// (~64px @ 2DPR) through hero (~800px @ 2DPR on large viewports).
const SRCSET_WIDTHS = [64, 128, 200, 300, 400, 600, 800] as const

function isUnsplash(src: string): URL | null {
  try {
    const url = new URL(src)
    return url.host === UNSPLASH_HOST ? url : null
  } catch {
    return null
  }
}

/**
 * Builds a `srcset` string of multiple widths for an Unsplash URL, crop-locked
 * to the caller-provided aspect ratio. Any pre-existing `w`/`h`/`fit` params
 * are replaced.
 */
function buildUnsplashSrcSet(
  base: URL,
  aspectWidth: number,
  aspectHeight: number,
  format?: 'avif' | 'webp'
): string {
  return SRCSET_WIDTHS.map((w) => {
    const url = new URL(base.toString())
    const h = Math.round((w * aspectHeight) / aspectWidth)
    url.searchParams.set('w', String(w))
    url.searchParams.set('h', String(h))
    url.searchParams.set('fit', 'crop')
    if (format) url.searchParams.set('fm', format)
    return `${url.toString()} ${w}w`
  }).join(', ')
}

function buildUnsplashSrc(
  base: URL,
  aspectWidth: number,
  aspectHeight: number,
  format?: 'avif' | 'webp'
): string {
  const url = new URL(base.toString())
  url.searchParams.set('w', String(aspectWidth))
  url.searchParams.set('h', String(aspectHeight))
  url.searchParams.set('fit', 'crop')
  if (format) url.searchParams.set('fm', format)
  return url.toString()
}

/**
 * `<picture>` wrapper that negotiates AVIF/WebP for supported hosts (Unsplash
 * today) and emits a multi-width `srcset` so the browser fetches a size that
 * matches rendered pixels. Always emits width/height to reserve layout.
 *
 * Usage:
 *   <Picture src={url} alt="..." width={400} height={600} sizes="(min-width: 768px) 33vw, 100vw" />
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
  const unsplash = isUnsplash(src)

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

  if (!unsplash) {
    return <img src={src} alt={alt} {...common} />
  }

  const avifSrcSet = buildUnsplashSrcSet(unsplash, width, height, 'avif')
  const webpSrcSet = buildUnsplashSrcSet(unsplash, width, height, 'webp')
  const fallbackSrc = buildUnsplashSrc(unsplash, width, height)
  const fallbackSrcSet = buildUnsplashSrcSet(unsplash, width, height)

  return (
    // `display: contents` makes <picture> layout-transparent so `className`
    // styles on the <img> (e.g. `size-full`, `object-cover`) behave exactly
    // as they would on a bare <img>.
    <picture style={{ display: 'contents' }}>
      <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      <img src={fallbackSrc} srcSet={fallbackSrcSet} alt={alt} {...common} />
    </picture>
  )
}
