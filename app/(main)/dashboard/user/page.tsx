 import UserDashboard from "@/app/components/dashboard/UserDashboard";
import { getCurrentUser } from "@/app/lib/auth"
 import { prismaClient } from "@/app/lib/db";
 import { User } from "@/app/types";
 import { redirect } from "next/navigation";
 
 const UserPage = async () =>{
     const user = await getCurrentUser();
     if(!user){
         redirect("/login");
     }
     //fetch user specifid data
     const teamMembers = user.teamId ?
   
      await  prismaClient.user.findMany({
             where:{
                 teamId: user.teamId,
             },
             select:{
                 id: true,
                 name:true,
                 email:true,
                 role: true,
             },
         
         }):[];
 
       return( <UserDashboard teamMembers={teamMembers as User[]}currentUser={user}/>
       );
     };
   
 
 export default UserPage;