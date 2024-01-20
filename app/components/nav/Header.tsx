/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import Wrapper from "../Wrapper";
import Image from "next/image";
import Link from "next/link";
import MenuNav from "./MenuNav";
import UserNav from "./UserNav";
import MenuMobileNav from "./MenuMobileNav";
import { fetchDataFromApi } from "@/utils/api";
type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  const headerData = [
    { id: 1, name: "Home", state: "home", url: "/" },
    { id: 2, name: "News", state: "news", url: "/news" },
    { id: 3, name: "Categories", state: "categories" ,subMenu: true },
    { id: 4, name: "Contact", state: "contact", url: "/contact" },
  ];
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [categories,setCategories] = useState()
  let lastScrollPosition = 0;
  const controlNavbar = () => {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScrollPosition > lastScrollPosition && window.pageYOffset > 30) {
      setShow("-translate-y-[80px]");
    } 
    else{
      setShow("translate-y-0");
    }
    lastScrollPosition = currentScrollPosition;
  };
  useEffect(()=>{
    window.addEventListener("scroll",controlNavbar);
    return () =>{
      window.removeEventListener("scroll",controlNavbar)
    }
  },[lastScrollY])
  useEffect(()=>{
    fetchCategories()
  },[])
  const fetchCategories = async () => {
    const {data} = await fetchDataFromApi('/api/categories?populate=*');
    setCategories(data)
  }
  return (
    <header
      className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show} drop-shadow-md`}
    >
        <Wrapper className="h-[60px] flex justify-between items-center">
           <Link href="/" className="logo"> <Image src="/assets/logo.svg" width={100} height={100} className="w-[40px] md:w-[60px]" alt="logo"/></Link>
           <div>
            <MenuNav showCatMenu={showCatMenu} setShowCatMenu={setShowCatMenu} categories={categories ? categories : []} headerNav={headerData}/>
           </div>
           <MenuMobileNav showCatMenu={showCatMenu} setShowCatMenu={setShowCatMenu} mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} headerNav={headerData} categories={categories ? categories : []}/>
           <UserNav mobileMenu={mobileMenu} setMobileMenu={setMobileMenu}/>
        </Wrapper>
    </header>
  );
};
export default Header;
