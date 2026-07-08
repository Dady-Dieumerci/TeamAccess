import { generateToken, verifypassword } from "@/app/lib/auth";
import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const {  email, password } = await request.json();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json( 
        {
          error: "Email and password are required",
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const userFromDb = await prismaClient.user.findUnique({
      where: { email },
      include:{team: true}
    });

   if(!userFromDb){
    return NextResponse.json({
        error:'Invalid credentials',
    },{status:401});
   }

    // Hash password
    const isVerifyPassword = await verifypassword(password, userFromDb.password);
    
      if(!isVerifyPassword){
    return NextResponse.json({
        error:'Invalid  password credentials',
    },{status:401});
   }
 
    // Generate JWT token
    const token = generateToken(userFromDb.id);

    // Create response
    const response = NextResponse.json({
      user: {
        id: userFromDb.id,
        name: userFromDb.name,
        email: userFromDb.email,
        role: userFromDb.role,
        teamId: userFromDb.teamId,
        team: userFromDb.team,
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
    console.error(" Log in failed: error ");

    return NextResponse.json(
      {
        error: "Internal Server is Error",
      },
      { status: 500 }
    );
  }
}