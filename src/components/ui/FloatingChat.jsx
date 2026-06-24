import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi'

export default function FloatingChat() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-primary-600 to-cyan-500 text-white rounded-full shadow-lg hover:shadow-hover"
        aria-label="Chat support"
      >
        {open ? <FiX size={24} /> : <FiMessageCircle size={24} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-80 glass-card overflow-hidden"
          >
            <div className="bg-gradient-to-r from-primary-600 to-cyan-500 p-4 text-white">
              <h3 className="font-semibold">MediCare Support</h3>
              <p className="text-sm text-white/80">We typically reply within minutes</p>
            </div>
            <div className="p-4 h-48 overflow-y-auto">
              <div className="bg-primary-50 dark:bg-slate-700 rounded-lg p-3 text-sm">
                Hello! 👋 How can we help you today?
              </div>
            </div>
            <div className="p-3 border-t border-slate-200 dark:border-slate-700 flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                <FiSend size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
