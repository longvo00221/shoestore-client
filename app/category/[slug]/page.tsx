"use client";
import ProductCard from "@/app/ProductCard";
import Wrapper from "@/app/components/Wrapper";
import { fetchDataFromApi } from "@/utils/api";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import useSWR from "swr";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Loading from "@/app/components/Loading";
import { motion } from "framer-motion";
import WindowIcon from "@mui/icons-material/Window";
import TableRowsIcon from "@mui/icons-material/TableRows";

const maxResult = 6;
const Category = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const filterPrices = [
    {
      id: 1,
      name: "Low To High",
    },
    {
      id: 2,
      name: "High To Low",
    },
  ];
  const [filterP, setFilterP] = useState([]);
  const [sortPrice, setSortPrice] = useState("");
  const handleChangeFilterPrice = async (event: any) => {
    setFilterP(event.target.value);
    setSortPrice(event.target.value);
    renderProduct();
  };

  const params = useParams();
  const slugFormParams = Array.isArray(params?.slug)
    ? params?.slug[0]
    : params?.slug;
  const headerCategory = decodeURIComponent(slugFormParams!);
  const [dataProduct, setDataProduct] = useState<Array<any>>([]);
  const { data, error, isLoading } = useSWR(
    `/api/products?populate=*&[filters][categories][slug][$eq]=${headerCategory}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`,
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
  const layoutProduct = [
    { id: 1, name: "grid", icon: <WindowIcon /> },
    { id: 2, name: "line", icon: <TableRowsIcon /> },
  ];
  const [layoutButton, setLayoutButton] = useState("grid");
  const renderProduct = () => {
    return (
      <>
        {data?.data
          ?.sort((a: any, b: any) => {
            if (sortPrice === "Low To High") {
              return a.attributes.price - b.attributes.price;
            } else if (sortPrice === "High To Low") {
              return b.attributes.price - a.attributes.price;
            } else {
              return 0;
            }
          })
          .map((product: any) => (
            <ProductCard
              layoutButton={layoutButton}
              key={product.id}
              data={product}
            />
          ))}
      </>
    );
  };
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
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <h1 className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight uppercase">
            {headerCategory}
          </h1>
        </div>
        <div className="flex items-center w-full justify-between">
          <div className="md:flex hidden">
            {layoutProduct.map((btn) => {
              return (
                <button
                  onClick={() => setLayoutButton(btn.name)}
                  key={btn.id}
                  className={`${
                    layoutButton === btn.name ? "bg-black/10" : ""
                  } p-3 rounded-md transition-all ease-out duration-150`}
                >
                  {btn.icon}
                </button>
              );
            })}
          </div>
          <div className="md:w-[150px] w-full">
            <FormControl sx={{width:'100%'}}>
              <InputLabel id="filter-producct-label">Price</InputLabel>
              <Select
                labelId="filter-product-label"

                id="filter-product"
                sx={{ width: "100%" }}
                value={filterP}
                onChange={(event) => handleChangeFilterPrice(event)}
                input={<OutlinedInput label="Name" />}
              >
                {filterPrices.map((filterprice) => {
                  return (
                    <MenuItem key={filterprice.id} value={filterprice.name}>
                      {filterprice.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </div>
        {isLoading ? (
          <div className="grid place-items-center my-20">
            <Loading />
          </div>
        ) : (
          <>
            <div
              className={`grid grid-cols-1
            ${layoutButton === "grid" ? "md:grid-cols-2" : "md:grid-cols-1"} 
            ${layoutButton === "grid" ? "lg:grid-cols-3 " : "lg:grid-cols-1"} 
             
            
            gap-5 my-14 px-5 md:px-0`}
            >
              {renderProduct()}
            </div>
            <div className="mx-auto grid place-items-center">
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
        {/* <Pagination/> */}
      </Wrapper>
    </motion.div>
  );
};
export default Category;
