"use client";
import { removeFromFavorite } from "@/redux/features/favoriteSlice";
import { getDiscountedPricePercentage } from "@/utils/helper";
import Image from "next/image";

import { useRouter } from "next/navigation";
import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import ReactMarkdown from "react-markdown";
import { useDispatch } from "react-redux";

type ProductCardProps = {
  data: any;
  layoutButton?: string;
  className?: string;
  favoriteLayout?: boolean;
};

const ProductCard: React.FC<ProductCardProps> = ({
  data,
  layoutButton,
  className,
  favoriteLayout = false,
}) => {
  const product = data?.attributes;
  const handleScrollToTop = () => {
    window.scrollBy(0, -0.001);
  };
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div
      role="button"
      onClick={() => {
        if (!favoriteLayout) {
          router.push(`/product/${product?.slug}`);
        }
      }}
      className={`
      ${layoutButton === "grid" ? "" : "flex"}
      transform overflow-hidden bg-white duration-200 ${
        favoriteLayout ? "hover:scale-100" : "hover:scale-105"
      } hover:scale-105 cursor-pointer`}
    >
      <Image
        width={400}
        height={400}
        className={`
        mx-auto md:w-full md:h-auto  rounded-md max-w-full md:max-w-[400px] 
        ${className}
        ${favoriteLayout && "w-[120px] h-[120px]"}
        `}
        src={product?.thumbnail?.data?.attributes?.url}
        alt={product.name}
      />
      <div className="md:p-4 p-1 text-black/[0.9]">
        <h2 className="md:text-lg text-sm font-medium md:min-h-[56px]">{product.name}</h2>
        <div
          className={`${
            favoriteLayout ? "hidden" : "block"
          } flex items-center text-black/[0.5] `}
        >
          <p className="mr-2 text-lg font-semibold">${product.price}</p>
          {product.original_price && (
            <>
              <p className="text-base font-medium line-through">
                {product.original_price}
              </p>
              <p className="ml-auto text-base font-medium text-green-500">
                {getDiscountedPricePercentage(
                  product.original_price,
                  product.price
                )}
                % off
              </p>
            </>
          )}
        </div>
        <div
          className={`${favoriteLayout ? "md:mt-5 mt-2" : "mt-10"} ${
            layoutButton === "grid" ? "hidden" : "block"
          }`}
        >
          <ReactMarkdown className=" break-words text-ellipsis truncate w-full md:text-base text-xs">{product.description}</ReactMarkdown>
        </div>
        {!favoriteLayout ? (
          <div 
          role="button"
            className={`${layoutButton === "grid" ? "hidden" : "block"} ${
              favoriteLayout ? "hidden" : "block"
            } mt-20 rounded-md border-2 px-4 py-2 font-semibold text-sm flex items-center justify-center  hover:text-white hover:bg-black transition-all duration-200 ease-out`}
          >
            Buy Now
          </div>
        ) : (
          <div className="flex items-center md:mt-6 mt-2">
            <div
            role="button"
              onClick={() => {
                dispatch(removeFromFavorite({ ...data }));
                
                handleScrollToTop();
              }}
              className="md:w-10 w-6 md:h-10 h-6  rounded-full bg-black hover:bg-black/25 transition-all flex items-center justify-center"
            >
              <IoMdHeartEmpty className="text-white md:text-xl text-xs"  />
            </div>
            <div
            role="button"
              onClick={() => {
                router.push(`
            /product/${product?.slug}`);
              }}
              className="md:w-10 w-6 md:h-10 h-6  md:ml-5 ml-2 rounded-full bg-black hover:bg-black/25 transition-all flex items-center justify-center"
            >
              <FaChevronRight className="text-white md:text-xl text-xs" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProductCard;
