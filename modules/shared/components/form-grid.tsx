export const FormGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full mt-4 mb-6'>
      {children}
    </div>
  )
}
