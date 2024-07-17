import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQueryWrapper } from "../core/baseQuery";

export const usersApi = createApi({
  
  reducerPath: "usersApi",
  tagTypes: ["Users"],

  baseQuery: fetchBaseQueryWrapper(false),

  endpoints: (builder) => ({

    getAllUsers: builder.query({
      query: (data) => ({
        url: `/api/users?page=${data.pagenum}&limit=${data.limit}`,
 method: "GET",
      }),
      providesTags: () => [{ type: "Users", id: "LIST" }],
    }),
    getUserById: builder.query({
      query: (id) => {
        return {
          url: `/api/users/${id}`,
          method: "GET",
        };
      },
      providesTags: () => [{ type: "Users", id: "LIST" }],

    }),

    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `/api/users/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),

    createUser: builder.mutation({
      query: (newUser) => {
        return {
          url: `/api/users`,
          method: "POST",
          body: newUser,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),

    updateUser: builder.mutation({
      query: (updateUserData) => {
        const { id, ...data } = updateUserData;
        return {
          url: `/api/users/`,
          method: "PUT",
          body: updateUserData.data,
          params: { "userId" : id },
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
  }),
});

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
} = usersApi;
