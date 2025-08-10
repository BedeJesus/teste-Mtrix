import { PrismaClient } from '../generated/prisma';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  const eventsPath = path.join(__dirname, '../src/assets/events.json');
  const eventsData = JSON.parse(fs.readFileSync(eventsPath, 'utf-8'));

  await prisma.event.deleteMany();

  console.log('executando a seed');
  for (const event of eventsData) {
    await prisma.event.create({
      data: {
        name: event.name,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate),
      },
    });
  }
  console.log('Execução da seed finalizada.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
