import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
    reducerPath: "paymentApi",
    baseQuery: fetchBaseQuery({
      baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/payment`,
    }),
    // tagTypes: ["payment"],
    endpoints: (builder) => ({
        newCoupon: builder.mutation({
          query: ({ coupon, amount }: { coupon: string; amount: number }) => ({
            url: "/coupon/new",
            method: "POST",
            body: { coupon, amount },
          }),
          // invalidatesTags: ["payment"],
        }),
        allCoupons: builder.query({
          query: () => ({
            url: "/coupon/all",
            method: "GET",
          }),
          // providesTags: ["payment"],
        }),
      deleteCoupon: builder.mutation({
        query: (id) => ({
          url: `/coupon/${id}`,
          method: "DELETE",
        }),
        // invalidatesTags: ["payment"],
      })
    }),
  });


export const { useNewCouponMutation, useAllCouponsQuery, useDeleteCouponMutation } = paymentApi