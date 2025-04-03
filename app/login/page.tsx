import SubmitButton from '@/components/utils/submit-button'
import Github from '@/components/icons/github'
import Google from '@/components/icons/google'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React from 'react'
import { signIn } from '@/auth'

export default function page() {
  return (
    <div className='mt-40'>
      <Card className='max-w-md mx-auto'>
        <CardHeader className='text-center'>
            <CardTitle >
                <div className='flex flex-col items-center gap-2'>
                    <Image src="/logo.png" alt='Shadowspace' height={42} width={42} />
                    <h1 className='text-xl font-bold'>Shadowspace</h1>
                </div>
            </CardTitle>
            <CardDescription>Welcome back, Login with your social provider</CardDescription>
        </CardHeader>
        <CardContent className='space-y-2'>
          <form action={
            async () => {
              "use server"
              await signIn('google', {
                redirectTo: "/"
              })
            }
          }>
            <SubmitButton text="Continue with Google" className='w-full' icon={<Google/>} variant='outline'/>
          </form>
          <form action={
            async () => {
              "use server"
              await signIn('github', {
                redirectTo  : "/"
              })
            }
          }>
            <SubmitButton text="Continue with GitHub" className='w-full' icon={<Github/>} variant='outline'/>
          </form>
          <p className='text-center'>Or</p>
          <div className='space-y-2'>
            <Input type="text" placeholder="Email" />
            <Input type="text" placeholder="Password" />
            </div>
            <SubmitButton text="Login" className='w-full' variant='default'/>
        </CardContent>
        <CardFooter>
            <CardDescription className='text-center'>Don&apos;t have an account? <a href="/register" className='text-primary'>Register</a></CardDescription>
        </CardFooter>
      </Card>
    </div>
  )
}
