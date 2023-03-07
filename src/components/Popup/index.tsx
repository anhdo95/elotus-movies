import { MouseEvent } from 'react'
import { motion } from 'framer-motion'
import classNames from 'classnames'
import Portal from '@/components/Portal'
import useLockBody from '@/hooks/useLockBody'

type Props = {
  animatedWrapper?: boolean
  animatedChild?: boolean
  childClassName?: string
  duration?: number
  onDismiss: () => void
}

const Popup: React.FC<Props> = ({
  animatedWrapper = true,
  animatedChild = true,
  childClassName,
  duration = 0.2,
  children,
  onDismiss,
}) => {
  useLockBody()

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onDismiss()
    }
  }

  return (
    <Portal>
      <motion.div
        className={classes.root}
        initial={animatedWrapper ? { opacity: 0 } : true}
        animate={{ opacity: 1 }}
        exit={animatedWrapper ? { opacity: 0 } : undefined}
        transition={{ duration }}
        onClick={handleClick}
      >
        <motion.div
          initial={animatedChild ? { scale: 1.1 } : true}
          animate={{ scale: 1 }}
          transition={{ duration }}
          exit={animatedChild ? { scale: 0.9 } : undefined}
          className={classNames('max-w-container px-4', childClassName)}
        >
          {children}
        </motion.div>
      </motion.div>
    </Portal>
  )
}

const classes = {
  root: classNames(
    'fixed top-0 left-0 right-0 bottom-0',
    'flex justify-center items-center',
    'bg-0006'
  ),
}

export default Popup
