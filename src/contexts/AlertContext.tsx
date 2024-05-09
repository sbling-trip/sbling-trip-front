import {
  ComponentProps,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import Alert from '@components/shared/Alert'

type AlertProps = ComponentProps<typeof Alert>
type AlertOptions = Omit<AlertProps, 'isOpen'>

interface AlertContextValue {
  openAlert: (options: AlertOptions) => void
}

export const AlertContext = createContext<AlertContextValue | undefined>(
  undefined,
)

const defaultValues: AlertProps = {
  isOpen: false,
  onConfirmClick: () => {},
  onCancelClick: () => {},
}

export const AlertContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [alertState, setAlertState] = useState(defaultValues)
  const $root_portal = document.getElementById('root-portal')

  const closeAlert = useCallback(() => {
    setAlertState((prev) => ({ ...prev, isOpen: false }))
  }, [])

  const openAlert = useCallback(
    ({ onConfirmClick, onCancelClick, ...options }: AlertOptions) => {
      setAlertState({
        ...options,
        onConfirmClick: () => {
          closeAlert()
          onConfirmClick && onConfirmClick()
        },
        onCancelClick: () => {
          closeAlert()
          onCancelClick && onCancelClick()
        },
        isOpen: true,
      })
    },
    [closeAlert],
  )

  const values = useMemo(() => ({ openAlert }), [openAlert])

  return (
    <AlertContext.Provider value={values}>
      {children}
      {$root_portal !== null
        ? createPortal(<Alert {...alertState} />, $root_portal)
        : null}
    </AlertContext.Provider>
  )
}
