import Head from 'next/head'
import classNames from 'classnames'

import Footer from '../Footer'
import Header from '../Header'

type Props = {
  className?: string
}

const MainLayout: React.FC<Props> = ({ children, className }) => {
  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </Head>
      <Header />
      <main
        className={classNames(
          'bg-white flex flex-col pb-12 mx-auto',
          className
        )}
      >
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
