import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  LogOut, 
  Home, 
  FileText, 
  Users, 
  Menu, 
  X,  
  ChevronRight 
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); 
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  // Updated colors for Active/Inactive states (Dark Mode)
  const isActive = (path) => {
    return location.pathname === path 
      ? "bg-blue-900/20 text-blue-400" 
      : "text-slate-400 hover:bg-slate-800 hover:text-white";
  };

  return (
    // MAIN NAV: Dark Slate Background + Border
    <nav className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="text-xl font-bold text-slate-100 tracking-tight">
                SnehSagar<span className="text-blue-500"> Society</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {user.role === 'admin' && (
              <>
                <NavLink to="/admin" icon={<Home size={18} />} label="Dashboard" isActive={isActive('/admin')} />
                <NavLink to="/admin/bills" icon={<FileText size={18} />} label="Manage Bills" isActive={isActive('/admin/bills')} />
                <NavLink to="/admin/residents" icon={<Users size={18} />} label="Residents" isActive={isActive('/admin/residents')} />
              </>
            )}
          </div>

          {/* User Profile Section (Desktop) */}
          <div className="hidden md:flex items-center gap-4 border-l border-slate-800 pl-6 ml-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 font-bold text-sm">
                {user.name?.charAt(0) || 'U'}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-200 leading-tight">
                  {user.name}
                </span>
                <span className="text-xs text-slate-500 capitalize">
                  {user.role}
                </span>
              </div>
            </div>
            
            <button 
              onClick={handleLogout} 
              className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-900/20 rounded-full transition-all duration-200"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="text-slate-400 hover:text-white focus:outline-none p-2 rounded-md hover:bg-slate-800"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 shadow-lg absolute w-full left-0 z-40">
          <div className="px-4 py-3 space-y-2">
            {user.role === 'admin' && (
              <>
                <MobileLink to="/admin" icon={<Home size={18}/>} label="Dashboard" setOpen={setOpen} isActive={location.pathname === '/admin'} />
                <MobileLink to="/admin/bills" icon={<FileText size={18}/>} label="Manage Bills" setOpen={setOpen} isActive={location.pathname === '/admin/bills'} />
                <MobileLink to="/admin/residents" icon={<Users size={18}/>} label="Residents" setOpen={setOpen} isActive={location.pathname === '/admin/residents'} />
              </>
            )}
          </div>
          
          {/* Mobile User Profile & Logout */}
          <div className="border-t border-slate-800 px-4 py-4 bg-slate-950">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 font-bold">
                  {user.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-200">{user.name}</p>
                  <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 border border-slate-700 text-slate-300 px-4 py-2 rounded-lg hover:bg-red-900/20 hover:text-red-400 hover:border-red-900/50 transition-colors text-sm font-medium"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, icon, label, isActive }) => (
  <Link
    to={to}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive}`}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

const MobileLink = ({ to, icon, label, setOpen, isActive }) => (
  <Link
    to={to}
    onClick={() => setOpen(false)}
    className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
      isActive ? 'bg-blue-900/20 text-blue-400' : 'text-slate-400 hover:bg-slate-800'
    }`}
  >
    <div className="flex items-center gap-3">
      {icon}
      <span>{label}</span>
    </div>
    <ChevronRight size={16} className={`opacity-50 ${isActive ? 'text-blue-400' : 'text-slate-600'}`} />
  </Link>
);

export default Navbar;