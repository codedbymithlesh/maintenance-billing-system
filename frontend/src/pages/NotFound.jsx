import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    // MAIN CONTAINER: Dark Slate Background
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      
      {/* Card: Dark Slate, Solid Border */}
      <div className="max-w-md w-full bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-800 text-center">
        
        {/* Icon Animation */}
        <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-slate-800 text-blue-500 mb-6 animate-bounce border border-slate-700 shadow-lg shadow-blue-900/20">
          <FileQuestion size={48} />
        </div>

        {/* Text Content */}
        <h1 className="text-6xl font-extrabold text-blue-600 tracking-tight">404</h1>
        <h2 className="mt-4 text-2xl font-bold text-white">Page not found</h2>
        <p className="mt-2 text-slate-400 text-sm leading-relaxed">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex justify-center items-center px-5 py-2.5 border border-slate-700 shadow-sm text-sm font-medium rounded-xl text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </button>
          
          <Link
            to="/"
            className="inline-flex justify-center items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-900/20 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-8 text-center">
        <p className="text-xs text-slate-600">
          SnehSagar Society Management System
        </p>
      </div>
    </div>
  );
};

export default NotFound;