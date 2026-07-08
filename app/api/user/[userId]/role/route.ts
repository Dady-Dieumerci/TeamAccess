import { checkingUserPermission, getCurrentUser } from "@/app/lib/auth";
import { prismaClient } from "@/app/lib/db";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await context.params;

    const currentUser = await getCurrentUser();

    if (!currentUser || !checkingUserPermission(currentUser, Role.ADMIN)) {
      return NextResponse.json(
        {
          error: "You're not Authorized to assign a role",
        },
        { status: 401 }
      );
    }

    // Prevent users from changing their own role
    if (userId === currentUser.id) {
      return NextResponse.json(
        {
          error: "You cannot change your own role",
        },
        { status: 401 }
      );
    }

    const { role } = await request.json();

    // Validate the role
    const validateRoles = [Role.USER, Role.MANAGER];

    if (!validateRoles.includes(role)) {
      return NextResponse.json(
        {
          error: "Invalid Role or You cannot have more than 1 admin user",
        },
        { status: 400 }
      );
    }

    const updatedUser = await prismaClient.user.update({
      where: { id: userId },
      data: {
        role,
      },
      include: {
        team: true,
      },
    });

    return NextResponse.json({
      user: updatedUser,
      message: `User role updated to ${role} successfully`,
    });
  } catch (error) {
    console.error("Role assignment error:", error);

    if (
      error instanceof Error &&
      error.message.includes("Record to update not found")
    ) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        error: "Internal server error, something went wrong",
      },
      { status: 500 }
    );
  }
}