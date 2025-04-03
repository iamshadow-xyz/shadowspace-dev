import React from 'react'
import { buttonVariants } from '../ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { auth } from '@/auth'
import UserButton from '../utils/user-button'

export default async function Header() {
  const session = await auth()
  const user = session?.user
  return (
    <header className='border-b backdrop-blur-md fixed top-0 left-0 right-0 w-full'>
      <div className='container flex items-center justify-between'>
        <div className='flex items-center gap-2'>
            <Image src="/logo.png" alt='Shadowspace' height={38} width={38} />
            <h1>Shadowspace</h1>
        </div>
        <nav className='flex items-center gap-2'>
            {user ? (
              <div className='flex items-center gap-2'>
                <Link href="/create-post" className={buttonVariants({ variant: "outline", size: "sm" })}>Create Post</Link>
                <UserButton/>
              </div>
            ) : (
                <Link href="/login" className={buttonVariants({ variant: "default" })}>Sign in</Link>
            )}
        </nav>
      </div>
    </header>
  )
}
