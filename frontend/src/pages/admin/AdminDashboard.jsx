import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { 
  Users, 
  AlertCircle, 
  Activity, 
  ArrowUpRight,
  Wallet,
  TrendingUp,
  CheckCircle2,
  IndianRupee,
  Clock,
  Loader2 // Spinner ke liye naya icon
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalReceived: 0,
    pendingAmount: 0,
    totalResidents: 0,
    recentPayments: [],
  });
  
  // 1. Loading state initialize karein
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true); // Fetch shuru hone par loading true
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(
          `${API_URL}/api/admin/stats`,
          config
        );
        setStats(data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        // 2. Fetch khatam hone par loading false (chahe success ho ya error)
        setLoading(false);
      }
    };

    if (user?.token) fetchStats();
  }, [user]);

  // 3. Agar loading true hai toh spinner dikhayein
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row justify-between gap-4 animate-pulse">
          <div className="space-y-2">
            <div className="h-8 w-64 bg-slate-900 rounded-lg"></div>
            <div className="h-4 w-40 bg-slate-900 rounded-lg"></div>
          </div>
          <div className="h-10 w-32 bg-slate-900 rounded-xl"></div>
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-slate-900 p-4 rounded-2xl border border-slate-800/50 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-4 bg-slate-800 rounded-lg h-10 w-10"></div>
                <div className="h-4 w-24 bg-slate-800 rounded"></div>
              </div>
              
              <div className="h-10 w-32 bg-slate-800 rounded-md"></div>
              <div className="h-6 w-28 bg-slate-800/50 rounded-full"></div>
            </div>
          ))}
        </div>

        {/* Table Skeleton */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 h-96 overflow-hidden animate-pulse">
          <div className="p-6 border-b border-slate-800">
            <div className="h-6 w-48 bg-slate-800 rounded"></div>
          </div>
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex justify-between items-center border-b border-slate-800/50 pb-4">
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-800"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-slate-800 rounded"></div>
                    <div className="h-3 w-20 bg-slate-800 rounded"></div>
                  </div>
                </div>
                <div className="h-4 w-20 bg-slate-800 rounded"></div>
                <div className="h-4 w-24 bg-slate-800 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
       {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Dashboard Overview
            </h2>
            <p className="text-slate-400 mt-1">Welcome back, {user?.name} 👋</p>
          </div>
          
          <div className="flex items-center gap-3 bg-slate-900 px-4 py-2 rounded-xl shadow-sm border border-slate-800">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 animate-pulse"></span>
            </span>
            <span className="text-sm font-medium text-slate-300">System Live</span>
          </div>
        </div>

      {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Total Received */}
          <div className="bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-800 relative overflow-hidden group hover:border-emerald-500/30 transition-all">
            <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <Wallet size={100} className="text-emerald-500" />
            </div>
            <div className="relative z-10">
                <div className="flex items-center gap-2 text-emerald-400 font-medium mb-2">
                    <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                        <TrendingUp size={18} />
                    </div>
                    <span>Total Revenue</span>
                </div>
                <h3 className="text-3xl font-bold text-white flex items-center gap-1">
                  <IndianRupee size={24} className="mt-1 text-slate-500"/>
                  {stats.totalReceived.toLocaleString()}
                </h3>
                <p className="text-xs text-emerald-400 mt-2 font-medium bg-emerald-500/10 w-fit px-2 py-1 rounded-full flex items-center gap-1 border border-emerald-500/20">
                    <ArrowUpRight size={12} /> Verified Payments
                </p>
            </div>
          </div>

          {/* Card 2: Pending Dues */}
          <div className="bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-800 relative overflow-hidden group hover:border-rose-500/30 transition-all">
            <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <AlertCircle size={100} className="text-rose-500" />
            </div>
            <div className="relative z-10">
                <div className="flex items-center gap-2 text-rose-400 font-medium mb-2">
                    <div className="p-2 bg-rose-500/10 rounded-lg border border-rose-500/20">
                        <Activity size={18} />
                    </div>
                    <span>Pending Dues</span>
                </div>
                <h3 className="text-3xl font-bold text-white flex items-center gap-1">
                  <IndianRupee size={24} className="mt-1 text-slate-500"/>
                  {stats.pendingAmount.toLocaleString()}
                </h3>
                <p className="text-xs text-rose-400 mt-2 font-medium bg-rose-500/10 w-fit px-2 py-1 rounded-full flex items-center gap-1 border border-rose-500/20">
                    <Clock size={12} /> Action Required
                </p>
            </div>
          </div>

          {/* Card 3: Total Residents */}
          <div className="bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-800 relative overflow-hidden group hover:border-blue-500/30 transition-all">
             <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <Users size={100} className="text-blue-500" />
            </div>
            <div className="relative z-10">
                <div className="flex items-center gap-2 text-blue-400 font-medium mb-2">
                    <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <Users size={18} />
                    </div>
                    <span>Total Residents</span>
                </div>
                <h3 className="text-3xl font-bold text-white">
                  {stats.totalResidents}
                </h3>
                <p className="text-xs text-blue-400 mt-2 font-medium bg-blue-500/10 w-fit px-2 py-1 rounded-full flex items-center gap-1 border border-blue-500/20">
                    <CheckCircle2 size={12} /> Active Members
                </p>
            </div>
          </div>
        </div>

        {/* Recent Payments Table */}
        <div className="bg-slate-900 rounded-2xl shadow-sm border border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center">
            <h4 className="font-bold text-xl text-white flex items-center gap-2">
              Recent Transactions
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-950/50">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Resident</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800">
                {stats.recentPayments.length > 0 ? (
                  stats.recentPayments.map((pay) => (
                    <tr 
                      key={pay._id} 
                      className="hover:bg-slate-800/50 transition-colors duration-150 group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-slate-800 flex items-center justify-center text-blue-400 font-bold text-sm border border-slate-700">
                            {pay.residentId?.name?.charAt(0) || "U"}
                          </div>
                          <div>
                            <span className="font-medium text-slate-200 block">
                              {pay.residentId?.name || "Unknown"}
                            </span>
                            <span className="text-xs text-slate-500">
                              Flat: {pay.residentId?.flatNumber || "N/A"}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center font-bold text-slate-200">
                            <IndianRupee size={14} className="mr-1 text-slate-600"/>
                            {pay.amount.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {new Date(pay.paymentDate).toLocaleDateString("en-IN", {
                          day: 'numeric', month: 'short', year: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 size={12} /> Paid
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-600">
                        <div className="bg-slate-800 p-4 rounded-full mb-3 border border-slate-700">
                            <Activity size={32} className="opacity-50" />
                        </div>
                        <p>No recent transactions recorded</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 