# AMKA Medical System

Système de gestion médicale complet pour cliniques et hôpitaux.

## Stack Technique

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: NestJS + TypeScript + Prisma ORM
- **Base de données**: PostgreSQL 15
- **Auth**: JWT (access token + refresh token)

## Modules

| Module | Description |
|--------|-------------|
| Réception | Enregistrement des patients |
| Perception | Paiements et reçus |
| Consultation | Consultations médicales et prescriptions |
| Examens | Labo, Radio, ECG, EEG |
| Traitements | Kinésithérapie, Chirurgie, Soins infirmiers |
| Pharmacie | Stock médicaments et ventes |
| Comptabilité | Journal de caisse et dépenses |
| Rapports | Statistiques et exports |
| Administration | Gestion des utilisateurs |

## Comptes par défaut

| Email | Rôle | Mot de passe |
|-------|------|--------------|
| admin@amka.cd | Admin | password |
| doctor@amka.cd | Médecin Directeur | password |
| reception@amka.cd | Réceptionniste | password |
| pharmacy@amka.cd | Pharmacien | password |
| accounting@amka.cd | Comptable | password |
| perception@amka.cd | Percepteur | password |

---

## 🐳 Déploiement avec Docker (recommandé)

### Prérequis
- Docker Desktop installé
- Docker Compose installé

### Démarrage

```bash
# 1. Cloner/extraire le projet
cd amka-medical-system

# 2. Lancer tous les services
docker-compose up --build

# 3. Ouvrir dans le navigateur
# http://localhost:3000
```

Le premier démarrage peut prendre 2-3 minutes (build + migration DB + seed).

---

## 💻 Développement Local (sans Docker)

### Prérequis
- Node.js 18+
- PostgreSQL 15
- npm

### 1. Base de données

```bash
# Créer la base de données PostgreSQL
createdb amka_db
createuser amka_user
psql -c "ALTER USER amka_user WITH PASSWORD 'amka_password';"
psql -c "GRANT ALL PRIVILEGES ON DATABASE amka_db TO amka_user;"
```

Ou avec Docker juste pour la DB:
```bash
docker run -d \
  --name amka_postgres \
  -e POSTGRES_USER=amka_user \
  -e POSTGRES_PASSWORD=amka_password \
  -e POSTGRES_DB=amka_db \
  -p 5432:5432 \
  postgres:15-alpine
```

### 2. Backend

```bash
cd backend

# Installer les dépendances
npm install

# Générer le client Prisma
npx prisma generate

# Créer les tables
npx prisma migrate dev --name init

# Peupler la base avec les données initiales
npx ts-node src/prisma/seed.ts

# Démarrer en mode développement
npm run start:dev
# → Backend disponible sur http://localhost:5000
```

### 3. Frontend

```bash
cd frontend

# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev
# → Frontend disponible sur http://localhost:3000
```

---

## Structure du Projet

```
amka-medical-system/
├── backend/              # API NestJS
│   ├── src/
│   │   ├── modules/      # Modules fonctionnels
│   │   ├── common/       # Guards, decorators, filters
│   │   ├── config/       # Configuration (DB, JWT...)
│   │   └── prisma/       # Schema & seed
│   ├── prisma/
│   │   └── schema.prisma # Schéma de la base de données
│   └── package.json
├── frontend/             # App React
│   ├── src/
│   │   ├── pages/        # Pages par module
│   │   ├── components/   # Composants réutilisables
│   │   ├── services/     # Appels API
│   │   ├── stores/       # État global (Zustand)
│   │   └── types/        # Types TypeScript
│   └── package.json
└── docker-compose.yml    # Déploiement complet
```
