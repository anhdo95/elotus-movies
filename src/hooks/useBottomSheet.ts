import { createGlobalState } from 'react-use'

interface State {
  visible: boolean
}

const useBottomSheet = createGlobalState<State>({
  visible: false,
})

export default useBottomSheet
