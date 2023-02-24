import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const companiesApi = createApi({
    reducerPath: "companiesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_SERVER_URI}`,
    }),

    tagTypes: ["Companies"],
    endpoints: (builder) => ({
        getCompanies: builder.query({
            query: () => `/`,
            providesTags: ["Companies"],
        }),

        addCompany: builder.mutation({
            query: (newCompany) => ({
                url: "/",
                method: "POST",
                body: {
                    name: newCompany.name,
                    game: newCompany.game,
                    amount: Number(newCompany.amount),
                    currency: newCompany.currency,
                },
            }),
            invalidatesTags: ["Companies"],
        }),

        updateAccount: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "PUT",
            }),
            invalidatesTags: ["Companies"],
        }),
    }),
});

export const { useGetCompaniesQuery, useAddCompanyMutation, useUpdateAccountMutation } =
    companiesApi;
