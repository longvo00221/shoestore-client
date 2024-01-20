import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  attributes: {
    price: number;
  };
  quantity: number;
  oneQuantityPrice: number;
  key: string;
  val: any;
}

interface CartState {
  cartItems: CartItem[];
}

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  } as CartState,

  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = state.cartItems.find(
        (p: CartItem) => p.id === action.payload.id
      );
      if (item) {
        item.quantity++;
        item.attributes.price = item.oneQuantityPrice * item.quantity;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    updateCart: (state, action) => {
      state.cartItems = state.cartItems.map((p) => {
        if (p.id === action.payload.id) {
          if (action.payload.key === "quantity") {
            p.attributes.price = p.oneQuantityPrice * action.payload.val;
          }
          return { ...p, [action.payload.id]: action.payload.val };
        }
        return p;
      });
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (p) => p.id !== action.payload.id
      );
    },
  },
});

export const { addToCart, updateCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
