import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { GlassInput } from '@/components/glassmorphic/GlassInput'
import { GlassButton } from '@/components/glassmorphic/GlassButton'
import { Select } from '@/components/ui/Select'

const patientSchema = z.object({
  nom: z.string().min(2, 'Nom requis'),
  prenom: z.string().min(2, 'Prénom requis'),
  sexe: z.enum(['M', 'F']),
  dateNaissance: z.string(),
  telephone: z.string().optional(),
  adresse: z.string().optional(),
  typeHandicap: z.enum(['MOTEUR', 'VISUEL', 'AUDITIF', 'MENTAL', 'MULTIPLE']),
})

type PatientFormData = z.infer<typeof patientSchema>

interface PatientFormProps {
  initialData?: Partial<PatientFormData>
  onSubmit: (data: PatientFormData) => void
  loading?: boolean
}

export function PatientForm({ initialData, onSubmit, loading }: PatientFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: initialData,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <GlassInput label="Nom" {...register('nom')} error={errors.nom?.message} />
        <GlassInput label="Prénom" {...register('prenom')} error={errors.prenom?.message} />
        <Select label="Sexe" options={[{ value: 'M', label: 'Masculin' }, { value: 'F', label: 'Féminin' }]} {...register('sexe')} />
        <GlassInput label="Date de naissance" type="date" {...register('dateNaissance')} />
        <GlassInput label="Téléphone" {...register('telephone')} />
        <Select label="Type de handicap" options={[
          { value: 'MOTEUR', label: 'Moteur' },
          { value: 'VISUEL', label: 'Visuel' },
          { value: 'AUDITIF', label: 'Auditif' },
          { value: 'MENTAL', label: 'Mental' },
          { value: 'MULTIPLE', label: 'Multiple' },
        ]} {...register('typeHandicap')} />
      </div>
      <GlassInput label="Adresse" {...register('adresse')} />
      <GlassButton type="submit" loading={loading} className="w-full">
        {initialData ? 'Modifier' : 'Créer'} le patient
      </GlassButton>
    </form>
  )
}