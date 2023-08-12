import { api } from '@/redux/api/apiSlice';

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/books',
      providesTags: ['postBook', 'updateBook', 'deleteBook', 'postreview'],
    }),
    recentBook: builder.query({
      query: () => `/books/recent`,
      providesTags: ['postBook', 'deleteBook'],
    }),
    singleBook: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ['updateBook', 'deleteBook', 'postreview'],
    }),
    getReviews: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ['postreview'],
    }),
    addBook: builder.mutation({
      query: (data) => ({
        url: `/books/add-book`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['postBook'],
    }),
    addReview: builder.mutation({
      query: ({ data, id }) => ({
        url: `/books/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['postreview'],
    }),
    updateBook: builder.mutation({
      query: ({ data, id }) => ({
        url: `/books/edit/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['updateBook'],
    }),

    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['deleteBook'],
    }),

    //wishlist
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

    //completed
    getCompleteList: builder.query({
      query: (id) => `/completed/${id}`,
      providesTags: ['completedgDelete', 'completedPost'],
    }),
    addToCompletedList: builder.mutation({
      query: (data) => ({
        url: `/completed/add-to-completedlist`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['completedPost'],
    }),
    removeFromCompletedList: builder.mutation({
      query: (id) => ({
        url: `/completed/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['completedgDelete'],
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
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useAddReviewMutation,
  useGetReviewsQuery,
  useGetCompleteListQuery,
  useAddToCompletedListMutation,
  useRemoveFromCompletedListMutation,
} = productApi;
