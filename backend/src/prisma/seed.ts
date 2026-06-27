import { PrismaClient, Role } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const adminPassword = await bcrypt.hash('password', 10)

  const users = [
    { email: 'admin@amka.cd', firstName: 'Admin', lastName: 'AMKA', role: Role.ADMIN },
    { email: 'doctor@amka.cd', firstName: 'Dr. Jean', lastName: 'Mukeba', role: Role.MEDECIN_DIRECTEUR },
    { email: 'reception@amka.cd', firstName: 'Marie', lastName: 'Kabila', role: Role.RECEPTIONIST },
    { email: 'pharmacy@amka.cd', firstName: 'Paul', lastName: 'Lumumba', role: Role.PHARMACIEN },
    { email: 'accounting@amka.cd', firstName: 'Grace', lastName: 'Mobutu', role: Role.COMPTABLE },
    { email: 'perception@amka.cd', firstName: 'Pierre', lastName: 'Kasavubu', role: Role.PERCEPTEUR },
  ]

  for (const userData of users) {
    await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        ...userData,
        password: adminPassword,
        isActive: true,
      },
    })
    console.log(`✅ User created: ${userData.email}`)
  }

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
