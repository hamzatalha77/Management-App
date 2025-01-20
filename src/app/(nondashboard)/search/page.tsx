import React from 'react'
import { useSearchParams } from 'next/navigation'
import { useGetCoursesQuery } from '@/app/state/api'

const Search = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const { data: courses, isLoading, isError } = useGetCoursesQuery()
  return <div></div>
}

export default Search
