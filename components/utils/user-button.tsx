import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import React from 'react'
import { auth, signOut } from '@/auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import SubmitButton from './submit-button'
import { redirect } from 'next/navigation'
import db from '@/db'
import { users } from '@/db/schema'

export default async function UserButton() {
  const dbUser = await db.select().from(users)
  const session = await auth()
  const user = session?.user
  return (
    <div>
          <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Avatar className='cursor-pointer'>
        <AvatarImage src={user?.image || ""} />
        <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
      </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          {user?.name}
        </DropdownMenuItem>
        {
            dbUser[0].admin
            && (
              <DropdownMenuItem>
                <Link href="/admin">Admin</Link>
              </DropdownMenuItem>
            )
          }
        <DropdownMenuItem>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <form action={async () => {
            "use server"
            await signOut()
            redirect('/login')
          }}>
            <SubmitButton text="Logout" className='w-full' variant='destructive'/>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}
