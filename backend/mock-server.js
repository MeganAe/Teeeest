const http = require('http')

const PORT = 5000

// Mock Database
const mockUsers = [
  {
    id: '1',
    email: 'admin@amka.cd',
    password: 'password',
    firstName: 'Admin',
    lastName: 'User',
    role: 'ADMIN',
    isActive: true,
  },
  {
    id: '2',
    email: 'doctor@amka.cd',
    password: 'password',
    firstName: 'Dr.',
    lastName: 'Médecin Directeur',
    role: 'MEDECIN_DIRECTEUR',
    isActive: true,
  },
  {
    id: '3',
    email: 'medecin@amka.cd',
    password: 'password',
    firstName: 'Dr.',
    lastName: 'Jean Médecin',
    role: 'MEDECIN',
    isActive: true,
  },
  {
    id: '4',
    email: 'infirmier@amka.cd',
    password: 'password',
    firstName: 'Infirmier',
    lastName: 'Mpiana',
    role: 'INFIRMIER',
    isActive: true,
  },
  {
    id: '5',
    email: 'pharmacy@amka.cd',
    password: 'password',
    firstName: 'Pharmacien',
    lastName: 'Kindu',
    role: 'PHARMACIEN',
    isActive: true,
  },
  {
    id: '6',
    email: 'comptable@amka.cd',
    password: 'password',
    firstName: 'Comptable',
    lastName: 'Mweka',
    role: 'COMPTABLE',
    isActive: true,
  },
  {
    id: '7',
    email: 'reception@amka.cd',
    password: 'password',
    firstName: 'Agent',
    lastName: 'Réception',
    role: 'RECEPTIONIST',
    isActive: true,
  },
  {
    id: '8',
    email: 'nettoyage@amka.cd',
    password: 'password',
    firstName: 'Agent',
    lastName: 'Nettoyage',
    role: 'AGENT_NETTOYAGE',
    isActive: true,
  },
]

const mockPatients = [
  {
    id: '101',
    numeroDossier: 'AMKA-2026-00001',
    nom: 'Tshimanga',
    postnom: 'Kasongo',
    prenom: 'Jean',
    sexe: 'M',
    dateNaissance: '1990-05-15',
    telephone: '+243812345678',
    adresse: 'Kindu, Maniema',
    contactUrgence: '+243812345679',
    typeHandicap: 'Mobilité',
    createdAt: new Date().toISOString(),
  },
  {
    id: '102',
    numeroDossier: 'AMKA-2026-00002',
    nom: 'Mwepu',
    postnom: 'Kalombo',
    prenom: 'Marie',
    sexe: 'F',
    dateNaissance: '1995-08-22',
    telephone: '+243812345680',
    adresse: 'Kindu, Maniema',
    typeHandicap: 'Auditif',
    createdAt: new Date().toISOString(),
  },
  {
    id: '103',
    numeroDossier: 'AMKA-2026-00003',
    nom: 'Kalunga',
    postnom: 'Nkulu',
    prenom: 'Pierre',
    sexe: 'M',
    dateNaissance: '1988-11-03',
    telephone: '+243812345681',
    adresse: 'Kindu, Maniema',
    typeHandicap: 'Visuel',
    createdAt: new Date().toISOString(),
  },
]

const mockPayments = [
  {
    id: '201',
    reference: 'RCP-2026-001',
    patientId: '101',
    amount: 50000,
    type: 'PAYMENT',
    status: 'paid',
    method: 'CASH',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '202',
    reference: 'RCP-2026-002',
    patientId: '102',
    amount: 75000,
    type: 'PAYMENT',
    status: 'paid',
    method: 'CARD',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: '203',
    reference: 'RCP-2026-003',
    patientId: '103',
    amount: 100000,
    type: 'PAYMENT',
    status: 'paid',
    method: 'CASH',
    createdAt: new Date(Date.now() - 259200000).toISOString(),
  },
]

const mockConsultations = [
  {
    id: '301',
    patientId: '101',
    doctorId: '2',
    date: new Date().toISOString(),
    status: 'EN_ATTENTE',
    symptoms: 'Mal de tête',
    notes: 'Follow-up consultation',
  },
]

