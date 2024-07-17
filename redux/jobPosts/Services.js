import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQueryWrapper } from "../core/baseQuery";

export const jobPostsApi = createApi({
  reducerPath: "jobPostsApi",
  tagTypes: ["JobPosts"],

  baseQuery: fetchBaseQueryWrapper(false),

  endpoints: (builder) => ({
    getAllJobPosts: builder.query({
      query: (data) => ({
        url: `/api/jobPost?page=${data.pagenum}&limit=${data.limit}`,
 mode: "no-cors",
        method: "GET",
      }),
      providesTags: () => [{ type: "JobPosts", id: "LIST" }],
    }),

    getJobPostById: builder.query({
      query: (id) => {
        return {
          url: `/api/jobPost/${id}`,
          // params: { "jobPostId" : id },

          mode: "no-cors",
          method: "GET",
        };
      },
    }),

    deleteJobPost: builder.mutation({
      query: (id) => {
        return {
          url: `/api/jobPost/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "JobPosts", id: "LIST" }],
    }),

    createJobPost: builder.mutation({
      query: (newUser) => {
        return {
          url: `/api/jobPost`,
          method: "POST",
          body: newUser,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
      invalidatesTags: [{ type: "JobPosts", id: "LIST" }],
    }),

    updateJobPost: builder.mutation({
      query: (updateJobPost) => {
        const { id, ...data } = updateJobPost;
        return {
          url: `/api/jobPost/${id}`,
          method: "PUT",
          body: updateJobPost.data,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
      invalidatesTags: [{ type: "JobPosts", id: "LIST" }],
    }),
  }),
});

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints

export const {
  useGetAllJobPostsQuery,
  useGetJobPostByIdQuery,
  useDeleteJobPostMutation,
  useCreateJobPostMutation,
  useUpdateJobPostMutation,
} = jobPostsApi;
