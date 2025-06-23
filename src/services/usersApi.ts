import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateUserRequest,
  UpdateUserRequest,
  Data,
} from "../types/user";

interface ListUsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Data[];
}

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reqres.in/api/",
    prepareHeaders: (headers) => {
      headers.set("x-api-key", "reqres-free-v1");
      return headers;
    },
  }),
  tagTypes: ["User"],
  keepUnusedDataFor: 1, // increased cache storage time
  refetchOnReconnect: true,
  refetchOnFocus: true,
  endpoints: (builder) => ({
    listUsers: builder.query<ListUsersResponse, { page?: number }>({
      query: ({ page = 1 }) => `users?page=${page}`,
      keepUnusedDataFor: 10,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "User" as const, id })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
      transformResponse: (response: ListUsersResponse) => ({
        ...response,
        data: response.data.map((user) => ({
          ...user,
          first_name: user.first_name.trim(),
        })),
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          // Logging successful data retrieval
          console.log("listUsers success:", { arg, data });
        } catch (error) {
          // Logging error
          console.error("listUsers error:", { arg, error });
        }
      },
    }),
    getUser: builder.query<Data, number>({
      query: (id) => `users/${id}`,
      transformResponse: (res: { data: Data }) => res.data,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    createUser: builder.mutation<
      { id: string; createdAt: string },
      CreateUserRequest
    >({
      query: (body) => ({
        url: "users",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
      transformErrorResponse: (response) => ({
        message: "Error creating user",
        ...response,
      }),
    }),
    updateUser: builder.mutation<{ updatedAt: string }, UpdateUserRequest>({
      query: ({ id, ...patch }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    }),
    deleteUser: builder.mutation<{}, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "User", id }],
    }),
  }),
});

export const {
  useListUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;