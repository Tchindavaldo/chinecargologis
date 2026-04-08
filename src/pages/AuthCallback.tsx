import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

/**
 * Page intermédiaire /auth/callback
 * Supabase OAuth (Google) redirige ici après connexion.
 * On vérifie la session, on détermine le rôle, et on redirige.
 */
export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      // Laisse Supabase traiter les hash params (#access_token=...)
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
        navigate('/login', { replace: true });
        return;
      }

      const user = session.user;

      // Tente de lier le user_id si non encore fait
      await supabase
        .from('tolito_chinecargologis_authorized_users')
        .update({ user_id: user.id, updated_at: new Date().toISOString() })
        .eq('email', user.email || '')
        .is('user_id', null);

      // Récupère le rôle
      const { data: authUser } = await supabase
        .from('tolito_chinecargologis_authorized_users')
        .select('role, active')
        .eq('email', user.email || '')
        .eq('active', true)
        .maybeSingle();

      if (!authUser) {
        // AUTO RECOUVREMENT : Vieux compte Google ou trigger défaillant
        await supabase
          .from('tolito_chinecargologis_authorized_users')
          .insert({
              user_id: user.id,
              email: user.email || '',
              role: 'client', // role par défaut
              active: true
          });

        navigate('/dashboard', { replace: true });
        return;
      }

      if (authUser.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--darker)' }}>
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-400 font-bold tracking-widest text-xs uppercase">Connexion en cours...</p>
      </div>
    </div>
  );
}
