/* eslint-disable @next/next/no-img-element */
import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { removeFromCart, updateCart } from "@/redux/features/cartSlice";
import { useDispatch } from "react-redux";
type SideCartItemProps = {
  productCartItem: any;
};

const SideCartItem: React.FC<SideCartItemProps> = ({ productCartItem }) => {
  const [size, setsize] = React.useState(productCartItem.activeSize);
  const [quanti, setQuanti] = React.useState(productCartItem.quantity);

  const dispatch = useDispatch();
  const handleChangeSize = (event: SelectChangeEvent) => {
    setsize(event.target.value as string);
  };
  const handleChangeQuanti = (event: SelectChangeEvent) => {
    setQuanti(event.target.value as string);
  };
  const router = useRouter();
  const handleNavigateToProduct = () => {
    router.push(`/product/${productCartItem.attributes.slug}`);
  };
  const handleUpdateCartItem = (event: SelectChangeEvent, key: string) => {
    let payload = {
      key,
      val:
        key === "quantity" ? parseInt(event.target.value) : event.target.value,
      id: productCartItem.id,
    };
    dispatch(updateCart(payload));
  };
  return (
    <div
      onClick={() => handleNavigateToProduct()}
      className="flex cursor-pointer hover:bg-black/[0.05] rounded-md p-2 py-3 gap-3 md:gap-5 border-b w-full"
    >
      <div className="shrink-0 aspect-square w-[50px] md:w-[90px] my-auto">
        <img
          src={productCartItem.attributes.thumbnail.data.attributes.url}
          className="rounded-md"
          alt={productCartItem.attributes.name}
        />
      </div>

      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          <h1 className="text-lg md:text-xl font-semibold text-black/[0.8]">
            {productCartItem.attributes.name}
          </h1>
          <div className="flex items-center justify-between">
            <p className="text-sm md:text-md font-medium max-w-fit text-black/[0.5] block md:hidden">
              {productCartItem.attributes.subtitle}
            </p>
            <p className="text-sm md:text-md font-bold text-black/[0.5] mr-2 md:mr-0 md:ml-auto mt-2">
              $ {productCartItem.attributes.price}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 md:gap-5 text-black/[0.5] text-sm md:text-md">
            {/* size */}
            <div className="flex items-center gap-1">
              <div className="font-semibold mr-2">Size:</div>
              <Box sx={{ minWidth: 50 }}>
                <FormControl variant="standard" fullWidth>
                  {/* <InputLabel id="demo-simple-select-label">size</InputLabel> */}
                  <Select
                    value={size}
                    label="size"
                    defaultValue={productCartItem.activeSize}
                    onChange={(event) => {
                      handleChangeSize(event),
                        handleUpdateCartItem(event, "activeSize");
                    }}
                  >
                    {productCartItem.attributes.size.data.map((size: any) => {
                      return (
                        <MenuItem key={size.id} value={size.size}>
                          {size.size}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
            </div>
            {/* quanti */}
            <div className="flex items-center gap-1">
              <div className="font-semibold mr-2">Quantity:</div>
              <Box sx={{ minWidth: 50 }}>
                <FormControl variant="standard" fullWidth>
                  {/* <InputLabel id="demo-simple-select-label">size</InputLabel> */}
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={quanti}
                    label="size"
                    defaultValue="UK - 8"
                    onChange={(event) => {
                      handleChangeQuanti(event),
                        handleUpdateCartItem(event, "quantity");
                    }}
                  >
                    {Array.from({ length: quanti + 1 }, (_, index) => (
                      <MenuItem key={index} value={index}>
                        {index}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </div>
          </div>
          <Button
            onClick={() => dispatch(removeFromCart({ id: productCartItem.id }))}
            className="min-w-fit text-black rounded-md"
          >
            <RiDeleteBin6Line className="cursor-pointer text-black/[0.1] hover:text-black text-[16px] md:text-[20px]" />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default SideCartItem;
