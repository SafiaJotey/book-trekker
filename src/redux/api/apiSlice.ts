import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'http://localhost:5000/api/v1',
    baseUrl: 'https://book-trekker-server.vercel.app/api/v1',
  }),
  tagTypes: [
    'postBook',
    'comments',
    'delete',
    'post',
    'readingPost',
    'readingDelete',
    'updateBook',
    'deleteBook',
    'postreview',
    'updateComplete',
    'completedgDelete',
    'completedPost',
  ],
  endpoints: () => ({}),
});
