import React from 'react'
import SignInPage from './SignIn/SignInPage'
import SignUpPage from './SignUp/SignUpPage'
import tw from 'twin.macro'
const AuthPage = () => {
  return (
    <div tw="grid grid-cols-2 relative gap-[10%]  px-8">
      <SignInPage/>
      <div tw='absolute w-[1px] top-0 left-[50%] -translate-x-4 h-full bg-[#7777]'></div>
      <SignUpPage/>
    </div>
  )
}

export default AuthPage
