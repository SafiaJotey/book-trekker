import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface  IBookFilter {
    searchTerm: string,
  genre: string,
  publishYear: string,
  }
const initialState: IBookFilter = {
  searchTerm: '',
  genre: '',
  publishYear: '',
};
const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    updateSearchTerm: (state, action:PayloadAction<string>) => {
        state.searchTerm = action.payload;
      },
  },
});
export const { updateSearchTerm } = bookSlice.actions;

export default bookSlice.reducer;