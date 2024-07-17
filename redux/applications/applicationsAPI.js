import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQueryWrapper } from "../core/baseQuery";

export const applicationsApi = createApi({
  reducerPath: "applicationsApi",
  tagTypes: ['Applications'],

  baseQuery: fetchBaseQueryWrapper(false),

  endpoints: (builder) => ({

    getAllApplications: builder.query({
      query: (data) => ({
        url: `/api/applications?page=${data.pagenum}&limit=${data.limit}`,
  method: "GET",
      }),
      providesTags: () => [{ type: 'Applications' }],
    }),
    
    getApplicationById: builder.query({
      query: (id) => {
        return {
          url: `/api/applications/${id}`,
          method: "GET",
        };
      },
    }),
    
    getApplicationByUserId: builder.query({
      query: (userid) => {
        return {
          url: `/api/applications/?userid=${userid}`,
          method: "GET",
        };
      },
    }),

    deleteApplication: builder.mutation({
      query: (id) => {
        return {
          url: `/api/applications/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: 'Applications'}],
    }),

    createApplication: builder.mutation({
      query: (newUser) => {
        return {
          url: `/api/applications`,
          method: "POST",
          body: newUser,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
      refetchOnMountOrArgChange: true,
      invalidatesTags: [{ type: 'Applications'  }],
    }),

    updateApplication: builder.mutation({
      query: (updateAssesment) => {
        const { id } = updateAssesment;
        return {
          url: `/api/applications/${id}`,
          method: "PUT",
          body: updateAssesment.data,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
      refetchOnMountOrArgChange: true,
      invalidatesTags: [{ type: 'Applications'}],
    }),
  }),
});

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints

export const {
  useGetAllApplicationsQuery,
  useGetApplicationByIdQuery,
  useGetApplicationByUserIdQuery,
  useDeleteApplicationMutation,
  useCreateApplicationMutation,
  useUpdateApplicationMutation,
} = applicationsApi;
