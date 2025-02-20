import { useGetUsersQuery } from "../../../../redux/api/users";
import { Activity, Users, Clock, Bell } from "lucide-react";
import PrimaryCard from "./PrimaryCard";

const RealTimeCard = () => {
  const { data: visitors } = useGetUsersQuery();

  return (
    <div className="w-[30rem] mt-10 bg-gradient-to-br from-[#282828] to-[#1a1a1a] text-white rounded-xl shadow-xl border border-gray-700/30 p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <Activity className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Realtime
            </h2>
            <p className="text-gray-400 text-sm flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Live Updates
            </p>
          </div>
        </div>
        
        <div className="relative">
          <Bell className="w-5 h-5 text-gray-400 hover:text-purple-400 transition-colors cursor-pointer" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full"></div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <Users className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{visitors?.length || 0}</h3>
              <p className="text-gray-400 text-sm">Subscribers</p>
            </div>
          </div>
          <div className="h-12 w-[2px] bg-gray-700"></div>
          <div className="text-right">
            <p className="text-emerald-400 text-sm font-medium">Active Now</p>
            <p className="text-gray-400 text-xs">Last updated 1m ago</p>
          </div>
        </div>

        <div className="border-t border-gray-700/30 my-6"></div>

        <PrimaryCard />
      </div>
    </div>
  );
};

export default RealTimeCard;