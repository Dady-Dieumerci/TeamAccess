import ManagerDashboard from "@/app/components/dashboard/ManagerDashboard";
import { checkingUserPermission, getCurrentUser } from "@/app/lib/auth"
import { prismaClient } from "@/app/lib/db";
import { transformTeams, transformUser, transformUsers } from "@/app/lib/util";
import { Role , User } from "@/app/types";

import { redirect } from "next/navigation";

const ManagerPage = async () =>{
    const user = await getCurrentUser();
    if(!user || !checkingUserPermission(user, Role.MANAGER)){
        redirect("/unauthorized");
    }
    //fetch manager's own team  members
    const prismaMyTeamMembers = user.teamId ?
  
       await  prismaClient.user.findMany({
            where:{
                teamId: user.teamId,
                role:{not: Role.ADMIN}
            },
            include:{
                team: true,
            },
        
        }):[];
       
        // Fetch All team members(croos-teams - exculde sensitive fields)
         const prismaAllTeamMembers = await prismaClient.user.findMany({
            where:{
            
                role:{not: Role.ADMIN}
            },
            include:{
                team: {
                    select:{
                        id: true,
                        name: true,
                        code: true,
                        description: true,

                    },
                },
            },
                orderBy:{
                    teamId: 'desc',
                },
        })
         const myTeamMembers=transformUsers(prismaMyTeamMembers);
            const  allTeamMembers= transformUsers(prismaAllTeamMembers);

      return( <ManagerDashboard
         myTeamMembers={myTeamMembers as User []} 
          allTeamMembers={allTeamMembers as User []}
           currentUser={user}/>
      );
    };
  

export default ManagerPage;