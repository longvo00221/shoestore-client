import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoriteState {
  favoriteItems: any[];
}

const getInitialFavoriteItems = () => {
  if (typeof localStorage !== 'undefined') {
    const storedItems = localStorage.getItem('favoriteItems');
    return storedItems ? JSON.parse(storedItems) : [];
  } else {
    return [];
  }
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: {
    favoriteItems: getInitialFavoriteItems(),
  } as FavoriteState,
  reducers: {
    addToFavorite: (state, action: PayloadAction<any>) => {
      const item = state.favoriteItems.find((p: any) => p.id === action.payload.id);
      if (!item) {
        state.favoriteItems.push({ ...action.payload });
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('favoriteItems', JSON.stringify(state.favoriteItems));
        }
      }
    },
    removeFromFavorite: (state, action: PayloadAction<any>) => {
      state.favoriteItems = state.favoriteItems.filter((p: any) => p.id !== action.payload.id);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('favoriteItems', JSON.stringify(state.favoriteItems));
      }
    },
  },
});

export const { addToFavorite, removeFromFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
