import { createContext, useContext, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiCheck, FiX, FiInfo, FiAlertCircle } from 'react-icons/fi'

const ToastContext = createContext()

const icons = {
  success: FiCheck,
  error: FiX,
  info: FiInfo,
  warning: FiAlertCircle,
}

const colors = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-primary-500',
  warning: 'bg-amber-500',
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-24 right-4 z-[9999] flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => {
            const Icon = icons[toast.type]
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 min-w-[280px]"
              >
                <div className={`p-1.5 rounded-lg ${colors[toast.type]} text-white`}>
                  <Icon size={16} />
                </div>
                <p className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                  {toast.message}
                </p>
                <button onClick={() => removeToast(toast.id)} className="text-slate-400 hover:text-slate-600">
                  <FiX size={16} />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

const defaultToast = { addToast: () => {} }

export const useToast = () => useContext(ToastContext) ?? defaultToast
