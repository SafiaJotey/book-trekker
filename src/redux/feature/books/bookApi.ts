import { api } from '@/redux/api/apiSlice';

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/books',
    }),
    recentBook: builder.query({
      query: () => `/books/recent`,
    }),
    singleBook: builder.query({
      query: (id) => `/books/${id}`,
    }),
    getWishlist: builder.query({
      query: (id) => `/wishlist/${id}`,
      providesTags: ['delete', 'post'],
    }),
    addToWishlist: builder.mutation({
      query: (data) => ({
        url: `/wishlist/add-to-wishlist`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['post'],
    }),
    removeFromWishlist: builder.mutation({
      query: (id) => ({
        url: `/wishlist/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['delete'],
    }),

    //readingList
    getReadinglist: builder.query({
      query: (id) => `/reading/${id}`,
      providesTags: ['readingDelete', 'readingPost'],
    }),
    addToReadingList: builder.mutation({
      query: (data) => ({
        url: `/reading/add-to-readinglist`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['readingPost'],
    }),
    removeFromReadingList: builder.mutation({
      query: (id) => ({
        url: `/reading/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['readingDelete'],
    }),

    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/comment/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['comments'],
    }),
    getComment: builder.query({
      query: (id) => `/comment/${id}`,
      providesTags: ['comments'],
    }),
  }),
});

export const {
  useGetCommentQuery,
  useGetBooksQuery,
  useRecentBookQuery,
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useSingleBookQuery,
  useRemoveFromWishlistMutation,
  useGetReadinglistQuery,
  useAddToReadingListMutation,
  useRemoveFromReadingListMutation,
} = productApi;
