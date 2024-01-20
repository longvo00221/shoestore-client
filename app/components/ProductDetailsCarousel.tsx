/* eslint-disable @next/next/no-img-element */
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

type ProductDetailsCarouselProps = {
  images:any
};

const ProductDetailsCarousel: React.FC<ProductDetailsCarouselProps> = ({images}) => {
  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[80px]">
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        className="productCarousel"
      >
        {images.map((image:any) => {
          return(
            <img src={image.attributes.url} key={image.id} alt={image.attributes.name} />
          )
        })}
      </Carousel>
    </div>
  );
};
export default ProductDetailsCarousel;
