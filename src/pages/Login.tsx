import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ChevronRight, ShieldCheck } from 'lucide-react';
import { supabase } from '../lib/supabase';
import SEO from '../components/SEO';
import { getSiteName, getAllowedEmails } from '../utils/siteConfig';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const siteName = getSiteName();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) throw loginError;

      if (data.user) {
        // Security check: Verify if email is allowed
        const allowedEmails = getAllowedEmails();
        if (allowedEmails.length > 0 && data.user.email && !allowedEmails.includes(data.user.email)) {
             await supabase.auth.signOut();
             throw new Error('Accès refusé : Votre compte n\'est pas autorisé sur ce site.');
        }

        navigate('/admin');
      }
    } catch (err: any) {
      setError(err.message || 'Échec de la connexion. Veuillez vérifier vos identifiants.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: 'var(--darker)' }}>
      <SEO title={`Connexion - ${siteName}`} description="Espace administration pour la gestion des expéditions." />
      
      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-md w-full animate-reveal relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white border border-red-600/10 mb-6 group shadow-lg">
            <Lock size={36} className="text-red-600 group-hover:scale-110 transition-transform" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '2px' }}>
            ESPACE <span style={{ color: 'var(--red)' }}>ADMIN</span>
          </h1>
          <p className="text-muted text-sm font-semibold tracking-wide uppercase" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            Accédez au tableau de bord {siteName}
          </p>
        </div>

        <div className="bg-white p-10 border border-red-600/10 shadow-xl">
          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-2">
              <label htmlFor="email" className="text-[10px] font-bold text-gray-400 uppercase tracking-[3px] ml-1">
                Adresse Email
              </label>
              <div className="relative group">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-gray-50 border border-gray-200 px-12 py-4 text-gray-900 text-sm focus:border-red-600 outline-none transition-all font-medium"
                  placeholder="admin@chinedx.fr"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600/40 group-focus-within:text-red-600 transition-colors" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-[10px] font-bold text-gray-400 uppercase tracking-[3px] ml-1">
                Mot de passe
              </label>
              <div className="relative group">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-gray-50 border border-gray-200 px-12 py-4 text-gray-900 text-sm focus:border-red-600 outline-none transition-all font-medium"
                  placeholder="••••••••"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600/40 group-focus-within:text-red-600 transition-colors" size={18} />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-600 text-red-600 px-4 py-3 text-xs font-bold uppercase tracking-wider">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-3 py-4 group disabled:opacity-50"
            >
              <ShieldCheck size={20} className={loading ? 'animate-pulse' : ''} />
              {loading ? 'AUTHENTIFICATION...' : 'SE CONNECTER'}
            </button>
          </form>
        </div>

        <div className="mt-10 text-center">
          <a href="/" className="text-muted hover:text-red-600 font-bold text-xs tracking-[2px] uppercase flex items-center justify-center gap-2 transition-all">
            <ChevronRight size={14} className="rotate-180" />
            Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}

