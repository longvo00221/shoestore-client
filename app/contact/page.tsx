"use client";
import React from "react";
import { motion } from "framer-motion";
type pageProps = {};

const page: React.FC<pageProps> = () => {
    const variants = {
        hidden: { opacity: 0,x:100 },
        enter:{opacity:1,x:0},
        exit:{opacity:0,x:-100}
    }
  return (
    <motion.div variants={variants} animate='enter' initial='hidden' viewport={{once:true}} transition={{type:"ease"}} className=" bg-black">
      <div
        className="w-full relative h-screen flex flex-col justify-between"
        style={{
          background: "url(/assets/backgroundcontact.jpg)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "keyframes", delay: 0.1 }}
            className="text-white text-xl font-semibold static md:absolute md:top-5 md:right-5"
          >
            Contact With Us
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "keyframes", delay: 0.2 }}
            className="text-white text-xl font-semibold static md:absolute md:top-5 md:left-5"
          >
            Email: longvo010203@gmail.com
          </motion.div>
        </div>
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "keyframes", delay: 0.3 }}
            className="text-white text-xl font-semibold static md:absolute md:bottom-5 md:left-5"
          >
            Phone: +84111111111
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "keyframes", delay: 0.4 }}
            className="text-white text-xl font-semibold static md:absolute md:bottom-5 md:right-5"
          >
            Thank For Choosing Us
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
export default page;
