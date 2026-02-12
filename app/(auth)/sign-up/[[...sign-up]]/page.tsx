import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
  return (
    <SignUp 
      path="/sign-up" 
      routing="path" 
      signInUrl="/sign-in"
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
    />
  )
}

export default SignUpPage