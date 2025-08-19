import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = "AnimateHub - Open Source Animation UI Library for Developers",
  description = "Discover 100+ open-source animation components built with React, Tailwind CSS, and pure CSS. Copy, paste, and animate your web projects instantly.",
  keywords = "animation library, react components, tailwind css, css animations, open source, ui components, web animations, frontend development",
  image = "https://animate-hub.vercel.app/og-image.png",
  url = "https://animate-hub.vercel.app/",
  type = "website",
  author = "AnimateHub",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="AnimateHub" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@AnimateHub" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
  author: PropTypes.string,
};

export default SEO;
