import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

export default function SEO({
  title = "Chine Cargo Logis - Transport et Logistique International depuis la Chine",
  description = "Chine Cargo Logis, votre partenaire de confiance pour le transport maritime, aérien, routier et ferroviaire depuis la Chine. Solutions logistiques professionnelles avec suivi en temps réel.",
  keywords = "transport chine, logistique internationale, fret maritime, fret aérien, transport routier, transport ferroviaire, expédition chine, cargo chine, livraison internationale, suivi colis",
  canonical,
  ogImage = "https://www.chinecargologis.com/logo512x512.png",
  noindex = false
}: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    }

    // Update Open Graph title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }

    // Update Open Graph description
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }

    // Update Open Graph image
    const ogImageMeta = document.querySelector('meta[property="og:image"]');
    if (ogImageMeta) {
      ogImageMeta.setAttribute('content', ogImage);
    }

    // Update Twitter title
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title);
    }

    // Update Twitter description
    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', description);
    }

    // Update canonical URL
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical);
    }

    // Update robots meta
    const robotsMeta = document.querySelector('meta[name="robots"]');
    if (robotsMeta) {
      robotsMeta.setAttribute('content', noindex ? 'noindex, nofollow' : 'index, follow');
    }

    // Add structured data for current page
    const existingStructuredData = document.querySelector('#page-structured-data');
    if (existingStructuredData) {
      existingStructuredData.remove();
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": title,
      "description": description,
      "url": canonical || window.location.href,
      "isPartOf": {
        "@type": "WebSite",
        "name": "Chine Cargo Logis",
        "url": window.location.origin
      },
      "inLanguage": "fr-FR",
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${window.location.origin}/track?tracking={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };

    const script = document.createElement('script');
    script.id = 'page-structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

  }, [title, description, keywords, canonical, ogImage, noindex]);

  return null;
}
