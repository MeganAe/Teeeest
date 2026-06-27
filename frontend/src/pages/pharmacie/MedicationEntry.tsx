import { useForm } from 'react-hook-form'
import { GlassModal } from '@/components/glassmorphic/GlassModal'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { api } from '@/services/api'
import { useNotificationStore } from '@/stores/notificationStore'

interface MedicationEntryProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

const categories = [
  { value: 'ANTIBIOTIQUE', label: 'Antibiotique' },
  { value: 'ANALGESIQUE', label: 'Analgésique' },
  { value: 'ANTI_INFLAMMATOIRE', label: 'Anti-inflammatoire' },
  { value: 'ANTIHYPERTENSEUR', label: 'Antihypertenseur' },
  { value: 'ANTIDIABETIQUE', label: 'Antidiabétique' },
  { value: 'VITAMINE', label: 'Vitamine' },
  { value: 'AUTRE', label: 'Autre' },
]

const units = [
  { value: 'comprimé', label: 'Comprimé' },
  { value: 'gélule', label: 'Gélule' },
  { value: 'ml', label: 'Millilitre' },
  { value: 'mg', label: 'Milligramme' },
  { value: 'g', label: 'Gramme' },
  { value: 'boîte', label: 'Boîte' },
]

export function MedicationEntry({ isOpen, onClose, onSuccess }: MedicationEntryProps) {
  const { register, handleSubmit, reset } = useForm()
  const { showSuccess } = useNotificationStore()

  const onSubmit = async (data: any) => {
    await api.post('/pharmacy/medications', {
      ...data,
      price: parseFloat(data.price),
      stock: parseInt(data.stock) || 0,
      threshold: parseInt(data.threshold) || 10,
    })
    showSuccess('Médicament ajouté avec succès')
    reset()
    onSuccess()
  }

  return (
    <GlassModal isOpen={isOpen} onClose={onClose} title="Nouveau médicament">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <GlassInput label="Nom du médicament" {...register('name', { required: true })} />
        <Select label="Catégorie" options={categories} {...register('category', { required: true })} />
        <Select label="Unité" options={units} {...register('unit', { required: true })} />
        <GlassInput label="Prix unitaire (FC)" type="number" {...register('price', { required: true })} />
        <GlassInput label="Stock initial" type="number" {...register('stock')} />
        <GlassInput label="Seuil d'alerte" type="number" {...register('threshold')} />
        <GlassInput label="Date d'expiration" type="date" {...register('expiryDate')} />
        <Textarea label="Description" {...register('description')} rows={3} />
        <div className="flex gap-3">
          <GlassButton type="submit" className="flex-1">Enregistrer</GlassButton>
          <GlassButton type="button" variant="ghost" onClick={onClose}>Annuler</GlassButton>
        </div>
      </form>
    </GlassModal>
  )
}