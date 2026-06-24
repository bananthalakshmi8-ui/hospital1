import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiUpload, FiFile, FiX, FiCheck, FiImage } from 'react-icons/fi'
import ScrollReveal from '../components/ui/ScrollReveal'
import { useToast } from '../context/ToastContext'

export default function PrescriptionUpload() {
  const [files, setFiles] = useState([])
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const inputRef = useRef(null)
  const { addToast } = useToast()

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    addFiles(droppedFiles)
  }

  const handleFileInput = (e) => {
    const selected = Array.from(e.target.files)
    addFiles(selected)
  }

  const addFiles = (newFiles) => {
    const valid = newFiles.filter(
      (f) => f.type.startsWith('image/') || f.type === 'application/pdf'
    )
    if (valid.length < newFiles.length) {
      addToast('Only images and PDF files are allowed', 'warning')
    }
    const fileObjects = valid.map((file) => ({
      file,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      type: file.type,
    }))
    setFiles((prev) => [...prev, ...fileObjects])
  }

  const removeFile = (index) => {
    setFiles((prev) => {
      const updated = [...prev]
      if (updated[index].preview) URL.revokeObjectURL(updated[index].preview)
      updated.splice(index, 1)
      return updated
    })
  }

  const handleUpload = () => {
    if (files.length === 0) {
      addToast('Please add at least one file', 'error')
      return
    }
    setUploading(true)
    setTimeout(() => {
      setUploading(false)
      setUploaded(true)
      addToast('Prescription uploaded successfully!')
    }, 2000)
  }

  const resetUpload = () => {
    files.forEach((f) => { if (f.preview) URL.revokeObjectURL(f.preview) })
    setFiles([])
    setUploaded(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="bg-hero-gradient py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Upload Prescription</h1>
          <p className="text-white/80">Upload your doctor's prescription and we'll deliver your medicines</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {uploaded ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-10 text-center"
            >
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiCheck className="text-green-500" size={40} />
              </div>
              <h2 className="text-2xl font-bold mb-2">Prescription Uploaded!</h2>
              <p className="text-slate-500 mb-2">Reference ID: RX{Date.now().toString().slice(-8)}</p>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Our pharmacist will verify your prescription and contact you within 2 hours with available medicines and pricing.
              </p>
              <button onClick={resetUpload} className="btn-primary">Upload Another</button>
            </motion.div>
          ) : (
            <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <ScrollReveal>
                {/* Steps */}
                <div className="flex justify-center gap-8 mb-10">
                  {['Upload', 'Preview', 'Submit'].map((step, i) => (
                    <div key={step} className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        (i === 0 && files.length > 0) || (i === 1 && files.length > 0) || (i === 2 && uploading)
                          ? 'bg-primary-600 text-white'
                          : i === 0 ? 'bg-primary-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                      }`}>
                        {i + 1}
                      </div>
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400 hidden sm:block">{step}</span>
                    </div>
                  ))}
                </div>

                {/* Drop Zone */}
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => inputRef.current?.click()}
                  className={`glass-card border-2 border-dashed p-10 md:p-16 text-center cursor-pointer transition-all duration-300 ${
                    dragActive
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 scale-[1.02]'
                      : 'border-slate-300 dark:border-slate-600 hover:border-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-900/10'
                  }`}
                >
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/*,.pdf"
                    multiple
                    onChange={handleFileInput}
                    className="hidden"
                  />
                  <motion.div animate={dragActive ? { scale: 1.1 } : { scale: 1 }}>
                    <FiUpload className="mx-auto text-primary-500 mb-4" size={48} />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                    Drag & Drop your prescription here
                  </h3>
                  <p className="text-slate-500 mb-4">or click to browse files</p>
                  <p className="text-xs text-slate-400">Supports: JPG, PNG, PDF (Max 10MB each)</p>
                </div>

                {/* Preview */}
                {files.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 space-y-4"
                  >
                    <h3 className="font-semibold text-slate-800 dark:text-white">Preview ({files.length} file{files.length > 1 ? 's' : ''})</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {files.map((f, i) => (
                        <div key={i} className="glass-card p-4 relative group">
                          <button
                            onClick={() => removeFile(i)}
                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                          >
                            <FiX size={14} />
                          </button>
                          {f.preview ? (
                            <img src={f.preview} alt={f.name} className="w-full h-40 object-cover rounded-lg mb-3" />
                          ) : (
                            <div className="w-full h-40 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center mb-3">
                              <FiFile className="text-primary-500" size={40} />
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            {f.type.startsWith('image/') ? <FiImage size={14} className="text-slate-400" /> : <FiFile size={14} className="text-slate-400" />}
                            <div className="min-w-0">
                              <p className="text-sm font-medium truncate">{f.name}</p>
                              <p className="text-xs text-slate-400">{f.size}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={handleUpload}
                      disabled={uploading}
                      className="btn-primary w-full text-lg py-4 mt-4 disabled:opacity-60"
                    >
                      {uploading ? (
                        <span className="flex items-center gap-2">
                          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Uploading...
                        </span>
                      ) : (
                        <><FiUpload /> Upload Prescription</>
                      )}
                    </button>
                  </motion.div>
                )}

                {/* Instructions */}
                <div className="mt-10 glass-card p-6">
                  <h3 className="font-semibold mb-4">Upload Guidelines</h3>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-start gap-2"><span className="text-primary-500 mt-0.5">•</span> Ensure the prescription is clearly visible and not blurred</li>
                    <li className="flex items-start gap-2"><span className="text-primary-500 mt-0.5">•</span> Doctor's name, signature, and date must be visible</li>
                    <li className="flex items-start gap-2"><span className="text-primary-500 mt-0.5">•</span> Upload both sides if prescription is on two pages</li>
                    <li className="flex items-start gap-2"><span className="text-primary-500 mt-0.5">•</span> Valid prescriptions are required for Schedule H medicines</li>
                    <li className="flex items-start gap-2"><span className="text-primary-500 mt-0.5">•</span> Our pharmacist will verify within 2 hours</li>
                  </ul>
                </div>
              </ScrollReveal>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
