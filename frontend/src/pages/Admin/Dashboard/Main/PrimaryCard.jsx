import { useGetUsersQuery } from "../../../../redux/api/users";
import { Users, PartyPopper, TrendingUp } from "lucide-react";

const PrimaryCard = () => {
  const { data: visitors } = useGetUsersQuery();

  return (
    <div className="w-[100%] h-[10%] bg-gradient-to-br from-[#2c2c2c] to-[#1f1f1f] text-white rounded-xl p-6 shadow-lg border border-gray-700/30 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <PartyPopper className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Congratulations!
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-400" />
              <span className="text-gray-300">New Users</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">
                {visitors?.length || 0}
              </span>
              <div className="flex items-center text-emerald-400 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span className="ml-1">Active</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-2 -right-2 w-3 h-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimaryCard;