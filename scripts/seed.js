const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const email = process.argv[2] || 'admin@email.com'
  const password = process.argv[3] || 'admin123'

  const hash = await bcrypt.hash(password, 10)

  const user = await prisma.user.upsert({
    where: { email },
    update: { password: hash },
    create: { email, password: hash, name: 'Admin' },
  })

  console.log('✅ Admin user created:', user.email)
  console.log('   Password:', password)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
