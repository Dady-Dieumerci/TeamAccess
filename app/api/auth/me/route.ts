import { getCurrentUser } from "@/app/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
    try {
        const user = await getCurrentUser();
        if(!user){
            return NextResponse.json({
              error: "You're not Authenticated"
            }, {status:401});

        }
        return NextResponse.json(user)
    } catch (error) {
        console.error("error:",error)
     return NextResponse.json({
        error:"Internal Server Error, Something went Wrong!"
     },{status: 500}) 
    }
}