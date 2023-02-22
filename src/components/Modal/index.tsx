import { PropsWithChildren } from 'react'

type ModalType = 'create_note' | 'calendar'

interface ModalProps {
  modalId: ModalType
  className?: string
}

export function Modal({ modalId, children }: PropsWithChildren<ModalProps>) {
  return (
    <>
      <input type="checkbox" id={modalId} className="modal-toggle" />
      <label htmlFor={modalId} className="modal modal-bottom sm:modal-middle cursor-pointer">
        <label className="modal-box" htmlFor="">
          {children}
          {/* <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to use Wikipedia
            for free!
          </p>
          <div className="modal-action">
            <label htmlFor={modalId} className="btn">
              Yay!
            </label>
          </div> */}
        </label>
      </label>
    </>
  )
}

export function ModalTrigger({ modalId, className, children }: PropsWithChildren<ModalProps>) {
  return (
    <label htmlFor={modalId} className={className}>
      {children}
    </label>
  )
}
