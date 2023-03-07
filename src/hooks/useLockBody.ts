import { useEffectOnce } from 'react-use'

/**
 * Don't use react-use `useLockBodyScroll()` hook because it is trash
 */
function useLockBody(): void {
  useEffectOnce(() => {
    const offset = window.pageYOffset
    const nextRoot: HTMLElement | null = document.getElementById('__next')
    if (!nextRoot) {
      throw new Error('Cannot find next root in DOM tree')
    }

    nextRoot.className = 'fixed left-0 right-0'
    nextRoot.style.top = `-${offset}px`

    return () => {
      nextRoot.className = ''
      nextRoot.style.removeProperty('top')
      window.scrollTo(0, offset)
    }
  })
}

export default useLockBody
