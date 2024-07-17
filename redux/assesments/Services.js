import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQueryWrapper } from "../core/baseQuery";

export const assessmentsApi = createApi({
  reducerPath: "assessmentsApi",
  tagTypes: ["Assessments"],

  baseQuery: fetchBaseQueryWrapper(false),

  endpoints: (builder) => ({
    getAllAssessments: builder.query({
      query: (data) => ({
        url: `/api/assessment?page=${data.pagenum}&limit=${data.limit}`,
method: "GET",

      }),

      providesTags: () => [{ type: "Assessments", id: "LIST" }],
    }),
    getAssessmentById: builder.query({
      query: (id) => {
        return {
          url: `/api/assessment/${id}`,
          method: "GET",
        };
      },
    }),

    deleteAssessment: builder.mutation({
      query: (id) => {
        return {
          url: `/api/assessment/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "Assessments", id: "LIST" }],
    }),

    createAssessment: builder.mutation({
      query: (newUser) => {
        return {
          url: `/api/assessment`,
          method: "POST",
          body: newUser,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
      invalidatesTags: [{ type: "Assessments", id: "LIST" }],
    }),

    updateAssessment: builder.mutation({
      query: (updateAssesment) => {
        const { id, ...data } = updateAssesment;
        return {
          url: `/api/assessment/${id}`,
          method: "PUT",
          body: updateAssesment.data,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
      invalidatesTags: [{ type: "Assessments", id: "LIST" }],
    }),
  }),
});

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints

export const {
  useGetAllAssessmentsQuery,
  useGetAssessmentByIdQuery,
  useDeleteAssessmentMutation,
  useCreateAssessmentMutation,
  useUpdateAssessmentMutation,
} = assessmentsApi;
