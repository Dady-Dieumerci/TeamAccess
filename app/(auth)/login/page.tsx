'use client'
import { apiClient } from "@/app/lib/apiClient";
import Link from "next/link";
import { useActionState } from "react";


export type LoginState ={
    error?: string;
    success?: boolean;
};

const LoginPage =()=>{

    const[state, loginAction, isPending] = useActionState(
        async(prevState: LoginState,
            formData: FormData
        ):Promise<LoginState> =>{
          
            const email = formData.get("email") as string;
            const password= formData.get("password") as string;
            
            try {
                await apiClient.login(email,password);
                window.location.href = "/dashboard";
                return {success: true};
            } catch (error) {
                return{
                     error: error instanceof Error ? error.message : "Login failed" 
            };
            }
        },
        {error:undefined, success: undefined}
    );
    return(
        <div className=" bg-gray-300 p-8 rounded-lg  w-full max-w-md ">
            <form action={loginAction}>
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-black">Sign In To Your Account</h2>
                     <p className="mt-2 text-sm text-black ">
                        Or <Link href="/register" className="text-[17px] text-orange-400 hover:text-orange-600">
                        Create a new account
                          
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
                        placeholder="Inter Your Password"
                        ></input>
                    </div>
                    
                </div>
                <button type="submit" disabled={isPending} className="bg-orange-400 text-black w-full py-4  rounded-lg text-lg mt-6 font-bold hover:bg-orange-300 ">{isPending ? "Signing in..." : "Sign in"}</button>
            </form>
        </div>
    )
};
export default LoginPage;
/* const API_BASE_URL= process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/";

class ApiClient {
 private baseUrl:string;
 constructor(){
    this.baseUrl= API_BASE_URL;
 }

 async request (endpoint:string, options:RequestInit = {}){
    const url = `${this.baseUrl}${endpoint}`;
    const config : RequestInit ={
        headers:{
            "content-Type": "application/json",
            ...options.headers,
        },
        credentials: 'include', //important for cookies
        ...options
         
    };
    const response = await fetch(url, config);

    //handle 401 (unaithroized) gracefully

    if(response.status === 401){
        return null
    }
    if(!response.ok){
        const error = await response.json().catch(()=>({error: 'Network Error'}));
        throw new Error (error.error || "Request Failed");
    }
 }
  
 //Auth method
 async register(userData: unknown){
   return this.request("api/auth/register",{
    method: 'POST',
    body:JSON.stringify(userData),
   });
 }
 async login(email:string, password:string){
   return this.request("api/auth/login",{
    method: 'POST',
    body:JSON.stringify({email,password}),
   });
 }
 
 async logout(){
   return this.request("api/auth/logout",{
    method: 'POST',
   });
 }
 async getCurrentUser(){
   return this.request("api/auth/me");
 }
 

 //user method
  async getUsers(){
   return this.request("api/users");
 }
 
 //admin method
  async updateUserRole(userId:string , role:string){
   return this.request(`api/auth/me ${userId}/role`,{
    method: 'PATCH',
    body: JSON.stringify({role}),
   });
 }
  async assignUserToTeam(userId:string , teamId:string){
   return this.request(`api/auth/me ${userId}/teamId`,{
    method: 'PATCH',
    body: JSON.stringify({teamId}),
   });
 }
 
}
export const apiClient = new ApiClient(); */