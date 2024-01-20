import React from "react";
import Link from "next/link";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import Collapse from "@mui/material/Collapse";
type MenuMobileNavProps = {
  showCatMenu: boolean;
  setShowCatMenu: any;
  mobileMenu: boolean;
  setMobileMenu: any;
  categories:any
  headerNav:any;
};

const MenuMobileNav: React.FC<MenuMobileNavProps> = ({
  showCatMenu,
  setShowCatMenu,
  setMobileMenu,
  mobileMenu,
  categories,
  headerNav
}) => {
  return (
    <ul
      className={`flex flex-col 
      ${!mobileMenu ? "opacity-0" : "opacity-100"} 
      ${!mobileMenu ? "translate-y-[-200%]" : "translate-y-0"} 
      ${!mobileMenu ? "z-10" : "-z-10"} 
      md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] bg-white border-t text-black transition duration-500 ease-in-out`}
    >
      {headerNav.map((item:any,index:number) => {
        return (
          <React.Fragment key={index}>
            {!!item.subMenu ? (
              <div
                className="cursor-pointer py-4 px-5 border-b flex flex-col relative"
                onClick={() => setShowCatMenu(!showCatMenu)}
              >
                <div className="flex justify-between items-center">
                  {item.name}
                  {showCatMenu ? (
                    <BsChevronUp size={14} />
                    ) : (
                    <BsChevronDown size={14} />
                  )}
                </div>
                {/* {showCatMenu && (
                )} */}
                <Collapse
                  in={showCatMenu}
                  timeout="auto"
                  unmountOnExit
                  className={`bg-black/[0.05] -mx-5 mt-4 -mb-4 
                  transition-all duration-300 ease-in-out`}
                >
                  {categories.map((category:any,i:number) => {
                     const categoryMenu = category.attributes
                    return (
                      <Link
                        onClick={() => {
                          setShowCatMenu(false);
                          setMobileMenu(false);
                        }}
                        href={`/category/${categoryMenu.slug}`}
                        key={i}
                      >
                        <li className="py-4 hover:bg-black/[0.1] px-8 border-t flex justify-between ">
                          {categoryMenu.name}
                          <span className="opacity-50 text-sm">
                            ({categoryMenu.products?.data?.length})
                          </span>
                        </li>
                      </Link>
                    );
                  })}
                </Collapse>
              </div>
            ) : (
              <Link
                href={item?.url!}
                onClick={() => setMobileMenu(false)}
                className="py-4 hover:bg-black/[0.1] px-5 border-b"
              >
                {item.name}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};
export default MenuMobileNav;
