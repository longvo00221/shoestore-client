"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Wrapper from "../components/Wrapper";
import CartItem from "../components/CartItem";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { makePaymentRequest } from "@/utils/api";
import { toast } from "react-hot-toast";
import {motion} from 'framer-motion'
import LoadingButton from "../components/LoadingButton";


type CartPageProps = {};

const CartPage: React.FC<CartPageProps> = () => {
  const stripePromise = loadStripe(
    "pk_test_51ND0nZD8TcWThT9zUVPowANGO1vmNzDAU4gewQCbRk6Heev0j0CWKbqwsBxoLubg8HX0jbCxx9wJtUFqWEiYF591001ryTYFd2"
  );
  const [loading, setLoading] = useState(false);
  const { cartItems } = useSelector((state: any) => state.cart);
  const subTotal = useMemo(() => {
    return cartItems.reduce(
      (total: number, val: any) => total + val.attributes.price,
      0
    );
  }, [cartItems]);
  const handlePayment = async () => {
    try {
      setLoading(true);
      const stripe = await stripePromise;
      const res = await makePaymentRequest("/api/orders", {
        products: cartItems,
      });
      await stripe?.redirectToCheckout({
        sessionId: res.stripeSession.id,
      });
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };
  const variants = {
    hidden: { opacity:0,x:-100},
    enter: { opacity:1,x:0},
    exit: {opacity:0,x:-100},
  };
 
  return (
    <motion.div 
    initial='hidden'
    animate='enter'
    exit='exit'
    variants={variants}
    transition={{ type: 'ease-in'}}
    className="w-full md:py-20">
      <Wrapper>
        {cartItems.length > 0 ? (
          <div>
            <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
              <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                Shopping Cart
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-12 py-10">
              <div className="flex-[2]">
                <div className="text-lg font-bold">Cart Items</div>
                {cartItems.map((item: any) => {
                  return <CartItem key={item.id} productCartItem={item} />;
                })}
              </div>
              <div className="flex-[1]">
                <div className="text-lg font-bold">Summary</div>
                <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
                  <div className="flex justify-between">
                    <div className="uppercase text-md md:text-lg font-medium text-black">
                      Subtotal
                    </div>
                    <div className="text-md md:text-lg font-medium text-black">
                      $ {subTotal}
                    </div>
                  </div>
                  <div className="text-sm md:text-md py-5 border-t mt-5">
                    The subtotal reflects the total price of your order,
                    including duties and taxes, before any applicable discounts.
                    It does not include delivery costs and international
                    transaction fees.
                  </div>
                </div>
                {loading ? (
                  <div className="w-full py-4 rounded-md bg-black/[0.8] min-w-0 text-white text-lg font-medium transition-transform active:scale-95 mb-3 cursor-not-allowed hover:bg-black/[0.8]">
                    <LoadingButton/>
                  </div>
                ) : (
                  <button
                    onClick={handlePayment}
                    className="w-full py-4 rounded-md bg-black min-w-0 text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 hover:bg-black"
                  >
                    Checkout
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-2 flex flex-col items-center pb-[50px] md:-mt-14">
            <Image
              src="/assets/empty-cart.jpg"
              width={300}
              height={300}
              alt="empty"
            />
            <span className="text-xl font-bold">Your cart is empty</span>
            <span className="text-center mt-4">
              Looke like you have not added anything in your cart
              <br />
              Go ahead and explore top categories
            </span>
            <Link
              href="/"
              className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </Wrapper>
    </motion.div>
  );
};
export default CartPage;
