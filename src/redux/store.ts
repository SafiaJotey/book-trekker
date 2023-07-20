import { configureStore } from '@reduxjs/toolkit';

import { api } from './api/apiSlice';
import bookReducer from './feature/books/books.slice';
import userReducer from './feature/user/userSlice';
import wishListReducer from './feature/wishList/wishlisttSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    book: bookReducer,
    wishList: wishListReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
