/* eslint-disable @next/next/no-page-custom-font */
import React from "react";

type headProps = {};

const HeaderPage: React.FC<headProps> = () => {
  return (
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="shortcut icon" href="/static/favicon.ico" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Raleway:wght@200;300;400;500;600;700;800&family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Raleway:wght@200;300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <meta name="keywords" content="Shoe Shop" />
      <meta
        name="description"
        content="Shoe Shop have everything shoe you want "
      />
      <meta name="author" content="long, longvo010203@gmail.com" />
      <meta name="og:title" content="Shoe Shop" />
      <meta name="og:type" content="Shop" />
      <meta
        property="og:image"
        content="https://res.cloudinary.com/dvtv1j2rn/image/upload/v1683883491/Ecommerce%20Boutique/Images-6_ktn6lg.png"
      />
    </head>
  );
};
export default HeaderPage;
