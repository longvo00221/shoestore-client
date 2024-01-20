"use client";
import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../ProductCard";


type FavoriteListPageProps = {};

const FavoriteListPage: React.FC<FavoriteListPageProps> = () => {
  const favoriteItems = typeof window !== 'undefined'
  ? JSON.parse(localStorage.getItem('favoriteItems') || '[]')
  : [];

  return (
    <div className="w-full max-w-[1200px] px-1 md:px-10 mx-auto ">
      {favoriteItems.length === 0 ? (
        <div className="w-full h-screen flex items-center justify-center text-[#5d5d5d] font-semibold text-xl">
          Tell us what product you love, and you will see it here
        </div>
      ) : (
        <div
          className={`
        grid grid-cols-1
       
      
      gap-5 my-14 px-5 md:px-0`}
        >
          {favoriteItems.map((fav: any) => {
            return (
              <ProductCard
                key={fav.id}
                favoriteLayout={true}
                className="max-w-[300px] max-h-[300px]"
                data={fav}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
export default FavoriteListPage;
