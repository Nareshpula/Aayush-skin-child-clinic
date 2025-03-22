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
  title = "Jyothi Diagnostics - No.1 Diagnostic Center in Madanapalle | Best Medical Testing Services",
  description = "Jyothi Diagnostics - Leading diagnostic center in Madanapalle offering 3.0 Tesla MRI, CT scan, digital X-ray, ultrasound & pregnancy scans. Best pathology lab in Annamayya district with expert radiologists.",
  keywords = "best diagnostics center in Madanapalle, radiology services in Madanapalle, digital X-ray center in Madanapalle, top diagnostic lab, MRI scan center near me in Madanapalle, ultrasound scan center in Madanapalle, blood test lab in Madanapalle, full body checkup in Madanapalle, 3.0 Tesla MRI scan in Madanapalle, health checkup packages in Madanapalle, trusted pathology lab in Madanapalle, best pregnancy scan center in Madanapalle, CT scan center in Madanapalle, best diagnostic center in Annamayya district",
  canonicalUrl = "https://www.jyothidiagnosticsmpl.com",
  ogImage = "https://www.jyothidiagnosticsmpl.com/og-image.jpg",
  noindex = false,
}: SEOProps) {
  const siteTitle = `${title} | Jyothi Diagnostics`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

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
      <meta name="author" content="Jyothi Diagnostics" />
      <meta name="geo.region" content="IN-AP" />
      <meta name="geo.placename" content="Madanapalle, Annamayya District" />
      <meta name="geo.position" content="13.558638427265453;78.50818108762539" />
      <meta name="ICBM" content="13.558638427265453, 78.50818108762539" />
    </Helmet>
  );
}