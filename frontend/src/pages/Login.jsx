import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  AlertCircle, 
  Mail, 
  Lock,  
  ShieldCheck,
  Zap,
  Loader2,
  Building2
} from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(user.role === 'admin' ? '/admin' : '/resident');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const userData = await login(email, password);
      navigate(userData.role === 'admin' ? '/admin' : '/resident');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // MAIN CONTAINER: Dark Slate Background
    <div className="min-h-screen flex bg-slate-950 text-slate-200 font-sans">
      
      {/* LEFT SIDE: Solid Dark Panel with Right Border */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 border-r border-slate-800 relative flex-col justify-between p-16">
        
        {/* Brand Header */}
        <div className="relative z-10 animate-fade-in-down">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-600 rounded-lg text-white">
              <Building2 size={28} />
            </div>
            <span className="text-xl text-slate-100 font-bold tracking-widest uppercase">SnehSagar Society</span>
          </div>
          
          <h1 className="text-5xl text-white font-extrabold leading-tight mb-6">
            Simplifying <br/>
            Community Living
          </h1>
          <p className="text-slate-400 text-lg max-w-md leading-relaxed">
            Experience seamless society management. Pay bills, raise complaints, and stay connected with your neighbors.
          </p>
        </div>

        {/* Feature Cards: Darker with Borders */}
        <div className="relative z-10 grid gap-5 animate-fade-in-up delay-200">
          <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-blue-600/50 transition-colors cursor-default">
            <div className="p-3 bg-slate-900 rounded-lg text-blue-500 border border-slate-800">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-200">Secure Access</h3>
              <p className="text-sm text-slate-500">Role-based secure login environment</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-blue-600/50 transition-colors cursor-default">
            <div className="p-3 bg-slate-900 rounded-lg text-blue-500 border border-slate-800">
              <Zap size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-200">Fast & Reliable</h3>
              <p className="text-sm text-slate-500">Optimized performance for all devices</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-slate-600 font-medium">
           &copy; {new Date().getFullYear()} SnehSagar Management System
        </div>
      </div>

      {/* RIGHT SIDE: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-slate-950">
        
        {/* Card: Dark Slate, Solid Border */}
        <div className="max-w-md w-full animate-fade-in p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-blue-600 text-white">
              <Building2 size={28} />
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome back</h2>
            <p className="text-slate-500 text-sm">Enter your credentials to access your account.</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-900/20 border border-red-900/50 text-red-400 px-4 py-3 rounded-xl text-sm flex items-start gap-2 animate-pulse">
              <AlertCircle size={18} className="mt-0.5 shrink-0"/>
              <span className="font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-300 ml-1">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all duration-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-semibold text-slate-300">Password</label>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all duration-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 focus:ring-4 focus:ring-blue-900 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-200 transform active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default Login;