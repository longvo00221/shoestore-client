/* eslint-disable @next/next/no-img-element */
"use client";
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { BsCart } from "react-icons/bs";
import { useSelector } from "react-redux";
import SideCartItem from "./SideCartItem";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { toast } from "react-hot-toast";
type SideCartProps = {};
type Anchor = "right";
const SideCart: React.FC<SideCartProps> = () => {
  const [state, setState] = React.useState({ right: false });
  const { cartItems } = useSelector((state: any) => state.cart);
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const handleNavigateToCart = (event: any) => {
    if (cartItems.length > 0) {
      setOpenDrawer(false);
      router.push("/cart");
    } else {
      toast.error("Your Cart Is Empty !!");
    }
  };
  return (
    <div>
      <button
        onClick={() => setOpenDrawer(true)}
        className="w-10 min-w-0 text-black md:w-12 h-10 md:h-12 rounded-full flex justify-center hover:bg-black/[0.05] cursor-pointer relative items-center"
      >
        <BsCart className="text-[18px] md:text-[20px]" />
        {cartItems.length > 0 && (
          <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute md:top-2 top-[5px] left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px] ">
            {cartItems.length}
          </div>
        )}
      </button>
      <Drawer
        anchor={"right"}
        open={openDrawer}
        sx={{ position: "relative" }}
        onClose={() => setOpenDrawer(false)}
      >
        <Button
          onClick={() => setOpenDrawer(false)}
          className="absolute top-5 left-2 w-[50px] text-black min-w-0 rounded-md"
        >
          <CloseIcon sx={{ color: "black" }} />
        </Button>
        <div className="px-3 h-full md:min-w-[495px] w-screen md:max-w-[495px] md:px-5 flex flex-col items-center justify-center">
          <h1 className="text-xl md:text-2xl font-bold mb-5">Cart</h1>
          {cartItems.length > 0 ? (
            <div className="max-h-[480px] h-[480px] overflow-y-scroll">
              {cartItems.map((item: any) => {
                return <SideCartItem key={item.id} productCartItem={item} />;
              })}
            </div>
          ) : (
            <div className="h-[480px] grid place-items-center">
              <div>
                <Image
                  width={100}
                  height={100}
                  src="/assets/nikelogo.png"
                  alt=""
                />
                <div className="text-xl font-bold">Empty Cart</div>
              </div>
            </div>
          )}
          <button
            onClick={handleNavigateToCart}
            disabled={cartItems.length > 0 ? false : true}
            className={`
          
            w-full min-w-0 py-2 rounded-md bg-black disabled:bg-black/[0.05] disabled:cursor-not-allowed text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 hover:bg-black mt-10`}
          >
            Checkout
          </button>
        </div>
      </Drawer>
    </div>
  );
};
export default SideCart;
