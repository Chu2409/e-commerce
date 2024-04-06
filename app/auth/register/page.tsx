import { RegisterForm } from '@/modules/auth/components/register-form'

const RegisterPage = ({
  searchParams,
}: {
  searchParams: {
    redirect?: string
  }
}) => {
  return <RegisterForm redirect={searchParams.redirect} />
}

export default RegisterPage
