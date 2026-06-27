import { Sexe, HandicapType } from '@prisma/client'

export class PatientEntity {
  id: string
  numeroDossier: string
  nom: string
  postnom?: string
  prenom: string
  sexe: Sexe
  dateNaissance: Date
  telephone?: string
  adresse?: string
  contactUrgence?: string
  typeHandicap: HandicapType
  photo?: string
  createdBy: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}