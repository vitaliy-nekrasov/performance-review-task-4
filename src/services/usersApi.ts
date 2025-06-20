import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, CreateUserRequest, UpdateUserRequest, Data } from "../types/user";

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
  endpoints: (builder) => ({
    listUsers: builder.query<ListUsersResponse, { page?: number }>({
      query: ({ page = 1 }) => `users?page=${page}`,
      keepUnusedDataFor: 1,
    }),
    getUser: builder.query<Data, number>({
      query: (id) => `users/${id}`,
      transformResponse: (res: { data: Data }) => res.data,
      keepUnusedDataFor: 1,
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
    }),
    updateUser: builder.mutation<{ updatedAt: string }, UpdateUserRequest>({
      query: ({ id, ...patch }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: patch,
      }),
    }),
    deleteUser: builder.mutation<{}, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
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
