import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const useToast = () => {
  const { t, i18n } = useTranslation('toast')

  const showToast = ({ code, type = 'success' }) => {
    try {
      const message = i18n.t(code)
      if (type === 'error') {
        toast.error(message)
      } else {
        toast.success(message)
      }
    } catch (err) {
      console.warn('Toast translation failed:', code, err)
    }
  }

  return { showToast }
}

export default useToast
