import { NotificationAction } from '@nuxthq/ui/dist/runtime/types/notification'

interface NotificationErrorProps {
  id: string
  title?: string | undefined
  description?: string | undefined
  timeout?: number | undefined
  click?: Function | undefined
  callback?: Function | undefined
  actions?: NotificationAction[] | undefined
}

export const useNotification = () => {
  const toast = useToast()

  const success = ({
    id,
    title,
    description,
    timeout = 5000,
    click,
    callback
  }: NotificationErrorProps) => {
    toast.add({
      id,
      title,
      description,
      timeout,
      click,
      callback,
      icon: 'i-mdi-check-circle',
      color: 'green'
    })
  }

  const warning = ({
    id,
    title,
    description,
    timeout = 5000,
    click,
    callback
  }: NotificationErrorProps) => {
    toast.add({
      id,
      title,
      description,
      timeout,
      click,
      callback,
      icon: 'i-mdi-alert',
      color: 'amber'
    })
  }

  const error = ({
    id,
    title,
    description,
    timeout = 5000,
    click,
    callback
  }: NotificationErrorProps) => {
    toast.add({
      id,
      title,
      description,
      timeout,
      click,
      callback,
      icon: 'i-mdi-close-circle',
      color: 'red'
    })
  }

  return { success, warning, error }
}
