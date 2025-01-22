import { SignIn } from '@clerk/nextjs'
import React from 'react'
import { dark } from '@clerk/themes'
const SignInComponent = () => {
  return (
    <SignIn
      appearance={{
        baseTheme: dark
      }}
    />
  )
}

export default SignInComponent
