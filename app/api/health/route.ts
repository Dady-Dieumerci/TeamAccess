import { checkingDbConnection } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET (){
    const isConnected = await checkingDbConnection();

    if(!isConnected){
        return NextResponse.json(
            {
                status:'error',
                message:'Database failed to connect'
            },
            {status:502}
        );
    }
    return NextResponse.json(
         {
            status: 'ok',
            message: 'DataBase Connection is success'
         },
         {status:200 }     
    )


}