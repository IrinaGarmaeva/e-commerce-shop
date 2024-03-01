import { USERS_URL } from "../../../utils/constants";
import { apiSlice } from "../apiSlices/apiSlice";


export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: {...data}
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: 'POST',
        body: {...data}
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      })
    })
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = usersApiSlice;
