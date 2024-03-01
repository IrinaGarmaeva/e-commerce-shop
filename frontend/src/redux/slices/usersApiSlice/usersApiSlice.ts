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

  }),
});

export const { useLoginMutation} = usersApiSlice;
