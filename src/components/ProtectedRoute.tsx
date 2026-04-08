import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { UserRole } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--darker)' }}>
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400 font-bold tracking-widest text-xs uppercase">Vérification...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && role !== requiredRole) {
    // Si client essaie d'accéder à /admin → dashboard
    if (role === 'client') {
      return <Navigate to="/dashboard" replace />;
    }
    // Si admin essaie d'accéder à /dashboard → admin
    if (role === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    // Pas d'accès du tout
    return <Navigate to="/login" replace />;
  }

  // User sans rôle dans la BD (non autorisé)
  if (role === null) {
    return <Navigate to="/login" state={{ error: 'unauthorized' }} replace />;
  }

  return <>{children}</>;
}
