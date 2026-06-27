export type Sexe = 'M' | 'F'
export type HandicapType = 'MOTEUR' | 'VISUEL' | 'AUDITIF' | 'MENTAL' | 'MULTIPLE'

export interface Patient {
  id: string
  numeroDossier: string
  nom: string
  postnom?: string
  prenom: string
  sexe: Sexe
  dateNaissance: string
  telephone?: string
  adresse?: string
  contactUrgence?: string
  typeHandicap: HandicapType
  photo?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CreatePatientDto {
  nom: string
  postnom?: string
  prenom: string
  sexe: Sexe
  dateNaissance: string
  telephone?: string
  adresse?: string
  contactUrgence?: string
  typeHandicap: HandicapType
  photo?: string
}

export interface UpdatePatientDto extends Partial<CreatePatientDto> {}