export const APP_CONFIG = {
  name: 'AMKA Medical Center',
  version: '1.0.0',
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  appEnv: import.meta.env.VITE_APP_ENV || 'development',
}

export const ROLES_CONFIG = {
  ADMIN: { label: 'Administrateur', color: 'red' },
  RECEPTIONIST: { label: 'Réceptionniste', color: 'blue' },
  PERCEPTEUR: { label: 'Percepteur', color: 'green' },
  MEDECIN_DIRECTEUR: { label: 'Médecin Directeur', color: 'purple' },
  MEDECIN_PSYCHIATRE: { label: 'Médecin Psychiatre', color: 'purple' },
  MEDECIN_ORTHOPEDIEN: { label: 'Médecin Orthopédien', color: 'purple' },
  LABORANTIN: { label: 'Laborantin', color: 'orange' },
  TECHNICIEN_EEG: { label: 'Technicien EEG', color: 'orange' },
  TECHNICIEN_ECG: { label: 'Technicien ECG', color: 'orange' },
  RADIOLOGUE: { label: 'Radiologue', color: 'orange' },
  KINESITHERAPEUTE: { label: 'Kinésithérapeute', color: 'cyan' },
  INFIRMIER: { label: 'Infirmier', color: 'cyan' },
  PHARMACIEN: { label: 'Pharmacien', color: 'teal' },
  COMPTABLE: { label: 'Comptable', color: 'yellow' },
}

export const PAYMENT_TYPES = {
  CONSULTATION: 'Consultation',
  EXAMEN: 'Examen',
  TRAITEMENT: 'Traitement',
  PHARMACIE: 'Pharmacie',
  HOSPITALISATION: 'Hospitalisation',
}

export const PAYMENT_METHODS = {
  ESPECES: 'Espèces',
  MOBILE_MONEY: 'Mobile Money',
  CARTE: 'Carte bancaire',
}