import MainLayout from '@/layouts/MainLayout'

const Error: React.FC = () => {
  return (
    <MainLayout>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2">
        <h1 className="font-bold">Server Error</h1>
      </div>
    </MainLayout>
  )
}

export default Error
