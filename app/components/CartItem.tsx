/* eslint-disable @next/next/no-img-element */
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/redux/features/cartSlice";
type CartItemProps = {
  productCartItem: any;
};

const CartItem: React.FC<CartItemProps> = ({ productCartItem }) => {
  const [size, setsize] = React.useState(productCartItem.activeSize);
  const [quanti, setQuanti] = React.useState(productCartItem.quantity);
  const handleChangeSize = (event: SelectChangeEvent) => {
    setsize(event.target.value as string);
  };
  const handleChangeQuanti = (event: SelectChangeEvent) => {
    setQuanti(event.target.value as string);
  };

  const dispatch = useDispatch()


  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        <img
          src={productCartItem.attributes.thumbnail.data.attributes.url}
          alt={productCartItem.attributes.name}
          className="rounded-md"
        />
      </div>

      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          <h1 className="text-lg md:text-2xl font-semibold text-black/[0.8]">
            {productCartItem.attributes.name}
          </h1>
         <div className="flex items-center">
            <p className="text-sm md:text-md font-medium max-w-fit text-black/[0.5] block md:hidden">
              {productCartItem.attributes.subtitle}
            </p>
            <p className="text-sm md:text-md font-bold text-black/[0.5] ml-auto mt-2">
              $ {productCartItem.attributes.price}
            </p>
         </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
            {/* size */}
            <div className="flex items-center gap-1">
              <div className="font-semibold mr-2">Size:</div>
              <div>{productCartItem.activeSize}</div>
            </div>
            {/* quanti */}
            <div className="flex items-center gap-1">
              <div className="font-semibold mr-2">Quantity:</div>
              <div>{productCartItem.quantity}</div>
            </div>
          </div>
          <Button  onClick={() => dispatch(removeFromCart({ id: productCartItem.id }))} className="min-w-fit text-black rounded-md">
            <RiDeleteBin6Line className="cursor-pointer text-black/[0.1] hover:text-black text-[16px] md:text-[20px]" />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CartItem;
