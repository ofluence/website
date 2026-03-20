import React, { useEffect, useRef, useState } from 'react'

import { cn } from '@/utils/global.utils'

// Types for the component props
interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  sizes?: string
  loading?: 'lazy' | 'eager'
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  objectPosition?: string
  onLoad?: () => void
  onError?: () => void
  fallbackSrc?: string
  containerClassName?: string
  showLoadingSpinner?: boolean
}

/**
 * Computes blur placeholder background styles based on placeholder mode and blur data URL
 */
const getBlurPlaceholderStyles = (
  placeholder: 'blur' | 'empty',
  blurDataURL?: string
): React.CSSProperties => {
  if (placeholder !== 'blur') return {}
  return {
    backgroundImage: blurDataURL
      ? `url(${blurDataURL})`
      : 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)',
    backgroundSize: blurDataURL ? 'cover' : '20px 20px',
    backgroundPosition: blurDataURL ? 'center' : '0 0, 0 10px, 10px -10px, -10px 0px',
    filter: 'blur(5px)',
  }
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  sizes,
  loading = 'lazy',
  objectFit = 'cover',
  objectPosition = 'center',
  onLoad,
  onError,
  fallbackSrc,
  className,
  containerClassName,
  showLoadingSpinner = true,
  style,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [currentSource, setCurrentSource] = useState(src)
  const [isInView, setIsInView] = useState(priority)
  const imgRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    // For priority or eager loading, we skip observer and rely on derived rendering
    if (priority || loading === 'eager') {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [priority, loading])

  // Handle image load
  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  // Handle image error
  const handleError = () => {
    setIsError(true)
    setIsLoading(false)
    if (fallbackSrc && currentSource !== fallbackSrc) {
      setCurrentSource(fallbackSrc)
      setIsError(false)
      setIsLoading(true)
    }
    onError?.()
  }

  // Generate srcSet for responsive images
  const generateSourceSet = () => {
    // eslint-disable-next-line unicorn/no-useless-undefined
    if (!sizes) return undefined

    const widths = [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
    return widths.map((width) => `${src}?w=${width}&q=${quality} ${width}w`).join(', ')
  }

  // Container styles
  const containerStyles: React.CSSProperties = {
    position: fill ? 'relative' : undefined,
    width: fill ? '100%' : width,
    height: fill ? '100%' : height,
    ...(!fill && width && height ? { aspectRatio: `${width} / ${height}` } : {}),
  }

  // Image styles
  const imageStyles: React.CSSProperties = {
    objectFit,
    objectPosition,
    ...(fill
      ? {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }
      : {
          width: width || '100%',
          height: height || 'auto',
        }),
    ...style,
  }

  // Blur placeholder styles
  const blurPlaceholderStyles = getBlurPlaceholderStyles(placeholder, blurDataURL)

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden', fill && 'h-full w-full', containerClassName)}
      style={containerStyles}
    >
      {/* Blur placeholder */}
      {placeholder === 'blur' && isLoading && (
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={blurPlaceholderStyles}
        />
      )}

      {/* Loading spinner */}
      {showLoadingSpinner && isLoading && !isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900 dark:border-gray-100" />
        </div>
      )}

      {/* Error state */}
      {isError && !fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
          <div className="text-center">
            <div className="mb-2 text-2xl">📷</div>
            <div className="text-sm">Failed to load image</div>
          </div>
        </div>
      )}

      {/* Main image */}
      {(priority || loading === 'eager' || isInView) && (
        <img
          ref={imgRef}
          src={currentSource}
          alt={alt}
          className={cn(
            'transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100',
            className
          )}
          style={imageStyles}
          srcSet={generateSourceSet()}
          sizes={sizes}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      )}
    </div>
  )
}

export default Image
