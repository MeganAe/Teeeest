import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Image, FileText } from 'lucide-react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Select } from '@/components/ui/Select'
import { api } from '@/services/api'
import { useNotificationStore } from '@/stores/notificationStore'

export function ImageUploader() {
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [patientId, setPatientId] = useState('')
  const [examType, setExamType] = useState('')
  const { showSuccess, showError } = useNotificationStore()

  const onDrop = useCallback((acceptedFiles: any[]) => {
    setFiles(prev => [...prev, ...acceptedFiles.map(f => ({ file: f, preview: URL.createObjectURL(f) }))])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.dicom', '.dcm'] },
    maxSize: 50 * 1024 * 1024,
  })

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const uploadFiles = async () => {
    if (!patientId) {
      showError('Veuillez sélectionner un patient')
      return
    }
    setUploading(true)
    const formData = new FormData()
    formData.append('patientId', patientId)
    formData.append('examType', examType)
    files.forEach(f => formData.append('images', f.file))

    try {
      await api.post('/exams/radiologie/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      showSuccess('Images uploadées avec succès')
      setFiles([])
    } catch (error) {
      showError('Erreur lors de l\'upload')
    } finally {
      setUploading(false)
    }
  }

  return (
    <GlassCard className="p-4 mt-4">
      <div className="space-y-4">
        <Select
          label="Patient"
          options={[]} // À charger depuis API
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        />
        <Select
          label="Type d'examen"
          options={[
            { value: 'RADIOGRAPHIE', label: 'Radiographie' },
            { value: 'ECHOGRAPHIE', label: 'Échographie' },
            { value: 'SCANNER', label: 'Scanner' },
            { value: 'IRM', label: 'IRM' },
          ]}
          value={examType}
          onChange={(e) => setExamType(e.target.value)}
        />

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-medical-primary bg-medical-primary/10' : 'border-white/20 hover:border-medical-primary/50'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400" />
          <p className="text-slate-500">Glissez-déposez vos images ici ou cliquez pour sélectionner</p>
          <p className="text-xs text-slate-400 mt-2">JPEG, PNG, DICOM (max 50MB)</p>
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Images à uploader ({files.length})</h4>
            <div className="grid grid-cols-4 gap-2">
              {files.map((file, index) => (
                <div key={index} className="relative group">
                  <img src={file.preview} alt="Preview" className="w-full h-24 object-cover rounded-lg" />
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <GlassButton onClick={uploadFiles} loading={uploading} disabled={files.length === 0} className="w-full">
          Uploader {files.length} image(s)
        </GlassButton>
      </div>
    </GlassCard>
  )
}