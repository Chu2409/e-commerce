export const MainGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='grid gap-4 max-lg:justify-items-center min-[700px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-[1600px]:grid-cols-5'>
      {children}
    </div>
  )
}
