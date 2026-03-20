function OrganizationStructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Ofluence',
    url: 'https://ofluence.ai',
    logo: 'https://ofluence.ai/favicons/favicon.ico',
    description: 'The all-in-one influencer marketing platform for brands, agencies, and creators.',
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: 'https://ofluence.ai/contact',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export { OrganizationStructuredData }
