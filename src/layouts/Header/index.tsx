import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import classnames from 'classnames'
import { throttle } from 'lodash-es'

const routes = [
  { path: '/movies/now-playing', label: 'Now Playing' },
  { path: '/movies/top-rated', label: 'Top Rated' },
]

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (window.scrollY > 0) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }, 100)

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={classnames('sticky top-0 w-full bg-white z-header', {
        'shadow-lg': scrolled,
        'border-b': !scrolled,
      })}
    >
      <nav>
        <ul className="max-w-container px-container mx-auto flex items-center gap-x-3 overflow-x-auto text-sm">
          {routes.map(({ path, label }) => (
            <li
              key={path}
              className={`py-2 border-b-2 ${
                router.pathname === path
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-white text-gray-500'
              }`}
            >
              <Link href={path}>
                <a className="py-2.5 px-4 rounded-lg duration-150 hover:text-indigo-600 hover:bg-gray-50 active:bg-gray-100 font-medium">
                  {label}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
