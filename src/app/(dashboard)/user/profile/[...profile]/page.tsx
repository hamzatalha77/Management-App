import Header from '@/app/components/Header'
import { UserProfile } from '@clerk/nextjs'
import React from 'react'

const UserProfilePage = () => {
  return (
    <>
      <Header title="Profile" subtitle="View your profile" />
      <UserProfile />
    </>
  )
}

export default UserProfilePage
