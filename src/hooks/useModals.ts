import { createGlobalState } from 'react-use'
import { dropWhile } from 'lodash-es'
import { merge } from 'lodash-es'

type ModalLayout = 'SingleButton' | 'DualButton'

type ModalButton = 'primary' | 'secondary'

type Modal = {
  id: string
  title: string
  layout: ModalLayout
  primaryLabel: string
  secondaryLabel?: string
  renderMessage?: () => JSX.Element
  callback: (button: ModalButton) => void
}

type ModalParams = Omit<Modal, 'id'>

type ModalHelper = {
  show(params: ModalParams): string
  hide(id: string): void
}

const useSharedState = createGlobalState<Modal[]>([])

export function useModals(): Modal[] {
  const [sharedModals] = useSharedState()
  return sharedModals
}

export function useModalHelper(): ModalHelper {
  const [sharedModals, setSharedModals] = useSharedState()

  return {
    show(params: ModalParams) {
      const modal: Modal = merge({ id: Math.random().toString(36) }, params)
      setSharedModals(sharedModals.concat(modal))
      return modal.id
    },

    hide(id: string) {
      setSharedModals(dropWhile(sharedModals, { id }))
    },
  }
}
