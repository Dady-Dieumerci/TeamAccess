import AdminDashboard from "@/app/components/dashboard/AdminDashboard";
import { checkingUserPermission, getCurrentUser } from "@/app/lib/auth"
import { prismaClient } from "@/app/lib/db";
import { transformTeams, transformUsers } from "@/app/lib/util";
import { Role } from "@/app/types";
import { redirect } from "next/navigation";

const AdminPage = async () =>{
    const user = await getCurrentUser();
    if(!user || !checkingUserPermission(user, Role.ADMIN)){
        redirect("/unauthorized");
    }
    //fetch the data for admin dashboard
    const [prismaUsers, prismaTeams]= await Promise.all([
        prismaClient.user.findMany({
            include:{
                team: true,
            },
            orderBy:{ createdAt: "desc"},
        }),
        prismaClient.team.findMany({
            include: {
                members:{
                    select:{
                        id:true,
                        name:true,
                        role:true,
                        email:true,
                    },
                },
            },
        }),
    ]);
    const users = transformUsers(prismaUsers);
    const teams = transformTeams(prismaTeams);
      return( <AdminDashboard
        users={users} 
        teams={teams} 
        currentUser={user}/>
      );
    };
  

export default AdminPage;