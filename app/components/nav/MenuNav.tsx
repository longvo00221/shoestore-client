import React from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";
type MenuProps = {
  showCatMenu: boolean;
  setShowCatMenu: any;
  categories: any;
  headerNav: any;
};

const MenuNav: React.FC<MenuProps> = ({
  showCatMenu,
  setShowCatMenu,
  categories,
  headerNav,
}) => {
  return (
    <ul className="hidden md:flex items-center gap-8 font-medium text-black">
      {headerNav.map((item: any) => {
        return (
          <React.Fragment key={item.id}>
            {!!item.subMenu ? (
              <li
                className="cursor-pointer flex items-center gap-2 relative"
                onMouseEnter={() => setShowCatMenu(true)}
                onMouseLeave={() => setShowCatMenu(false)}
              >
                {item.name}
                <BsChevronDown size={14} />
                {showCatMenu && (
                  <ul className="bg-white absolute top-6 -left-20 min-w-[250px] py-4 text-black shadow-lg">
                    {categories.map((category: any,i:number) => {
                      const categoryMenu = category.attributes;
                      return (
                        <div key={i}>
                          {categories.length === 0 ? (
                            <p className="h-12 flex items-center justify-between px-3 rounded-md">Loading</p>
                          ) : (
                            <Link
                              onClick={() => setShowCatMenu(false)}
                              href={`/category/${categoryMenu.slug}`}
                              key={categoryMenu.id}
                            >
                              <li className="h-12 flex items-center justify-between px-3 hover:bg-black/[0.03] rounded-md">
                                {categoryMenu.name}
                                <span className="opacity-50 text-sm">
                                  ({categoryMenu.products?.data?.length})
                                </span>
                              </li>
                            </Link>
                          )}
                        </div>
                      );
                    })}
                  </ul>
                )}
              </li>
            ) : (
              <li className="cursor-pointer">
                <Link href={item?.url!}>{item.name}</Link>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};
export default MenuNav;
