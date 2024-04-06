import { LoginForm } from '@/modules/auth/components/login-form'

const LoginPage = ({
  searchParams,
}: {
  searchParams: {
    redirect?: string
  }
}) => {
  return <LoginForm redirect={searchParams.redirect} />
}

export default LoginPage
