const SITE_URL = 'https://ofluence.ai'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og/og-default.png`

export function seo(options: {
  title: string
  description?: string
  image?: string
  path?: string
  type?: 'website' | 'article'
}) {
  const image = options.image ?? DEFAULT_OG_IMAGE
  const canonical = options.path ? `${SITE_URL}${options.path}` : undefined

  return [
    { name: 'description', content: options.description },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: options.title },
    { property: 'og:description', content: options.description },
    { property: 'og:type', content: options.type ?? 'website' },
    { property: 'og:image', content: image },
    { property: 'og:site_name', content: 'Ofluence' },
    ...(canonical ? [{ property: 'og:url', content: canonical }] : []),
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: options.title },
    { name: 'twitter:description', content: options.description },
    { name: 'twitter:image', content: image },
  ]
}
