import classNames from 'classnames'
import { AnimatePresence } from 'framer-motion'
import { last } from 'lodash-es'
import { useModalHelper, useModals } from '@/hooks/useModals'
import Popup from '@/components/Popup'

const Modal: React.FC = () => {
  const modals = useModals()
  const modalHelper = useModalHelper()
  const modal = last(modals)

  const handlePopupDismiss = () => {
    if (modal) {
      modalHelper.hide(modal.id)
    }
  }

  const handlePrimaryClick = () => {
    modal?.callback('primary')
  }

  const handleSecondaryClick = () => {
    modal?.callback('secondary')
  }

  const renderPrimaryButton = (extraClass?: string) => {
    return (
      <button
        className={classNames(classes.button, extraClass)}
        onClick={handlePrimaryClick}
      >
        {modal?.primaryLabel}
      </button>
    )
  }

  const renderSecondaryButton = () => {
    return (
      <button className={classes.button} onClick={handleSecondaryClick}>
        {modal?.secondaryLabel}
      </button>
    )
  }

  return (
    <AnimatePresence>
      {modal && (
        <Popup onDismiss={handlePopupDismiss}>
          <section className={classes.modal}>
            <h3 className={classes.title}>{modal.title}</h3>
            {modal.renderMessage && (
              <div className={classes.message}>{modal.renderMessage()}</div>
            )}
            <div className="mt-6">
              {modal.layout === 'SingleButton' && renderPrimaryButton()}
              {modal.layout === 'DualButton' && (
                <>
                  {renderPrimaryButton(classes.primary)}
                  {renderSecondaryButton()}
                </>
              )}
            </div>
          </section>
        </Popup>
      )}
    </AnimatePresence>
  )
}

// className="
const classes = {
  modal: classNames(
    'flow-root px-5 pt-[30px] pb-5 bg-white rounded w-100 shadow-lg'
  ),
  title: 'pb-[21px] font-bold text-center md:text-lg',
  message: classNames(
    'text-sm md:text-base text-justify text-black mb-[30px] leading-[160%] whitespace-pre-line overflow-auto'
    // max-height: 50vh;
    // -webkit-overflow-scrolling: touch;
  ),
  button: classNames(
    'block w-full p-[15px] rounded bg-white text-center text-sm'
    // 1px solid rgba(0, 0, 0, 0.1);
  ),
  primary: 'text-white bg-06c755 mb-2 font-bold border-06c755',
}
// "

export default Modal
