import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  IndianRupee, 
  User,
  Loader2,
  Receipt,
  History,
  AlertCircle,
  Wallet
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const ResidentDashboard = () => {
  const [bills, setBills] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Initial load state
  const [paymentLoading, setPaymentLoading] = useState(null);
  const [activeTab, setActiveTab] = useState('pending');
  
  const { user } = useContext(AuthContext);
  const config = { headers: { Authorization: `Bearer ${user.token}` } };

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${API_URL}/api/resident/bills`, config);
      setBills(data);
    } catch (err) {
      console.error("Failed to fetch bills:", err);
    } finally {
      setIsLoading(false); // Data load hone ke baad loading false
    }
  };

  const handlePay = async (billId) => {
    if (!window.confirm('Confirm payment transaction?')) return;
    
    setPaymentLoading(billId);
    try {
      await axios.post(`${API_URL}/api/resident/pay`, { billId }, config);
      alert('Payment Successful!'); 
      fetchBills();
    } catch (err) {
      alert(err.response?.data?.message || 'Payment failed');
    } finally {
      setPaymentLoading(null);
    }
  };

  const pendingBills = bills.filter(b => b.status === 'Unpaid');
  const paidBills = bills.filter(b => b.status === 'Paid');
  const totalDue = pendingBills.reduce((acc, curr) => acc + curr.amount, 0);
  const totalPaid = paidBills.reduce((acc, curr) => acc + curr.amount, 0);

  const displayBills = activeTab === 'pending' ? pendingBills : paidBills;

 
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-slate-900 rounded-2xl border border-slate-800/50 p-6 space-y-3">
              <div className="h-4 w-24 bg-slate-800 rounded"></div>
              <div className="h-8 w-32 bg-slate-800 rounded"></div>
              <div className="h-3 w-20 bg-slate-800 rounded"></div>
            </div>
          ))}
        </div>

        {/* Tabs Skeleton */}
        <div className="flex gap-6 border-b border-slate-800 pb-3">
          <div className="h-4 w-24 bg-slate-900 rounded"></div>
          <div className="h-4 w-24 bg-slate-900 rounded"></div>
        </div>

        {/* Bill Cards Skeleton */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex justify-between items-center">
              <div className="flex gap-4">
                <div className="h-12 w-12 bg-slate-800 rounded-xl"></div>
                <div className="space-y-2">
                  <div className="h-5 w-32 bg-slate-800 rounded"></div>
                  <div className="h-4 w-48 bg-slate-800 rounded"></div>
                </div>
              </div>
              <div className="h-10 w-24 bg-slate-800 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-800 flex flex-col justify-between hover:border-blue-500/30 transition-all">
            <div>
              <h2 className="text-2xl font-bold text-white">Hello, {user?.name?.split(' ')[0]} 👋</h2>
              <p className="text-slate-400 text-sm mt-1">Flat {user?.flatNumber} Resident</p>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 w-fit px-3 py-1.5 rounded-full">
               <User size={14} /> Account Verified
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-800 relative overflow-hidden group hover:border-rose-500/30 transition-all">
            <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <AlertCircle size={80} className="text-rose-500" />
            </div>
            <p className="text-rose-400 font-medium text-sm flex items-center gap-2">
              <Clock size={16} /> Outstanding Dues
            </p>
            <h3 className="text-3xl font-bold text-white mt-2">
              ₹{totalDue.toLocaleString()}
            </h3>
            <p className="text-xs text-slate-500 mt-2">
              {pendingBills.length} bills pending
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-800 relative overflow-hidden group hover:border-emerald-500/30 transition-all">
            <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <Wallet size={80} className="text-emerald-500" />
            </div>
            <p className="text-emerald-400 font-medium text-sm flex items-center gap-2">
              <CheckCircle2 size={16} /> Total Paid
            </p>
            <h3 className="text-3xl font-bold text-white mt-2">
              ₹{totalPaid.toLocaleString()}
            </h3>
            <p className="text-xs text-slate-500 mt-2">
              Lifetime contribution
            </p>
          </div>
        </div>

        {/* List Section */}
        <div>
          <div className="flex items-center gap-4 mb-6 border-b border-slate-800">
            <button
              onClick={() => setActiveTab('pending')}
              className={`pb-3 px-1 text-sm font-medium transition-all relative ${
                activeTab === 'pending' 
                  ? 'text-blue-400 border-b-2 border-blue-500' 
                  : 'text-slate-500 hover:text-slate-200'
              }`}
            >
              Pending Bills
              {pendingBills.length > 0 && (
                <span className="ml-2 bg-red-900/30 text-red-400 border border-red-900/50 text-[10px] px-2 py-0.5 rounded-full">
                  {pendingBills.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`pb-3 px-1 text-sm font-medium transition-all relative ${
                activeTab === 'history' 
                  ? 'text-blue-400 border-b-2 border-blue-500' 
                  : 'text-slate-500 hover:text-slate-200'
              }`}
            >
              Payment History
            </button>
          </div>

          <div className="space-y-4 min-h-72">
            {displayBills.length > 0 ? (
              displayBills.map(bill => (
                <div 
                  key={bill._id} 
                  className="bg-slate-900 p-5 rounded-xl shadow-sm border border-slate-800 hover:border-blue-500/30 transition-all duration-200 group"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl shrink-0 border ${
                        bill.status === 'Paid' 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                            : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      }`}>
                        {bill.status === 'Paid' ? <Receipt size={24} /> : <AlertCircle size={24} />}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-200">
                          {bill.month} {bill.year}
                        </h4>
                        <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                          <span className="flex items-center gap-1 text-slate-400">
                            <IndianRupee size={14} /> {bill.amount.toLocaleString()}
                          </span>
                          <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                          <span className="flex items-center gap-1">
                            <Calendar size={14} /> Due: {new Date(bill.dueDate).toLocaleDateString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="w-full sm:w-auto">
                      {bill.status === 'Unpaid' ? (
                        <button 
                          disabled={paymentLoading === bill._id}
                          onClick={() => handlePay(bill._id)}
                          className="w-full sm:w-auto bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
                        >
                          {paymentLoading === bill._id ? (
                            <Loader2 size={18} className="animate-spin" />
                          ) : (
                            <CreditCard size={18} />
                          )}
                          Pay Now
                        </button>
                      ) : (
                        <span className="flex items-center gap-1.5 text-emerald-400 font-bold px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-sm">
                          <CheckCircle2 size={14} /> Paid
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16 bg-slate-900 rounded-2xl border border-dashed border-slate-800 text-center">
                <div className={`h-16 w-16 rounded-full flex items-center justify-center mb-4 border ${
                    activeTab === 'pending' 
                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                        : 'bg-slate-800 text-slate-500 border-slate-700'
                }`}>
                   {activeTab === 'pending' ? <CheckCircle2 size={32} /> : <History size={32} />}
                </div>
                <h3 className="text-lg font-medium text-white">
                  {activeTab === 'pending' ? 'All Caught Up!' : 'No History Found'}
                </h3>
                <p className="text-slate-500 mt-1 max-w-xs mx-auto">
                  {activeTab === 'pending' 
                    ? "You have no pending maintenance bills. Great job!" 
                    : "You haven't made any payments yet."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentDashboard;