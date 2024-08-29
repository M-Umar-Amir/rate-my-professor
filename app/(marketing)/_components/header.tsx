import { Button } from '@/components/ui/button'
import React from 'react'

export const Header = () => {
  return (
    <div className="w-full border-b border-b-gray-400">
        <div className='flex items-center justify-between w-full py-4 px-8'>
        <h1 className='text-xl font-semibold'>Rate My Professor</h1>
        <div className='flex gap-4 items-center'>
            <Button className="">
                Login
            </Button>
            <Button className="">
                Sign Up
            </Button>
        </div>
        </div>
    </div>
  )
}
