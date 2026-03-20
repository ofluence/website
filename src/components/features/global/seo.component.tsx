const SITE_URL = 'https://ofluence.ai'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og/og-default.png`

interface SeoProps {
  title: string
  description: string
  path: string
  ogImage?: string
  type?: 'website' | 'article'
}

function Seo({ title, description, path, ogImage, type = 'website' }: SeoProps) {
  const fullTitle = `${title} — Ofluence`
  const canonicalUrl = `${SITE_URL}${path}`
  const image = ogImage ?? DEFAULT_OG_IMAGE

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Ofluence" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  )
}

export { Seo }
export type { SeoProps }
