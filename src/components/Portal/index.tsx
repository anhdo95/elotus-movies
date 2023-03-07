import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { useMount } from 'react-use'

const Portal: React.FC = ({ children }) => {
  const portalEl = useRef<HTMLDivElement>(createElement())

  useMount(() => {
    document.body.appendChild(portalEl.current)

    return () => {
      document.body.removeChild(portalEl.current)
    }
  })

  return createPortal(children, portalEl.current)
}

const createElement = () => {
  const element = document.createElement('div')
  element.className = 'fixed top-0 left-0 z-portal'
  return element
}

export default Portal
