import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const fetchBaseQueryWrapper = (isAuth) => {
  const baseUri = process.env.BASE_URL;
  return fetchBaseQuery({
    baseUrl: baseUri,
    prepareHeaders: (headers) => {
      isAuth ? headers.set("authorization", `Bearer ${token}`) : "";
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      return headers;
    },
  });
};