const mockExams = [
  {
    id: '401',
    patientId: '101',
    type: 'RADIOGRAPHIE',
    status: 'COMPLETED',
    result: 'Normal',
    createdAt: new Date().toISOString(),
  },
]

const mockTreatments = [
  {
    id: '501',
    patientId: '101',
    medication: 'Paracétamol',
    dosage: '500mg',
    frequency: 'x3 par jour',
    duration: '7 jours',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
  },
]

const mockPharmacy = [
  { id: '601', name: 'Paracétamol', quantity: 150, unitPrice: 5000, stock: 150, dosage: '500mg', expiryDate: '2025-12-31' },
  { id: '602', name: 'Ampicilline', quantity: 50, unitPrice: 15000, stock: 50, dosage: '250mg', expiryDate: '2025-10-31' },
]

const mockAccounting = [
  {
    id: '801',
    description: 'Consultation médicale',
    amount: 25000,
    type: 'INCOME',
    category: 'Consultations',
    createdAt: new Date().toISOString(),
  },
  {
    id: '802',
    description: 'Achat médicaments',
    amount: 50000,
    type: 'EXPENSE',
    category: 'Stock',
    createdAt: new Date().toISOString(),
  },
]

const mockReports = [
  {
    id: '701',
    title: 'Rapport Financier Mai 2024',
    type: 'FINANCIAL',
    status: 'COMPLETED',
    dateRange: { start: '2024-05-01', end: '2024-05-31' },
    createdAt: new Date().toISOString(),
  },
]

const mockImpressions = [
  {
    id: '1',
    type: 'DOSSIER_PATIENT',
    documentName: 'Dossier Patient - Tshimanga',
    date: new Date().toISOString(),
    pages: 5,
    user: 'Admin User',
    patientId: '101',
  },
  {
    id: '2',
    type: 'ORDONNANCE',
    documentName: 'Ordonnance Médicale - Mwepu',
    date: new Date(Date.now() - 86400000).toISOString(),
    pages: 1,
    user: 'Dr. Médecin Directeur',
    patientId: '102',
  },
  {
    id: '3',
    type: 'RAPPORT_MEDICAL',
    documentName: 'Rapport Médical - Kalunga',
    date: new Date(Date.now() - 172800000).toISOString(),
    pages: 8,
    user: 'Dr. Médecin Directeur',
    patientId: '103',
  },
]

// Simple token generator (no JWT)
function generateToken() {
  return 'token_' + Math.random().toString(36).substr(2, 9)
}

