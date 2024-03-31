'use client'

import { useSession } from 'next-auth/react'

const TestPage = () => {
  const { data: session } = useSession()

  console.log(session)

  return <div>Hola</div>
}

export default TestPage
