import { HTMLAttributes, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import classNames from 'classnames'

import useBottomSheet from '@/hooks/useBottomSheet'
import Popup from '@/components/Popup'

type Props = HTMLAttributes<HTMLDivElement> & {
  visible: boolean
  onClose: () => void
}

const BottomSheet: React.FC<Props> = ({
  className,
  visible,
  children,
  onClose,
}) => {
  const [, setBottomSheet] = useBottomSheet()

  useEffect(() => {
    setBottomSheet({ visible })
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <Popup onDismiss={onClose} animatedChild={false} duration={0.4}>
          <motion.div
            variants={{
              shown: {
                transform: 'translate3d(0, 0%, 0)',
              },
              hidden: {
                transform: 'translate3d(0, 100%, 0)',
              },
            }}
            initial="hidden"
            animate="shown"
            exit="hidden"
            transition={{ bounce: false, duration: 0.4 }}
            className={classNames('fixed left-0 bottom-0 w-full', className)}
          >
            {children}
          </motion.div>
        </Popup>
      )}
    </AnimatePresence>
  )
}

export default BottomSheet
