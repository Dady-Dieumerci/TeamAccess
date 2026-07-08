import { User } from "@/app/types";

interface ManagerDashboardProps{
    myTeamMembers: User[];
    allTeamMembers: User[];
    currentUser: User;

}
export default function ManagerDashboard({
    myTeamMembers, allTeamMembers, currentUser
}: ManagerDashboardProps){
    return(
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold  text-white ">Manager Dashboard</h1>
                <p className="text-slate-300 mb-4">Team Management view</p>
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Team Members ----------------*/}
                    <div className="bg-slate-800 border border-slate-700 rounded-lg">
                        <div className="p-4 border b border-slate-700">
                            <h3 className="font-semibold text-white">
                                Team Members ({allTeamMembers.length})
                            </h3>
                        </div>
                        <div className="p-4">
                            {allTeamMembers.map((members)=>(
                                <div key={members.id} className="border-b border-slate py-2 last:border-b-0">
                                    <p className="font-medium text-white">{members.name}</p>
                                    <p className="text-sm text-slate-400">{members.email}  {members.role} {members.team?.code}</p>
                                </div>
                            ))} 
                        </div>
                    </div>
                    {/* My team members--------------- */}
                      <div className="bg-slate-800 border border-slate-700 rounded-lg">
                        <div className="p-4 border b border-slate-700">
                            <h3 className="font-semibold text-white">
                                My Team({myTeamMembers.length})
                            </h3>
                        </div>
                        <div className="p-4">
                            {myTeamMembers.map((members)=>(
                                <div key={members.id} className="border-b border-slate-700 py-2 last:border-b-0">
                                  <p className="font-medium text-white">{members.name}</p>
                                  <p className="text-sm text-slate-400">
                                    {members.email} {members.role} {members.team?.code} 
                                  </p>
                                </div>
                            ))}
                        </div>
                        </div>
                </div>
            </div>
        </div>
    )
};