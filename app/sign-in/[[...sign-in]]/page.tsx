import { SignIn } from '@clerk/nextjs'
import React from 'react'

export default function SignUpPage() {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
        <SignIn />
    </div>
  )
}
