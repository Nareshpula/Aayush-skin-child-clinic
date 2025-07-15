import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  noindex?: boolean;
}

export default function SEO({
  title = "Aayush Child & Skin Hospital - Madanapalle",
  description = "Aayush Child & Skin Hospital - Leading healthcare provider in Madanapalle offering specialized pediatric care, dermatology treatments, NICU, PICU, skin care, hair treatments, and cosmetic procedures with expert doctors.",
  keywords = "best child hospital in Madanapalle, skin specialist in Madanapalle, pediatric care in Madanapalle, dermatology clinic Madanapalle, NICU PICU services, children's healthcare, acne treatment, pigmentation treatment, hair loss treatment, laser hair removal, cosmetic procedures, child specialist doctor, skin doctor in Madanapalle, Annamayya district hospital",
  canonicalUrl = "https://www.aayushhospitalmpl.com",
  ogImage = "https://www.aayushhospitalmpl.com/og-image.jpg",
  noindex = false,
}: SEOProps) {
  const siteTitle = title;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots\" content="noindex,nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Aayush Child & Skin Hospital" />
      <meta name="geo.region" content="IN-AP" />
      <meta name="geo.placename" content="Madanapalle, Annamayya District" />
      <meta name="geo.position" content="13.558638427265453;78.50818108762539" />
      <meta name="ICBM" content="13.558638427265453, 78.50818108762539" />
    </Helmet>
  );
}