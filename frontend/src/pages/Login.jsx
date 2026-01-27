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
    <div className="min-h-screen flex bg-gray-50 text-gray-900 font-sans selection:bg-emerald-100">
      
      {/* LEFT SIDE: Branding & Info */}
      <div className="hidden lg:flex w-1/2 bg-emerald-900 relative overflow-hidden flex-col justify-between p-16 text-white">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-800 via-emerald-900 to-gray-900 opacity-90"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-teal-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

        {/* Brand Header */}
        <div className="relative z-10 animate-fade-in-down">
          <div className="flex items-center gap-3 text-emerald-400 mb-6">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <Building2 size={28} />
            </div>
            <span className="text-xl font-bold tracking-widest uppercase">SnehSagar Society</span>
          </div>
          
          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Simplifying <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-teal-400">
              Community Living
            </span>
          </h1>
          <p className="text-emerald-100/80 text-lg max-w-md leading-relaxed font-light">
            Experience seamless society management. Pay bills, raise complaints, and stay connected with your neighbors.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="relative z-10 grid gap-5 animate-fade-in-up delay-200">
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors cursor-default">
            <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-300">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-white">Secure Access</h3>
              <p className="text-sm text-emerald-200/60">Role-based secure login environment</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors cursor-default">
            <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-300">
              <Zap size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-white">Fast & Reliable</h3>
              <p className="text-sm text-emerald-200/60">Optimized performance for all devices</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-emerald-500/50 font-medium">
           &copy; {new Date().getFullYear()} SnehSagar Management System
        </div>
      </div>

      {/* RIGHT SIDE: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-white">
        <div className="max-w-[400px] w-full animate-fade-in p-5 rounded-2xl shadow-md bg-gray-50">
          
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/30">
              <Building2 size={28} />
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Welcome back</h2>
            <p className="text-gray-500 text-sm">Enter your credentials to access your account.</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm flex items-start gap-2 animate-pulse">
              <AlertCircle size={18} className="mt-0.5 shrink-0"/>
              <span className="font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
                </div>
                <input
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all duration-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                {/* <a href="#" className="text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors">Forgot password?</a> */}
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all duration-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Remember Me removed from here */}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-emerald-600 text-white py-3.5 rounded-xl font-bold hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-600/20 shadow-lg shadow-emerald-600/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-200 transform active:scale-[0.98]"
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