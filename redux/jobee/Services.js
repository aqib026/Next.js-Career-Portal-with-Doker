import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobeePostsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://18.192.230.41:10007" }),

  endpoints: (builder) => ({
    runJobeeRequest: builder.mutation({
      query: (tests) => {
        return {
          url: `/jobe/index.php/restapi/runs`,
          method: "POST",
          body: tests,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
    }),
  }),
});

export const {
  useRunJobeeRequestMutation,
} = jobeePostsApi;
