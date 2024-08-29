import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

export const Header = () => {
  return (
    <div className="w-full border-b border-b-gray-400">
        <div className='flex items-center justify-between w-full py-4 px-8'>
        <h1 className='text-xl font-semibold'>Rate My Professor</h1>
        <div className='flex gap-4 items-center'>
        <SignedOut>
            <Button>
              <Link href="/sign-up">
              Sign Up
              </Link>
            </Button>
            <Button>
              <Link href="/sign-in">
              Sign In
              </Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        </div>
    </div>
  )
}
