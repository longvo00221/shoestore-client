"use client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import HeroBanner from "./components/HeroBanner";
import Wrapper from "./components/Wrapper";
import { fetchDataFromApi } from "@/utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import useSWR from "swr";
import Loading from "./components/Loading";
import { Pagination } from "@mui/material";
import { motion } from "framer-motion";
import MessengerPlugin from "./Messenger";
export default function Home() {
  const [dataProduct, setDataProduct] = useState<Array<any>>([]);
  const maxResult = 6;
  const [pageIndex, setPageIndex] = useState(1);
  const { data, error, isLoading } = useSWR(
    `/api/products?populate=*&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`,
    fetchDataFromApi,
    { fallback: dataProduct }
  );
  const handleChangePaginationPage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPageIndex(value);
  };
  const variants = {
    hidden: { filter: "blur(50px)" },
    enter: { filter: "blur(0px)" },
    exit: { filter: "blur(50px)" },
  };
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: "ease-in", delay: 0.7 }}
    >
      <HeroBanner />
      <MessengerPlugin  />
      <Wrapper>
  
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "ease-in", delay: 0.8 }}
            className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight"
          >
            Nike Is Our Life
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "ease-in", delay: 0.4 }}
            className="text-md md:text-xl"
          >
            A lightweight Nike ZoomX midsole is combined with increased stack
            heights to help provide cushioning during extended stretches of
            running
          </motion.p>
        </div>
        {/* head */}
        {isLoading ? (
          <div className="grid place-items-center my-20">
            <Loading />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
              {data?.data?.map((product: any) => (
                <ProductCard
                  layoutButton={"grid"}
                  key={product.id}
                  data={product}
                />
              ))}
            </div>
            <div className="grid place-items-center mb-16">
              <Pagination
                count={Math.ceil(
                  data.meta.pagination.total / data.meta.pagination.pageSize
                )}
                page={pageIndex}
                onChange={handleChangePaginationPage}
              />
            </div>
          </>
        )}
      </Wrapper>
    </motion.div>
  );
}
