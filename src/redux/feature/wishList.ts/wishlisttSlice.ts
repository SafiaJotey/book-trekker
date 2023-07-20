import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { IBook } from '../../../types/globalTypes';
interface IWishlist {
  books: IBook[];
}
const initialState: IWishlist = {
  books: [],
};
const wishlistslice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    addToWishListOrRemove: (state, action: PayloadAction<IBook>) => {
      const exist = state.books.find((book) => book._id === action.payload._id);
      console.log(exist);

      if (exist) {
        state.books = state.books.filter(
          (book) => book._id !== action.payload._id
        );
        console.log(state.books);
      } else {
        state.books.push(action.payload);
        console.log(state.books);
      }
    },
  },
});
export const { addToWishListOrRemove } = wishlistslice.actions;
export default wishlistslice.reducer;