// Request handler
const server = http.createServer((req, res) => {
  // CORS headers
  const origin = req.headers.origin
  if (origin && (origin.includes('localhost:3000') || origin.includes('localhost:3001') || origin.includes('localhost'))) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }

  const url = new URL(req.url, `http://${req.headers.host}`)
  const pathname = url.pathname
  const searchParams = url.searchParams

  // Helper to send JSON
  function sendJson(statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(data))
  }

  // Parse body for POST/PUT
  let body = ''
  req.on('data', (chunk) => {
    body += chunk.toString()
  })

  req.on('end', () => {
    try {
      const bodyData = body ? JSON.parse(body) : {}

      // ROUTES
      if (pathname === '/api/auth/login' && req.method === 'POST') {
        const { email, password } = bodyData
        const user = mockUsers.find((u) => u.email === email && u.password === password)
        if (!user) {
          return sendJson(401, { message: 'Invalid email or password' })
        }
        const { password: _, ...userWithoutPassword } = user
        sendJson(200, {
          access_token: generateToken(),
          refresh_token: generateToken(),
          user: userWithoutPassword,
        })
      } else if (pathname === '/api/auth/logout' && req.method === 'POST') {
        sendJson(200, { message: 'Logged out successfully' })
      } else if (pathname === '/api/patients' && req.method === 'GET') {
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const search = searchParams.get('search') || ''

        let filtered = mockPatients
        if (search) {
          filtered = mockPatients.filter(
            (p) =>
              p.nom.toLowerCase().includes(search.toLowerCase()) ||
              p.prenom.toLowerCase().includes(search.toLowerCase()) ||
              p.numeroDossier.includes(search)
          )
        }

        const start = (page - 1) * limit
        sendJson(200, {
          patients: filtered.slice(start, start + limit),
          total: filtered.length,
          page,
          limit,
          totalPages: Math.ceil(filtered.length / limit),
        })
      } else if (pathname.match(/^\/api\/patients\/\d+$/) && req.method === 'GET') {
        const id = pathname.split('/').pop()
        const patient = mockPatients.find((p) => p.id === id)
        sendJson(patient ? 200 : 404, patient || { message: 'Patient not found' })
      } else if (pathname === '/api/patients' && req.method === 'POST') {
        const newPatient = {
          id: String(mockPatients.length + 101),
          numeroDossier: `AMKA-2026-${String(mockPatients.length + 4).padStart(5, '0')}`,
          ...bodyData,
          createdAt: new Date().toISOString(),
        }
        mockPatients.push(newPatient)
        sendJson(201, newPatient)
      } else if (pathname === '/api/users' && req.method === 'GET') {
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const start = (page - 1) * limit

        sendJson(200, {
          users: mockUsers.slice(start, start + limit),
          total: mockUsers.length,
          page,
          limit,
          totalPages: Math.ceil(mockUsers.length / limit),
        })
      } else if (pathname.match(/^\/api\/users\/\d+$/) && req.method === 'GET') {
        const id = pathname.split('/').pop()
        const user = mockUsers.find((u) => u.id === id)
        const { password: _, ...userWithoutPassword } = user || {}
        sendJson(user ? 200 : 404, userWithoutPassword || { message: 'User not found' })
      } else if (pathname === '/api/users' && req.method === 'POST') {
        const newUser = {
          id: String(mockUsers.length + 1),
          ...bodyData,
          isActive: true,
          createdAt: new Date().toISOString(),
        }
        mockUsers.push(newUser)
        sendJson(201, newUser)
      } else if (pathname.match(/^\/api\/users\/\d+$/) && req.method === 'DELETE') {
        const id = pathname.split('/').pop()
        const index = mockUsers.findIndex((u) => u.id === id)
        if (index !== -1) {
          mockUsers.splice(index, 1)
          sendJson(200, { message: 'User deleted' })
        } else {
          sendJson(404, { message: 'User not found' })
        }
      } else if (pathname === '/api/payments' && req.method === 'GET') {
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const start = (page - 1) * limit
        const totalAmount = mockPayments.reduce((sum, p) => sum + p.amount, 0)

        sendJson(200, {
          payments: mockPayments.slice(start, start + limit),
          total: mockPayments.length,
          totalAmount,
          page,
          limit,
          totalPages: Math.ceil(mockPayments.length / limit),
        })
      } else if (pathname.match(/^\/api\/payments\/\d+$/) && req.method === 'GET') {
        const id = pathname.split('/').pop()
        const payment = mockPayments.find((p) => p.id === id)
        sendJson(payment ? 200 : 404, payment || { message: 'Payment not found' })
      } else if (pathname === '/api/payments' && req.method === 'POST') {
        const newPayment = {
          id: String(mockPayments.length + 201),
          reference: `RCP-2026-${String(mockPayments.length + 1).padStart(3, '0')}`,
          ...bodyData,
          status: 'paid',
          createdAt: new Date().toISOString(),
        }
        mockPayments.push(newPayment)
        sendJson(201, newPayment)
      } else if (pathname === '/api/consultations' && req.method === 'GET') {
        sendJson(200, {
          consultations: mockConsultations,
          total: mockConsultations.length,
        })
      } else if (pathname === '/api/consultations' && req.method === 'POST') {
        const newConsultation = {
          id: String(mockConsultations.length + 301),
          ...bodyData,
          status: 'EN_ATTENTE',
          createdAt: new Date().toISOString(),
        }
        mockConsultations.push(newConsultation)
        sendJson(201, newConsultation)
      } else if (pathname === '/api/exams' && req.method === 'GET') {
        sendJson(200, {
          exams: mockExams,
          total: mockExams.length,
        })
      } else if (pathname === '/api/exams' && req.method === 'POST') {
        const newExam = {
          id: String(mockExams.length + 401),
          ...bodyData,
          status: 'EN_COURS',
          createdAt: new Date().toISOString(),
        }
        mockExams.push(newExam)
        sendJson(201, newExam)
      } else if (pathname === '/api/treatments' && req.method === 'GET') {
        sendJson(200, {
          treatments: mockTreatments,
          total: mockTreatments.length,
        })
      } else if (pathname === '/api/treatments' && req.method === 'POST') {
        const newTreatment = {
          id: String(mockTreatments.length + 501),
          ...bodyData,
          status: 'ACTIVE',
          createdAt: new Date().toISOString(),
        }
        mockTreatments.push(newTreatment)
        sendJson(201, newTreatment)
      } else if (pathname === '/api/pharmacy' && req.method === 'GET') {
        sendJson(200, {
          medications: mockPharmacy,
          total: mockPharmacy.length,
        })
      } else if (pathname === '/api/pharmacy' && req.method === 'POST') {
        const newMedication = {
          id: String(mockPharmacy.length + 601),
          ...bodyData,
          createdAt: new Date().toISOString(),
        }
        mockPharmacy.push(newMedication)
        sendJson(201, newMedication)
      } else if (pathname === '/api/accounting' && req.method === 'GET') {
        const revenue = mockAccounting.filter((t) => t.type === 'INCOME').reduce((sum, t) => sum + t.amount, 0)
        const expenses = mockAccounting.filter((t) => t.type === 'EXPENSE').reduce((sum, t) => sum + t.amount, 0)
        sendJson(200, {
          transactions: mockAccounting,
          revenue,
          expenses,
          balance: revenue - expenses,
        })
      } else if (pathname === '/api/accounting' && req.method === 'POST') {
        const newTransaction = {
          id: String(mockAccounting.length + 801),
          ...bodyData,
          createdAt: new Date().toISOString(),
        }
        mockAccounting.push(newTransaction)
        sendJson(201, newTransaction)
      } else if (pathname === '/api/reports' && req.method === 'GET') {
        sendJson(200, {
          reports: mockReports,
          total: mockReports.length,
        })
      } else if (pathname === '/api/reports/generate' && req.method === 'POST') {
        const newReport = {
          id: String(mockReports.length + 701),
          title: `${bodyData.type} Report ${new Date().toLocaleDateString()}`,
          type: bodyData.type,
          status: 'COMPLETED',
          dateRange: { start: bodyData.startDate, end: bodyData.endDate },
          createdAt: new Date().toISOString(),
        }
        mockReports.push(newReport)
        sendJson(201, newReport)
      } else if (pathname === '/api/impressions' && req.method === 'GET') {
        sendJson(200, {
          impressions: mockImpressions,
          total: mockImpressions.length,
        })
      } else if (pathname === '/api/impressions' && req.method === 'POST') {
        const newImpression = {
          id: String(mockImpressions.length + 1),
          ...bodyData,
          date: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        }
        mockImpressions.push(newImpression)
        sendJson(201, newImpression)
      } else if (pathname === '/api/dashboard/stats' && req.method === 'GET') {
        sendJson(200, {
          totalPatients: mockPatients.length,
          totalUsers: mockUsers.length,
          totalPayments: mockPayments.length,
          totalRevenue: mockPayments.reduce((sum, p) => sum + p.amount, 0),
        })
      } else if (pathname === '/health' && req.method === 'GET') {
        sendJson(200, { status: 'OK', message: 'AMKA Backend API is running' })
      } else {
        sendJson(404, { message: 'Not found' })

      }
    } catch (err) {
      console.error('Error:', err)
      sendJson(500, { message: 'Internal Server Error' })
    }
  })
})

server.listen(PORT, () => {
  console.log(`🚀 AMKA Mock API running on http://localhost:${PORT}`)
  console.log('✅ Ready for frontend integration')
  console.log('📝 Test login: admin@amka.cd / password')
})
