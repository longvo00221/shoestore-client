/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Wrapper from "../components/Wrapper";
import { motion } from "framer-motion";
import { Box } from "@mui/material";
const NewsPage = () => {
  const variants = {
    hidden: { opacity: 0, y: -100 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 },
  };
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };
  const item = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "smooth" },
    },
  };
  const image = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "smooth" },
    },
  };
  const decoration ={
    hidden:{
      filter:'blur(10px)'
    },show:{
      filter:'blur(0px)'
    }
  }
  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ type: "linear" }}
    >
      {/* section 1 */}
      <div
        className="md:h-screen md:pb-0 pb-12 h-full w-full"
        style={{
          background: "url('/assets/BG1.png')",
        }}
      >
        <Wrapper className="flex relative md:static items-center flex-col md:flex-row">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
            className="text-white pt-40 -mt-16"
          >
            <motion.h1 variants={item} className="text-7xl italic font-extrabold uppercase">
              air max
            </motion.h1>
            <motion.h2 variants={item} className="tracking-wider text-4xl font-semibold uppercase my-5">
              nike air max 90
            </motion.h2>
            <motion.p variants={item} className="text-xs text-[#585C79] font-normal max-w-[500px]">
              Originally designed for performance running, the Max Air unit in
              the heel adds unbelievable cushioning. The low-top design combines
              with a padded collar for a sleek look that feels soft and
              comfortable.
            </motion.p>
          </motion.div>

          <motion.img
            initial={{opacity:0,y:30}}
            whileInView={{opacity:1,y:0}}
            viewport={{once:true}}
            transition={{type:'ease',delay:0.2}}
            className=" z-[2] bottom-5 mt-20 right-20 md:absolute w-[500px]"
            src="/assets/shoesbg1.png"
            alt=""
          />
          <motion.img variants={decoration}
            className="absolute hidden md:block top-[10rem] right-[12rem] w-[300px]"
            src="/assets/circlebgbig.png"
            alt=""
          />
          <div className="absolute top-[25rem] z-10 backdrop-blur-sm right-[5rem] w-[100px] h-[100px] rounded-full" />
          <motion.img variants={decoration}
            className="absolute hidden md:block top-5 z-10 backdrop-blur-md left-[5rem] w-[100px]"
            src="/assets/circlebgsmall.png"
            alt=""
          />
          <motion.img variants={decoration}
            className="absolute bottom-0 md:right-8 right-0 w=[400px] md:w-[500px]"
            src="/assets/shadowshoe.png"
            alt=""
          />
        </Wrapper>
      </div>
      {/* section 2 */}
      <Box
        sx={{
          width: "100%",
          height: { lg: "1024px", md: "250px", xs: "250px" },
          background: "url('/assets/BG2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: { lg: "fixed", md: "unset", xs: "unset" },
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* section 3 */}
      <div
     
        className="h-[800px] w-full"
        style={{
          background: "url('/assets/BG3.png')",
        }}
      >
        <Wrapper className="flex relative items-center flex-col md:flex-row">
          <div className="md:w-[200px] w-[120px] md:h-full h-[200px] bg-black  rounded-b-md absolute left-0" />
          <div className="md:w-[50%]"></div>
          <motion.img
          initial={{opacity:0,x:-30}}
          whileInView={{opacity:1,x:0}}
          viewport={{once:true}}
          transition={{type:'ease',delay:0.5}}
            src="/assets/imgbg3.png"
            className="absolute md:w-[350px] w-[250px] md:left-24 top-[80px] md:top-[180px]"
            alt=""
          />
          <motion.div  className="text-black md:pt-72 pt-[500px] md:w-[50%] -mt-16">
            <motion.h1 initial='hidden' whileInView='show' variants={item} className="text-7xl italic font-extrabold uppercase">
              air max
            </motion.h1>
            <motion.h2 initial={{y:30,opacity:0}} whileInView={{y:0,opacity:1}} viewport={{once:true}} transition={{delay:0.2,type:'ease'}}  className="tracking-wider text-4xl font-semibold uppercase my-5">
              nike air max 90
            </motion.h2>
            <motion.p initial={{y:30,opacity:0}} whileInView={{y:0,opacity:1}} viewport={{once:true}} transition={{delay:0.4,type:'ease'}}  className="text-xs text-[#585C79] font-normal max-w-[500px]">
              Originally designed for performance running, the Max Air unit in
              the heel adds unbelievable cushioning. The low-top design combines
              with a padded collar for a sleek look that feels soft and
              comfortable.
            </motion.p>
          </motion.div>
        </Wrapper>
      </div>
      {/* section 4 */}
      <Box
        sx={{
          width: "100%",
          height: { lg: "1024px", md: "250px", xs: "250px" },
          background: "url('/assets/BG4.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: { lg: "fixed", md: "unset", xs: "unset" },
          backgroundRepeat: "no-repeat",
        }}
      />
    </motion.div>
  );
};
export default NewsPage;
