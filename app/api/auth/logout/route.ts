import { NextResponse } from "next/server";

export async function POST(){
    const response = NextResponse.json({
        message:'Logging out was Succeccfully'
    }, {status:200});
    response.cookies.set('token',"",{
        httpOnly: true,
       secure:process.env.NODE_ENV === 'production',
       sameSite:'lax',
    })
    return response;
}