"use client";
import React, { useEffect, useState } from "react";

import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";

import SideCart from "../SideCart";
import SideFavorite from "../SideFavorite";
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import UserItem from "../user-menu-item";
// ... (your existing imports)

type UserNavProps = {
  mobileMenu: boolean;
  setMobileMenu: any;
};

const UserNav: React.FC<UserNavProps> = ({ mobileMenu, setMobileMenu }) => {
  const { user } = useUser();

 const [isMobile,checkIsMobile] = useState<boolean>(false)
 
  useEffect(()=>{
    const handleIsMobileDevice = () => {
      if(window.innerWidth <= 768){
        checkIsMobile(true)
      }else{
        checkIsMobile(false)
      }
   };
   handleIsMobileDevice()
  },[])

  return (
    <div>
      <div className="flex items-center gap-2 text-black ">
        {/* heart */}
        <SideFavorite />
        {/* cart */}
        <SideCart />
        {/* userInfo */}
        <div
          className={`w-8 min-w-0 text-black ${
            !isMobile ? "block" : "hidden"
          }   md:w-12 h-8 md:h-12 md:ml-5  rounded-md flex justify-center cursor-pointer relative items-center`}
        >
          {user == null && (
            <SignInButton mode="modal" afterSignInUrl="/">
              <Button className="text-base">Sign in</Button>
            </SignInButton>
          ) }
        </div>
        <div className="w-7 md:w-12 md:hidden h-8 md:h-12 rounded-full flex justify-center items-center cursor-pointer -mr-2 relative">
          {mobileMenu ? (
            <div
              onClick={() => setMobileMenu(false)}
              className="text-black min-w-fit rounded-full"
            >
              <VscChromeClose className="text-[20px]" />
            </div>
          ) : (
            <div
              onClick={() => setMobileMenu(true)}
              className="text-black min-w-fit rounded-full"
            >
              <BiMenuAltRight className="text-[20px]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserNav;
