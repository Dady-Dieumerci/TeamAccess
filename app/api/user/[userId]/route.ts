import { getCurrentUser } from "@/app/lib/auth";
import { prismaClient } from "@/app/lib/db";
import { Prisma, Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "You're not authorized to access user information",
        },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const teamId = searchParams.get("teamId");
    const role = searchParams.get("role");

    const where: Prisma.UserWhereInput = {};

    // Role-based access control
    if (user.role === Role.ADMIN) {
      // Admin can see all users
    } else if (user.role === Role.MANAGER) {
      // Manager can see users in their team except admins
      where.teamId = user.teamId;
      where.role = {
        not: Role.ADMIN,
      };
    } else {
      // Regular user can see users in their team except admins
      where.teamId = user.teamId;
      where.role = {
        not: Role.ADMIN,
      };
    }

    // Additional filters
    if (teamId && user.role === Role.ADMIN) {
      where.teamId = teamId;
    }

    if (role && user.role === Role.ADMIN) {
      where.role = role as Role;
    }

    const users = await prismaClient.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        team: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Get users error:", error);

    return NextResponse.json(
      {
        error: "Internal server error. Something went wrong.",
      },
      { status: 500 }
    );
  }
}