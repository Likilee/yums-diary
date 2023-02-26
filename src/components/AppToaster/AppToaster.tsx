import { Toaster } from 'react-hot-toast'

export default function AppToaster() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 2500,
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
        success: {
          className: 'bg-primary',
        },
      }}
      containerStyle={{
        top: 'env(safe-area-inset-top)',
      }}
    />
  )
}
