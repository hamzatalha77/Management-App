import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useGetCoursesQuery } from '@/app/state/api'
import Loading from '@/app/components/Loading'

const Search = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const { data: courses, isLoading, isError } = useGetCoursesQuery({})
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (courses) {
      if (id) {
        const course = courses.find((c) => c.courseId === id)
        setSelectedCourse(course || courses[0])
      } else {
        setSelectedCourse(courses[0])
      }
    }
  }, [courses, id])
  if (isLoading) return <Loading />
  return <div>Search</div>
}

export default Search
