import { PrismaClient } from "@prisma/client";
import {Role} from '@/app/types'
import { hashpassword } from "@/app/lib/auth";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seeding...");

  // Create Teams
  const teams = await Promise.all([
    prisma.team.create({
      data: {
        name: "Engineering",
        description: "Software development team",
        code: "ENG-2026",
      },
    }),

    prisma.team.create({
      data: {
        name: "Marketing",
        description: "Marketing and Sales team",
        code: "MKT-2026",
      },
    }),

    prisma.team.create({
      data: {
        name: "Operations",
        description: "Business operations team",
        code: "OPS-2026",
      },
    }),
  ]);

  // Sample Users
  const sampleUsers = [
    {
      name: "Tracy Developer",
      email: "tracy@gmail.com",
      team: teams[0],
      role: Role.MANAGER,
    },

    {
      name: "Jane Designer",
      email: "jane@gmail.com",
      team: teams[0],
      role: Role.USER,
    },

    {
      name: "Bruce Marketer",
      email: "bruce@gmail.com",
      team: teams[1],
      role: Role.MANAGER,
    },

    {
      name: "Organ Sales",
      email: "organ@gmail.com",
      team: teams[1],
      role: Role.USER,
    },
  ];

  for (const userData of sampleUsers) {
    await prisma.user.create({
      data: {
        email: userData.email,
        name: userData.name,
        password: await hashpassword("123456"),
        role: userData.role,
        teamId: userData.team.id,
      },
    });
  }

  console.log("Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });