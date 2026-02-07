import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import AdminRegister from './pages/AdminRegister';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageBills from './pages/admin/ManageBills';
import ResidentDashboard from './pages/client/ResidentDashboard';
import Resident from './pages/admin/Resident';
import NotFound from './pages/NotFound';
import Loading from './pages/Loading';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
};

const AppRoutes = () => {
  const { user } = useContext(AuthContext);
  const [isPageLoading, setIsPageLoading] = useState(true);

  // Yeh effect tab chalega jab saara content load ho jayega
  useEffect(() => {
    const handleLoad = () => {
      setIsPageLoading(false);
    };

    if (document.readyState === 'complete') {
      setIsPageLoading(false);
    } else {
      window.addEventListener('load', handleLoad);
      // Safety timeout: Agar load event late ho toh 2 sec baad hide kar dega
      const timer = setTimeout(() => setIsPageLoading(false), 2000); 
      
      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(timer);
      };
    }
  }, []);

  // Jab tak loading true hai, sirf Loading component dikhega
  if (isPageLoading) {
    return <Loading />;
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Default Route Logic */}
        <Route path="/" element={
          user ? (
            <Navigate to={user.role === 'admin' ? "/admin" : "/resident"} />
          ) : (
            <Login />
          )
        } />

        <Route path="/api/auth/admin/signup" element={<AdminRegister />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/bills" element={
          <ProtectedRoute role="admin">
            <ManageBills />
          </ProtectedRoute>
        } />
        <Route path="/admin/residents" element={
          <ProtectedRoute role="admin">
            <Resident />
          </ProtectedRoute>
        } />

        {/* Resident Routes */}
        <Route path="/resident" element={
          <ProtectedRoute role="resident">
            <ResidentDashboard />
          </ProtectedRoute>
        } />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;