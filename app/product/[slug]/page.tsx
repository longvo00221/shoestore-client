"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import Wrapper from "@/app/components/Wrapper";
import ProductDetailsCarousel from "@/app/components/ProductDetailsCarousel";
import { Button, Skeleton } from "@mui/material";
import RelatedProducts from "@/app/components/RelatedProducts";
import { fetchDataFromApi } from "@/utils/api";
import useSWR from "swr";

import { getDiscountedPricePercentage } from "@/utils/helper";
import ReactMarkdown from "react-markdown";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cartSlice";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import "react-loading-skeleton/dist/skeleton.css";
import {
  addToFavorite,
  removeFromFavorite,
} from "@/redux/features/favoriteSlice";
import { RedirectToSignIn, useUser } from "@clerk/nextjs";

const ProductDetail = ({}) => {
  const params = useParams();
  const dispatch = useDispatch();

  const { data, error, isLoading } = useSWR(
    `/api/products?populate=*&filters[slug][$eq]=${params?.slug}`,
    fetchDataFromApi
  );
  const [relatedProduct, setRelatedProduct] = useState();
  useEffect(() => {
    const fetchRelatedData = async () => {
      const res = await fetchDataFromApi(
        `/api/products?populate=*&[filters][slug][$ne]=${params?.slug}`
      );
      setRelatedProduct(res);
    };
    fetchRelatedData();
  }, [params]);
  const handleScrollToTop = () => {
    window.scrollBy(0, -0.001);
  };
  const [activeSize, setActiveSize] = useState();
  const [showError, setShowError] = useState(false);
  const variants = {
    hidden: { filter: "blur(50px)" },
    enter: { filter: "blur(0px)" },
    exit: { filter: "blur(50px)" },
  };
  const [isFavorite, setIsFavorite] = useState<boolean>();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const favoriteItems =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("favoriteItems") || "[]")
      : [];

  useEffect(() => {
    const handleCheckFavorite = async () => {
      if (!data || !data.data || data.data.length === 0) {
        return;
      }

      const isProductInFavorites = favoriteItems.some(
        (item: any) => item.id === data.data[0].id
      );

      if (!isProductInFavorites) {
        setIsFavorite(false);
      } else {
        setIsFavorite(true);
      }
    };

    handleCheckFavorite();
  }, [data, favoriteItems]);
  const { user } = useUser();
 
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: "ease-in", delay: 0.2 }}
      className="w-full md:py-20"
    >
      <Wrapper>
        {isLoading ? (
          <div
            id="containerProduct"
            className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]"
          >
            {/* LEft */}
            <div className="w-full relative md:w-auto flex-[1.5]  max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
              <Skeleton className="w-full md:absolute relative md:top-[-150px] top-0 h-full min-h-[800px]" />
            </div>
            {/* LEft */}
            {/* Right */}
            <div className="flex-1 py-3">
              <h1 className="text-[34px] font-semibold mb-2 leading-normal">
                <Skeleton />
              </h1>
              <p className="text-lg font-semibold mb-5">
                <Skeleton />
              </p>
              <div className="flex items-center justify-between">
                <p className="text-lg w-[50px] font-semibold mr-4">
                  <Skeleton />
                </p>
                <p className="w-[50px]">
                  <Skeleton />
                </p>
              </div>
              <p className="text-md font-medium text-black/[0.5]">
                <Skeleton />
              </p>
              <p className="text-md font-medium text-black/[0.5] mb-20">
                <Skeleton />
              </p>
              <div className="mb-10">
                <div className="flex justify-between mb-2">
                  <div className="text-md w-[50px] font-semibold">
                    <Skeleton />
                  </div>
                  <div className="text-md w-[50px] font-medium text-black/[0.5] cursor-pointer">
                    <Skeleton />
                  </div>
                </div>
                <div id="sizeGrid" className="grid grid-cols-3 gap-2">
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </div>
                {showError && (
                  <div className="text-red-600 mt-1">
                    Size Selection is required
                  </div>
                )}
              </div>
              <div>
                <button className="w-full min-w-0 py-4 rounded-md h-[50px]  text-white text-lg font-medium">
                  <Skeleton className="h-full" />
                </button>
                <button className="w-full min-w-0 py-4 rounded-md h-[50px]  text-white text-lg font-medium">
                  <Skeleton className="h-full" />
                </button>
              </div>
            </div>
            {/* Right */}
          </div>
        ) : (
          <div
            id="containerProduct"
            className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]"
          >
            {/* LEft */}
            <div className="w-full relative md:w-auto flex-[1.5]  max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
              <ProductDetailsCarousel
                images={data.data[0].attributes.image.data}
              />
            </div>
            {/* LEft */}
            {/* Right */}
            <div className="flex-1 py-3">
              <h1 className="text-[34px] font-semibold mb-2 leading-normal">
                {data.data[0].attributes.name}
              </h1>
              <p className="text-lg font-semibold mb-5">
                {data.data[0].attributes.subtitle}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold mr-4">
                  MRP: $ {data.data[0].attributes.price}
                </p>
                {data.data[0].attributes.original_price && (
                  <>
                    <p className="text-base font-medium line-through">
                      {data.data[0].attributes.original_price}
                    </p>
                    <p className="ml-auto text-base font-medium text-green-500">
                      {getDiscountedPricePercentage(
                        data.data[0].attributes.original_price,
                        data.data[0].attributes.price
                      )}
                      % off
                    </p>
                  </>
                )}
              </div>
              <p className="text-md font-medium text-black/[0.5]">
                incl. of taxes
              </p>
              <p className="text-md font-medium text-black/[0.5] mb-20">
                {`(Also includes all applicable duties)`}
              </p>
              <div className="mb-10">
                <div className="flex justify-between mb-2">
                  <div className="text-md font-semibold">Select Size</div>
                  <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                    Select Guide
                  </div>
                </div>
                <div id="sizeGrid" className="grid grid-cols-3 gap-2">
                  {data.data[0].attributes.size.data.map((size: any) => {
                    return (
                      <button
                        onClick={() => {
                          setActiveSize(size.size), setShowError(false);
                        }}
                        key={size.id}
                        className={`
                        ${
                          activeSize === size.size
                            ? "bg-black text-white hover:bg-black/[0.9]"
                            : ""
                        }
                         min-w-0 text-black rounded-md text-center py-3 font-medium hover:border-black hover:border cursor-pointer ${
                           size.enabled
                             ? "hover:border-black cursor-pointer"
                             : "cursor-not-allowed bg-black/[0.1] opacity-50"
                         }`}
                      >
                        {size.size}
                      </button>
                    );
                  })}
                </div>
                {showError && (
                  <div className="text-red-600 mt-1">
                    Size Selection is required
                  </div>
                )}
              </div>
              <div>
                <button
                  onClick={() => {
                    if (!activeSize) {
                      setShowError(true);
                      document.getElementById("sizeGrid")?.scrollIntoView({
                        block: "center",
                        behavior: "smooth",
                      });
                    } else {
                      dispatch(
                        addToCart({
                          ...data.data[0],
                          activeSize,
                          oneQuantityPrice: data.data[0].attributes.price,
                        })
                      );
                      handleScrollToTop();
                      toast.success("Check Your Cart");
                      }
                  }}
                  className="w-full min-w-0 py-4 rounded-md bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 hover:bg-black hover:scale-105"
                >
                  Add to cart
                </button>
                <button
                  onClick={() => {
                    const isProductInFavorites = favoriteItems.some(
                      (item: any) => item.id === data.data[0].id
                    );
                    if (isProductInFavorites) {
                      dispatch(removeFromFavorite({ ...data.data[0] }));
                      setIsFavorite(false);
                    } else {
                      dispatch(addToFavorite({ ...data.data[0] }));
                      setIsFavorite(true);
                    }
                    handleScrollToTop();
                  }}
                  className={`
                 ${isFavorite ? "text-white bg-black" : "text-black"}
                 w-full py-4 rounded-md border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10`}
                >
                  {isFavorite ? (
                    <>
                      <p>Remove from whishlist</p>
                      <IoMdHeart size={20} />
                    </>
                  ) : (
                    <>
                      <p>Add to whishlist</p>
                      <IoMdHeartEmpty size={20} />
                    </>
                  )}
                </button>
              </div>
              <div>
                <div className="text-lg font-bold mb-5">Product Details</div>
                <div className="text-md mb-5">
                  {data.data[0].attributes.name}
                </div>
                <div className="text-md mb-5">
                  <ReactMarkdown>
                    {data.data[0].attributes.description}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
            {/* Right */}
          </div>
        )}
        <RelatedProducts products={relatedProduct} />
      </Wrapper>
    </motion.div>
  );
};
export default ProductDetail;
