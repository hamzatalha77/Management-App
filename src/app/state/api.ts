import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { FetchArgs, BaseQueryApi } from '@reduxjs/toolkit/query'
import { User } from '@clerk/nextjs/server'
import { Clerk } from '@clerk/clerk-js'

const customBaseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extraOptions: any
) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers) => {
      const token = await window.Clerk?.session?.getToken()
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    }
  })

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = await baseQuery(args, api, extraOptions)

    if (result.data) {
      result.data = result.data.data
    }

    return result
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error'
    return { error: { status: 'FETCH_ERROR', error: errorMessage } }
  }
}

export const api = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'api',
  tagTypes: ['Courses', 'Users'],
  endpoints: (build) => ({
    updateUser: build.mutation<User, Partial<User> & { userId: string }>({
      query: ({ userId, ...updatedUser }) => ({
        url: `/users/clerk/${userId}`,
        method: 'PUT',
        body: updatedUser
      }),
      invalidatesTags: ['Users']
    }),

    getCourses: build.query<Course[], { category?: string }>({
      query: ({ category }) => ({
        url: 'courses',
        params: { category }
      }),
      providesTags: ['Courses']
    }),

    getCourse: build.query<Course, string>({
      query: (id) => `courses/${id}`,
      providesTags: (result, error, id) => [{ type: 'Courses', id }]
    })
  })
})

export const { useUpdateUserMutation, useGetCoursesQuery, useGetCourseQuery } =
  api
