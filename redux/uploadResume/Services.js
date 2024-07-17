import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQueryWrapper } from "../core/baseQuery";

export const uploadResumeApi = createApi({
  reducerPath: "uploadResumeApi",
  tagTypes: ["UploadFile"],

  baseQuery: fetchBaseQueryWrapper(false),

  endpoints: (builder) => ({
    addBanner: builder.mutation({
      query: (body) => {
        return {
          url: `/api/upload/?file=${body.name}&fileType=${body.type}`,
          method: "POST",
          mode: "no-cors",
          body: body,
        };
      },
      invalidatesTags: [{ type: "UploadResume", id: "LIST" }],
    }),
    putFile: builder.mutation({
      query: (body) => {
        return {
          url: body.url,
          method: "POST",
          mode: "no-cors",
          body: body.fields,
        };
      },
      invalidatesTags: [{ type: "UploadResume", id: "LIST" }],
    }),
  }),
});

export const { 
  useAddBannerMutation,
  usePutFileMutation
} = uploadResumeApi;
