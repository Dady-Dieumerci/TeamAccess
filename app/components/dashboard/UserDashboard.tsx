import { User } from "@/app/types";

interface UserDashboardProps{
    teamMembers: User[] ;
    currentUser: User;

}
export default function UserDashboard({
    teamMembers, currentUser
}: UserDashboardProps){
    return(
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold  text-white ">User Dashboard</h1>
                <p className="text-slate-300 mb-4">Welcome, {currentUser.name}</p>
                <div className="grid md:grid-cols-2 gap-6">
                    {/* My Team ----------------*/}
                    <div className="bg-slate-800 border border-slate-700 rounded-lg">
                        <div className="p-4 border b border-slate-700">
                            <h3 className="font-semibold text-white">
                                My Team Members ({teamMembers.length})
                            </h3>
                        </div>
                        <div className="p-4">
                            {teamMembers.map((members)=>(
                                <div key={members.id} className="border-b border-slate py-2 last:border-b-0">
                                    <p className="font-medium text-white">{members.name}</p>
                                    <p className="text-sm text-slate-400"> {members.role} </p>
                                </div>
                            ))} 
                        </div>
                    </div>
                    {/* My team members--------------- */}
                     
                </div>
            </div>
        </div>
    )
};