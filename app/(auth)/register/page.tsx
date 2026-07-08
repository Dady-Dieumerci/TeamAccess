'use client'
import { apiClient } from "@/app/lib/apiClient";
import Link from "next/link";
import { useActionState } from "react";


export type RegisterState ={
    error?: string;
    success?: boolean;
};

const RegisterPage =()=>{

    const[state, registerAction, isPending] = useActionState(
        async(prevState: RegisterState,
            formData: FormData
        ):Promise<RegisterState> =>{
            const name = formData.get("name") as string;
            const email = formData.get("email") as string;
            const password= formData.get("password") as string;
            const teamCode = formData.get("teamCode") as string;
            try {
                await apiClient.register({
                    name,
                    email,
                    password,
                    teamCode: teamCode || undefined
                });
                window.location.href = "/dashboard";
                return {success: true};
            } catch (error) {
                return{
                     error: error instanceof Error ? error.message : "Registation failed" 
            };
            }
        },
        {error:undefined, success: undefined}
    );
    return(
        <div className=" bg-gray-300 p-8 rounded-lg  w-full max-w-md ">
            <form action={registerAction}>
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-black">Create Account</h2>
                     <p className="mt-2 text-sm text-black ">
                        Or <Link href="/login" className="text-[17px] text-orange-400 hover:text-orange-600">
                         Sign in to existing account
                          
                        </Link>
                     </p>
                </div>
               {state?.error &&(
                    <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded mb-4">
                       {state.error}
                     </div>
                )}
                <div className="space-y-4">
                    <div>
                        <label htmlFor="'name" className="block text-sm font-medium text-black mb-1">Full Name</label>
                        <input 
                        id='name'
                        type="text"
                        name="name"
                        autoComplete="name"
                        required
                        className="w-full px-3 py-2 bg-black border-slate-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-blue-500"
                        placeholder="Enter your full name"
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="'name" className="block text-sm font-medium text-black mb-1">Email</label>
                        <input 
                        id='email'
                        type="email"
                        name="email"
                        autoComplete="email"
                        required
                        className="w-full px-3 py-2 bg-black border-slate-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-blue-500"
                        placeholder="Enter your email"
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="'name" className="block text-sm font-medium text-black mb-1">password</label>
                        <input 
                        id='password'
                        type="password"
                        name="password"
                        autoComplete="new-password"
                        required
                        className="w-full px-3 py-2 bg-black border-slate-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-blue-500"
                        placeholder="create a password"
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="'name" className="block text-sm font-medium text-black mb-1">Team Code (optional)</label>
                        <input 
                        id='teamCode'
                        type="text"
                        name="name"
                        className="w-full px-3 py-2 bg-black border-slate-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-blue-500"
                        placeholder="Enter team code if you have one"
                        ></input>
                        <p className="text-black mt-1">Leave empty if you dont have a team code</p>
                    </div>
                </div>
                <button type="submit" disabled={isPending} className="bg-orange-400 text-black w-full py-4  rounded-lg text-lg mt-2 font-bold hover:bg-orange-300 ">{isPending ? "Creating account.." : "Create account"}</button>
            </form>
        </div>
    )
};
export default RegisterPage;