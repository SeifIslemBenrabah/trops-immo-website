import { SITE_NAME, absoluteUrl } from "../lib/siteConfig";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
}

/**
 * React 19 hoists <title>/<meta>/<link> rendered anywhere in the tree into
 * <head> automatically, so this needs no portal or extra dependency.
 */
export default function Seo({ title, description, path, image, noindex }: SeoProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = absoluteUrl(path);

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}

      <meta name="twitter:card" content={image ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </>
  );
}
