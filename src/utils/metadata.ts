import { Metadata } from 'next';

interface GenerateMetadataOptions {
  title?: string;
  description?: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
}

export function generateMetadata({
  title,
  description,
  image,
  keywords = [],
  noIndex = false,
}: GenerateMetadataOptions = {}): Metadata {
  const baseTitle = 'Kusina De Amadeo';
  const baseDescription = 'Authentic Filipino cuisine delivered to your doorstep';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://kusinaDeAmadeo.com';
  const baseImage = `${baseUrl}/images/og-image.jpg`;

  const fullTitle = title ? `${title} | ${baseTitle}` : baseTitle;
  const fullDescription = description || baseDescription;
  const ogImage = image || baseImage;

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: [
      'Filipino food',
      'Restaurant',
      'Food delivery',
      'Authentic cuisine',
      ...keywords,
    ],
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [ogImage],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
    alternates: {
      canonical: baseUrl,
    },
  };
}
