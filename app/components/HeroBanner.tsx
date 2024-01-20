/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { Button } from "@mui/material";
import Wrapper from "./Wrapper";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import {motion} from 'framer-motion'
import { useRouter } from "next/navigation";
const HeroBanner = () => {
  const router = useRouter()
  return (
    <Wrapper className="mt-10">
      <motion.div initial={{opacity:0,y:-30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{type:"keyframes", delay:0.6}} className="relative text-white text-[20px] w-full max-w-[1360px] mx-auto">
        <Carousel
          autoPlay={true}
          showStatus={false}
          infiniteLoop={true}       
          showThumbs={false}
          showIndicators={false}
          renderArrowPrev={(clickHandler, hasPrev) => {
            return (
              <button
                onClick={clickHandler}
                className="absolute min-w-0 right-[35px] text-white hover:bg-black/[0.8] md:right-[60px] bottom-1 md:bottom-3 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
              >
                <AiOutlineLeft className="text-sm md:text-lg" />
              </button>
            );
          }}
          renderArrowNext={(clickHandler,hasPrev) => {
            return(
                <button
                onClick={clickHandler}
                className="absolute min-w-0 right-1 text-white hover:bg-black/[0.8] md:right-2 bottom-1 md:bottom-3 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
              >
                <AiOutlineRight className="text-sm md:text-lg" />
              </button>
            )
          }}
        >
          <div>
            <img
              className="aspect-[16/10] md:aspect-auto object-cover"
              src="/assets/slide-1.png"
              alt="slide-1"
            />
            <button className="px-[15px] rounded-r-lg min-w-0 md:px-[40px] py-[10px] md:py-[15px] font-oswald bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[27px] uppercase font-medium cursor-pointer hover:opacity-90">
              Shop now
            </button>
          </div>
          <div>
            <img
              className="aspect-[16/10] md:aspect-auto object-cover"
              src="/assets/slide-2.png"
              alt="slide-2"
            />
            <button onClick={()=>router.push('/category/jordan')} className="px-[15px] rounded-r-lg min-w-0 md:px-[40px] py-[10px] md:py-[15px] font-oswald bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[27px] uppercase font-medium cursor-pointer hover:opacity-90">
              Shop now
            </button>
          </div>
          <div>
            <img
              className="aspect-[16/10] md:aspect-auto object-cover"
              src="/assets/slide-3.png"
              alt="slide-3"
            />
            <button className="px-[15px] rounded-r-lg min-w-0 md:px-[40px] py-[10px] md:py-[15px] font-oswald bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[27px] uppercase font-medium cursor-pointer hover:opacity-90">
              Shop now
            </button>
          </div>
        </Carousel>
      </motion.div>
    </Wrapper>
  );
};
export default HeroBanner;
