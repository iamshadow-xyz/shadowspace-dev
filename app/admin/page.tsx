import React from 'react'
import db from '@/db'
import { users } from '@/db/schema'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function page() {
  const dbUser = await db.select().from(users)
  if (!dbUser[0].admin) {
    redirect("/")
  }
  return (
    <div className='container mt-20'>
      {
        dbUser[0].admin ? (
            <div>
              <h1>Your are admin</h1>
            </div>
        ) : (
            <h1>You are not admin got to <Link href={"/"}>Home</Link></h1>
        )
      }
    </div>
  )
}
