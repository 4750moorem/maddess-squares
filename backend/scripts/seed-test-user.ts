import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../src/generated/prisma/client'

const TEST_USER = {
  firebaseUserId: 'MwCFg682UzSRCT0FXdUx4x76B2D3',
  email: 'test12@gmail.com',
  displayName: 'Test User',
}

async function seedTestUser() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  const adapter = new PrismaPg(pool)
  const prisma = new PrismaClient({ adapter })

  try {
    await prisma.$connect()

    const existingUser = await prisma.user.findUnique({
      where: { firebaseUserId: TEST_USER.firebaseUserId },
    })

    if (existingUser) {
      console.log('Test user already exists:', existingUser.email)
      return
    }

    const user = await prisma.user.create({
      data: TEST_USER,
    })

    console.log('Test user created successfully:', user.email)
  } catch (error) {
    console.error('Error seeding test user:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
    await pool.end()
  }
}

seedTestUser()
