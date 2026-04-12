import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * Page intermédiaire /auth/callback
 * Supabase OAuth (Google) redirige ici après connexion.
 * On vérifie la session, on détermine le rôle, et on redirige.
 */
export default function AuthCallback() {
  const navigate = useNavigate();
  const { user, role, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/login', { replace: true });
        return;
      }

      // Redirection basée sur le rôle récupéré par useAuth
      if (role === 'admin') {
        navigate('/admin', { replace: true });
      } else if (role === 'client') {
        navigate('/dashboard', { replace: true });
      } else {
        // Si vraiment aucun rôle n'est trouvé malgré l'auto-recouvrement
        navigate('/', { replace: true });
      }
    }
  }, [loading, user, role, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--darker)' }}>
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-400 font-bold tracking-widest text-xs uppercase">Connexion en cours...</p>
      </div>
    </div>
  );
}
