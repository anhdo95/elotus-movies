import { NextPage } from 'next'
import { withErrorGuard } from '@/lib/withErrorGuard/withErrorGuard'
import MainLayout from '@/layouts/MainLayout'

const TopRated: NextPage = () => {
  return (
    <MainLayout>
      <section className="mt-4 mx-auto max-w-screen-xl">Top Rated</section>
    </MainLayout>
  )
}

export default TopRated

export const getServerSideProps = withErrorGuard(async () => {
  return { props: {} }
})
