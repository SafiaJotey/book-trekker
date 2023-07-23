
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface IBookFilter {
  searchTerm: string;
  genre: string;
  publishYear: string;
 
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
    updateSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    updateGenreSelectedValue: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    },
    updatePublishYearSelectedValue: (state, action: PayloadAction<string>) => {
      state.publishYear = action.payload;
    },
    

    
  
    
  },
});
export const {
  updateSearchTerm,
  updateGenreSelectedValue,
  updatePublishYearSelectedValue,
} = bookSlice.actions;

export default bookSlice.reducer;
