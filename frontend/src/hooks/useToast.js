import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const useToast = () => {
  const { i18n } = useTranslation()

  const showToast = ({ type = 'default', code }) => {
    const message = i18n.t(code, { ns: 'toast' })

    if (type === 'success') {
      toast.success(message)
    }
    else if (type === 'error') {
      toast.error(message)
    }
    else {
      toast(message)
    }
  }

  return { showToast }
}

export default useToast
