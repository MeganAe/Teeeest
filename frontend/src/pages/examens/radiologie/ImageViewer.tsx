import { useState, useEffect } from 'react'
import { ZoomIn, ZoomOut, RotateCw, Download, ChevronLeft, ChevronRight } from 'lucide-react'
import { GlassCard } from '@/components/glassmorphic/GlassCard'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Select } from '@/components/ui/Select'
import { api } from '@/services/api'

export function ImageViewer() {
  const [images, setImages] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [selectedPatient, setSelectedPatient] = useState('')

  useEffect(() => {
    if (selectedPatient) {
      api.get(`/exams/radiologie/images/${selectedPatient}`).then(res => setImages(res.data))
    }
  }, [selectedPatient])

  const currentImage = images[currentIndex]

  return (
    <GlassCard className="p-4 mt-4">
      <div className="space-y-4">
        <Select
          label="Sélectionner un patient"
          options={[]} // À charger depuis API
          value={selectedPatient}
          onChange={(e) => setSelectedPatient(e.target.value)}
        />

        {currentImage && (
          <>
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <GlassButton size="sm" variant="ghost" onClick={() => setZoom(z => Math.min(z + 0.25, 3))}>
                  <ZoomIn className="w-4 h-4" />
                </GlassButton>
                <GlassButton size="sm" variant="ghost" onClick={() => setZoom(z => Math.max(z - 0.25, 0.5))}>
                  <ZoomOut className="w-4 h-4" />
                </GlassButton>
                <GlassButton size="sm" variant="ghost" onClick={() => setRotation(r => (r + 90) % 360)}>
                  <RotateCw className="w-4 h-4" />
                </GlassButton>
              </div>
              <div className="flex gap-2">
                <GlassButton size="sm" variant="ghost" onClick={() => setCurrentIndex(i => Math.max(0, i - 1))} disabled={currentIndex === 0}>
                  <ChevronLeft className="w-4 h-4" />
                </GlassButton>
                <span className="text-sm">{currentIndex + 1} / {images.length}</span>
                <GlassButton size="sm" variant="ghost" onClick={() => setCurrentIndex(i => Math.min(images.length - 1, i + 1))} disabled={currentIndex === images.length - 1}>
                  <ChevronRight className="w-4 h-4" />
                </GlassButton>
              </div>
              <GlassButton size="sm" variant="ghost">
                <Download className="w-4 h-4" />
              </GlassButton>
            </div>

            <div className="flex justify-center bg-slate-900 rounded-xl p-4 min-h-[500px]">
              <img
                src={currentImage.url}
                alt={`Radiologie ${currentIndex + 1}`}
                style={{
                  transform: `scale(${zoom}) rotate(${rotation}deg)`,
                  transition: 'transform 0.2s ease',
                }}
                className="max-w-full max-h-[500px] object-contain"
              />
            </div>

            <div className="text-sm text-slate-500">
              <p>Date: {new Date(currentImage.createdAt).toLocaleString()}</p>
              <p>Type: {currentImage.examType}</p>
              <p>Radiologue: Dr {currentImage.radiologue}</p>
            </div>
          </>
        )}

        {!currentImage && selectedPatient && (
          <div className="text-center py-12 text-slate-500">
            Aucune image disponible pour ce patient
          </div>
        )}
      </div>
    </GlassCard>
  )
}