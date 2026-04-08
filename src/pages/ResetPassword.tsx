import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import SEO from '../components/SEO';
import { getSiteName } from '../utils/siteConfig';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [validToken, setValidToken] = useState(false);
  const navigate = useNavigate();
  const siteName = getSiteName();

  useEffect(() => {
    // Supabase injecte la session via le fragment URL (#access_token=...)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setValidToken(true);
      } else {
        setError('Lien de réinitialisation invalide ou expiré. Veuillez demander un nouveau lien.');
      }
    });
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setSuccess(true);
      // Déconnecte pour forcer une reconnexion propre
      setTimeout(async () => {
        await supabase.auth.signOut();
        navigate('/login');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la réinitialisation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: 'var(--darker)' }}>
      <SEO title={`Réinitialisation du mot de passe - ${siteName}`} description="Définissez votre nouveau mot de passe." />

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-md w-full animate-reveal relative z-10">
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-6">
            <img src="/logo.png?v=5" alt={siteName} className="h-16 w-auto object-contain mx-auto" />
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '2px' }}>
            NOUVEAU <span style={{ color: 'var(--red)' }}>MOT DE PASSE</span>
          </h1>
        </div>

        <div className="bg-white p-8 border border-red-600/10 shadow-2xl">
          {success ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2 uppercase tracking-wider">Mot de passe mis à jour !</h3>
              <p className="text-gray-500 text-sm">Vous allez être redirigé vers la page de connexion...</p>
            </div>
          ) : !validToken ? (
            <div className="text-center py-6">
              <div className="flex gap-2 bg-red-50 border-l-4 border-red-600 text-red-700 px-4 py-3 text-xs font-bold mb-6">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
              <Link to="/login" className="btn-primary inline-flex items-center gap-2 px-6 py-3">
                Retour à la connexion
              </Link>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[3px] ml-1">
                  Nouveau mot de passe
                </label>
                <div className="relative group">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="w-full bg-gray-50 border border-gray-200 px-12 py-4 text-gray-900 text-sm focus:border-red-600 outline-none transition-all font-medium"
                    placeholder="Minimum 8 caractères"
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600/40 group-focus-within:text-red-600 transition-colors" size={18} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[3px] ml-1">
                  Confirmer le mot de passe
                </label>
                <div className="relative group">
                  <input
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                    className="w-full bg-gray-50 border border-gray-200 px-12 py-4 text-gray-900 text-sm focus:border-red-600 outline-none transition-all font-medium"
                    placeholder="••••••••"
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600/40 group-focus-within:text-red-600 transition-colors" size={18} />
                </div>
              </div>

              {error && (
                <div className="flex gap-2 bg-red-50 border-l-4 border-red-600 text-red-700 px-4 py-3 text-xs font-bold">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-3 py-4 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <Lock size={18} />
                )}
                {loading ? 'Mise à jour...' : 'Réinitialiser le mot de passe'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
