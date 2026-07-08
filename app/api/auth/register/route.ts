import { generateToken, hashpassword } from "@/app/lib/auth";
import { prismaClient } from "@/app/lib/db";
import { Role } from "@/app/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, teamCode } = await request.json();

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json( 
        {
          error: "Name, email and password are required",
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prismaClient.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error: "User with this email already exists",
        },
        { status: 409 }
      );
    }

    // Team ID will be set if a valid team code is provided
    let teamId: string | undefined;

    if (teamCode) {
      const team = await prismaClient.team.findUnique({
        where: { code: teamCode },
      });

      if (!team) {
        return NextResponse.json(
          {
            error: "Please enter a valid team code",
          },
          { status: 400 }
        );
      }

      teamId = team.id;
    }

    // Hash password
    const hashedPassword = await hashpassword(password);

    // First user becomes ADMIN
    const userCount = await prismaClient.user.count();

    const role = userCount === 0 ? Role.ADMIN : Role.USER;

    // Create user
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        teamId,
      },
      include: {
        team: true,
      },
    });

    // Generate JWT token
    const token = generateToken(user.id);

    // Create response
    const response = NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        teamId: user.teamId,
        team: user.team,
      },
      token,
    });

    // Set cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Registration failed:", error);

    return NextResponse.json(
      {
        error: "Internal Server is Error",
      },
      { status: 500 }
    );
  }
}