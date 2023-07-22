import { api } from '@/redux/api/apiSlice';

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createNewUser: builder.mutation({
      query: (data) => ({
        url: `/users/create-user`,
        method: 'POST',
        body: data,
      }),
      //   invalidatesTags: ['comments'],
    }),
    getUser: builder.query({
      query: (email) => `/users/${email}`,
    }),
  }),
});

export const { useCreateNewUserMutation, useGetUserQuery } = userApi;
