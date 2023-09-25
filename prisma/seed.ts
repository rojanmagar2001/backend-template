import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function script() {
  const password = await bcrypt.hash('Test@123', 10);
  await prisma.user.create({
    data: {
      name: 'Super Admin',
      email: 'superadmin@gmail.com',
      contact: '9823000000',
      dob: new Date(),
      password,
      username: 'superadmin',
      role: {
        create: {
          name: 'superadmin',
          permissions: {
            createMany: {
              data: [{ name: 'user', access: 'readwriteanddelete' }],
            },
          },
        },
      },
    },
  });

  console.log('Data seeded successfully');
}

script().catch((err) => {
  console.log('Error while seeding data', err);
});
