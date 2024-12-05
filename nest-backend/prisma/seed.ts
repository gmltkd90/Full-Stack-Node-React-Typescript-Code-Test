import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password', 10);
  const user = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      password: hashedPassword,
      name: 'Justin Yoo',
    },
  });

  console.log('User created:', user);

  await prisma.invoice.createMany({
    data: [
      {
        vendor_name: 'Vendor A',
        amount: 100,
        due_date: new Date('2024-12-31'),
        description: 'Invoice for services',
        user_id: user.id,
        paid: false,
      },
      {
        vendor_name: 'Vendor B',
        amount: 200,
        due_date: new Date('2024-11-30'),
        description: 'Invoice for products',
        user_id: user.id,
        paid: true,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
