import { SignUp } from '@clerk/nextjs'
import React from 'react'

export default function SignInPage() {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
        <SignUp />
    </div>
  )
}
