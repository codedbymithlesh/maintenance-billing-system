import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { 
  PlusCircle, 
  Search, 
  Filter, 
  X, 
  Calendar, 
  User, 
  IndianRupee,
  CheckCircle2,
  Clock,
  Loader2
} from 'lucide-react';
const API_URL = import.meta.env.VITE_API_URL;

const ManageBills = () => {
  const { user } = useContext(AuthContext);

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();

  const [bills, setBills] = useState([]);
  const [residents, setResidents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  
  // Fix: Button ke liye alag loading state banaya
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    residentId: '',
    amount: '',
    month: currentMonth,
    year: currentYear,
    dueDate: '',
    description: 'Monthly Maintenance'
  });

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  };

  useEffect(() => {
    const loadData = async () => {
      // Fix: Yaha se setIsLoading hata diya taki page load pe button effect na ho
      try {
        await Promise.all([fetchBills(), fetchResidents()]);
      } catch (error) {
        console.error("Error loading data", error);
      }
    };
    loadData();
  }, []);

  const fetchBills = async () => {
    const { data } = await axios.get(`${API_URL}/api/admin/bills`, config);
    setBills(data);
  };

  const fetchResidents = async () => {
    const { data } = await axios.get(`${API_URL}/api/admin/residents`, config);
    setResidents(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Sirf form submit pe loading true hoga
    try {
      await axios.post(`${API_URL}/api/admin/bills`, formData, config);
      setShowModal(false);
      fetchBills();
      setFormData(prev => ({...prev, residentId: '', amount: '', dueDate: ''}));
    } catch (error) {
      console.error(error);
      alert("Failed to create bill");
    } finally {
      setIsSubmitting(false); // Request khatam hone pe loading band
    }
  };

  return (
    // MAIN CONTAINER: Dark Slate Background
    <div className="min-h-screen bg-slate-950 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Manage Bills</h2>
            <p className="text-slate-400 mt-1">Create and track maintenance</p>
          </div>

            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20 font-medium active:scale-95 border border-blue-500/50"
            >
              <PlusCircle size={20} /> 
              <span>Create Bill</span>
            </button>
        </div>

        {/* Table Container: Dark Slate with Border */}
        <div className="bg-slate-900 rounded-2xl shadow-sm border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-950/50 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Resident</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Flat No</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Period</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800">
                {bills.length > 0 ? (
                  bills.map((bill) => (
                    <tr key={bill._id} className="hover:bg-slate-800/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-slate-800 flex items-center justify-center text-blue-400 font-bold text-sm border border-slate-700">
                            {bill.residentId?.name?.charAt(0) || 'U'}
                          </div>
                          <span className="font-medium text-slate-200 group-hover:text-blue-400 transition-colors">
                            {bill.residentId?.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700">
                          {bill.residentId?.flatNumber}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                          <div className="flex items-center text-slate-200 font-bold">
                             <span className="text-slate-500 mr-1">₹</span>
                             {bill.amount.toLocaleString()}
                          </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                           <Calendar size={14} className="text-slate-600" />
                           {bill.month} {bill.year}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-500">
                        {bill.dueDate ? new Date(bill.dueDate).toLocaleDateString() : '-'}
                      </td>

                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                          bill.status === "Paid"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        }`}>
                          {bill.status === "Paid" ? <CheckCircle2 size={12}/> : <Clock size={12}/>}
                          {bill.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center">
                        <div className="bg-slate-800 p-4 rounded-full mb-3 border border-slate-700">
                            <Filter className="text-slate-600" size={24}/>
                        </div>
                        <p>No bills found. Create one to get started.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Dark Theme */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all">
            <div className="bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all scale-100 border border-slate-800">
              
              <div className="flex justify-between items-center p-6 border-b border-slate-800">
                <h3 className="text-xl font-bold text-white">Generate New Bill</h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                    <User size={16} className="text-blue-500"/> Select Resident
                  </label>
                  <select
                    required
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={formData.residentId}
                    onChange={(e) => setFormData({ ...formData, residentId: e.target.value })}
                  >
                    <option value="" disabled className="text-slate-500">Choose a resident...</option>
                    {residents.map((r) => (
                      <option key={r._id} value={r._id} className="bg-slate-900">
                        {r.name} — Flat {r.flatNumber}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                    <IndianRupee size={16} className="text-blue-500"/> Amount
                  </label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    required
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-300">Month</label>
                    <select
                      className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.month}
                      onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                    >
                      {[
                        'January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'
                      ].map((m) => (
                        <option key={m} value={m} className="bg-slate-900">{m}</option>
                      ))}
                    </select>
                   </div>
                   <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-300">Year</label>
                    <input
                      type="number"
                      className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    />
                   </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                    <Clock size={16} className="text-blue-500"/> Due Date
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all [color-scheme:dark]"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    disabled={isSubmitting} // Use new state
                    type="submit"
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium shadow-lg shadow-blue-900/20 transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <span>Generate</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBills;