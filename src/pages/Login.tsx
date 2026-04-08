import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, ChevronRight, AlertCircle, Chrome, UserPlus, LogIn, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../lib/supabase';
import SEO from '../components/SEO';
import { getSiteName } from '../utils/siteConfig';
import { useAuth } from '../hooks/useAuth';

type AuthMode = 'login' | 'signup' | 'forgot';

export default function Login() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [signupDone, setSignupDone] = useState(false); // Écran confirmation email
  const [signupEmail, setSignupEmail] = useState(''); // Email utilisé pour l'inscription
  const navigate = useNavigate();
  const location = useLocation();
  const siteName = getSiteName();
  const { user, role, loading: authLoading } = useAuth();

  // Redirige si déjà connecté
  useEffect(() => {
    if (!authLoading && user && role) {
      if (role === 'admin') navigate('/admin', { replace: true });
      else if (role === 'client') navigate('/dashboard', { replace: true });
    }
  }, [user, role, authLoading, navigate]);

  // Affiche erreur non autorisé si redirigé depuis ProtectedRoute
  useEffect(() => {
    if ((location.state as any)?.error === 'unauthorized') {
      setError('Votre compte n\'est pas autorisé à accéder à cette plateforme. Contactez l\'administrateur.');
    }
  }, [location.state]);

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setError('');
    setInfo('');
    setPassword('');
    setConfirmPassword('');
  };

  // ─── EMAIL LOGIN ─────────────────────────────────────────────────────────────
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password });

      if (loginError) {
        if (loginError.message.includes('Invalid login credentials')) {
          setError('Email ou mot de passe incorrect. Vérifiez vos identifiants ou utilisez "Continuer avec Google".');
        } else if (loginError.message.includes('Email not confirmed')) {
          // L'utilisateur tente de se connecter mais son mail n'est pas validé
          // Afficher la page signupDone (qui contient déjà le bouton de renvoi d'email)
          setSignupEmail(email);
          setSignupDone(true);
          setError('');
          setInfo('');
          return;
        } else {
          setError(loginError.message);
        }
        return;
      }

      if (data.user) {
        const { data: authUser } = await supabase
          .from('tolito_chinecargologis_authorized_users')
          .select('role, active')
          .eq('email', data.user.email || '')
          .eq('active', true)
          .maybeSingle();

        if (!authUser) {
          // AUTO RECOUVREMENT : L'utilisateur est missing dans authorized_users (vieux compte / trigger buggé)
          // On force son ajout dans la table de tolito_chinecargologis
          await supabase
            .from('tolito_chinecargologis_authorized_users')
            .insert({
                user_id: data.user.id,
                email: data.user.email || '',
                role: 'client',
                active: true
            });
          
          navigate('/dashboard', { replace: true });
          return;
        }

        if (authUser.role === 'admin') navigate('/admin', { replace: true });
        else navigate('/dashboard', { replace: true });
      }
    } catch (err: any) {
      setError(err.message || 'Échec de la connexion. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  // ─── EMAIL SIGNUP ─────────────────────────────────────────────────────────────
  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    setLoading(true);
    try {
      const { data, error: signupError } = await supabase.auth.signUp({ email, password });

      if (signupError) {
        if (signupError.message.includes('already registered')) {
          setError('Un compte existe déjà avec cet email. Connectez-vous ou utilisez "Mot de passe oublié".');
        } else {
          setError(signupError.message);
        }
        return;
      }

      if (data.user) {
        // Si session directe (email confirmation désactivée dans Supabase)
        if (data.session) {
          navigate('/dashboard', { replace: true });
          return;
        }
        // Sinon → afficher l'écran de confirmation email
        setSignupEmail(email);
        setSignupDone(true);
        setInfo('');
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    setLoading(true);
    setError('');
    setInfo('');
    try {
      const targetEmail = signupEmail || email;
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: targetEmail,
      });
      if (error) throw error;
      setInfo('Un nouveau lien a été renvoyé avec succès !');
    } catch (err: any) {
      if (err.message && err.message.includes('rate limit exceeded')) {
        setError("Trop de tentatives. Veuillez patienter pour recevoir l'email, ou utilisez 'Continuer avec Google' pour un accès plus rapide.");
      } else {
        setError(err.message || 'Erreur lors du renvoi du lien.');
      }
    } finally {
      setLoading(false);
    }
  };

  // ─── GOOGLE AUTH ──────────────────────────────────────────────────────────────
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: { access_type: 'offline', prompt: 'consent' },
        },
      });

      if (error) {
        if (error.message.includes('already registered')) {
          setError('Ce compte existe déjà avec un mot de passe. Veuillez vous connecter avec votre email et mot de passe.');
        } else {
          setError(error.message);
        }
        setGoogleLoading(false);
      }
      // Si pas d'erreur → redirection Google en cours, garder le loader actif
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la connexion Google.');
      setGoogleLoading(false);
    }
  };

  // ─── FORGOT PASSWORD ──────────────────────────────────────────────────────────
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setError(error.message);
      } else {
        setInfo('Un lien de réinitialisation a été envoyé à ' + email + '. Vérifiez votre boîte mail.');
        switchMode('login');
      }
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'envoi du mail de réinitialisation.');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--darker)' }}>
        <div className="inline-block w-12 h-12 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Overlay Google loading (plein écran pour bloquer pendant la redirection)
  if (googleLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6" style={{ background: 'var(--darker)' }}>
        <div className="relative">
          <div className="w-20 h-20 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Chrome size={28} className="text-red-500" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-white font-black text-sm tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Connexion Google
          </p>
          <p className="text-gray-500 text-xs mt-1">Redirection vers Google en cours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10" style={{ background: 'var(--darker)' }}>
      <SEO
        title={`${mode === 'signup' ? 'Créer un compte' : 'Connexion'} - ${siteName}`}
        description="Connectez-vous à votre espace personnel Chine Cargo Logis."
      />

      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-md w-full animate-reveal relative z-10">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-5">
            <img src="/logo.png?v=5" alt={siteName} className="h-14 w-auto object-contain mx-auto" />
          </Link>
          <h1 className="text-2xl font-bold text-white mb-1.5" style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '2px' }}>
            {mode === 'signup' ? 'CRÉER UN' : mode === 'forgot' ? 'MOT DE PASSE' : 'MON'}{' '}
            <span style={{ color: 'var(--red)' }}>
              {mode === 'signup' ? 'COMPTE' : mode === 'forgot' ? 'OUBLIÉ' : 'ESPACE'}
            </span>
          </h1>
          <p className="text-gray-500 text-xs font-semibold tracking-widest uppercase" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            {signupDone && 'Vérifiez votre boîte mail'}
            {!signupDone && mode === 'login' && 'Accédez à votre tableau de bord'}
            {!signupDone && mode === 'signup' && 'Créez votre compte client'}
            {!signupDone && mode === 'forgot' && 'Recevez un lien de réinitialisation'}
          </p>
        </div>

        {/* Message info (succès) */}
        {info && !signupDone && (
          <div className="mb-4 bg-green-50 border-l-4 border-green-600 text-green-700 px-4 py-3 text-sm font-bold">
            {info}
          </div>
        )}

        <div className="bg-white p-8 border border-red-600/10 shadow-2xl">

          {/* ───── ÉCRAN CONFIRMATION EMAIL ───── */}
          {signupDone && (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <Mail size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-wider">Inscription réussie</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                Un email de confirmation a été envoyé à <strong className="text-gray-900">{signupEmail}</strong>.
                <br /><br />
                Veuillez cliquer sur le lien qu'il contient pour activer votre compte. Vérifiez également vos spams.
              </p>

              {error && <div className="mb-4 text-left"><ErrorBox message={error} /></div>}
              {info && (
                <div className="mb-4 bg-green-50 border-l-4 border-green-600 text-green-700 px-4 py-3 text-xs font-bold text-left">
                  {info}
                </div>
              )}

              <button
                onClick={() => { setSignupDone(false); switchMode('login'); }}
                className="btn-primary w-full py-4 text-sm mb-3"
              >
                Retour à la connexion
              </button>
              <button
                type="button"
                onClick={handleResendConfirmation}
                disabled={loading}
                className="w-full bg-white border border-gray-200 text-gray-700 py-4 font-bold text-xs tracking-widest uppercase hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {loading ? 'Envoi...' : 'Renvoyer le lien'}
              </button>
            </div>
          )}

          {/* ───── MOT DE PASSE OUBLIÉ ───── */}
          {!signupDone && mode === 'forgot' && (
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[3px] ml-1">Email</label>
                <div className="relative group">
                  <input
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                    className="w-full bg-gray-50 border border-gray-200 px-12 py-4 text-gray-900 text-sm focus:border-red-600 outline-none transition-all font-medium"
                    placeholder="votre@email.com"
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600/40 group-focus-within:text-red-600 transition-colors" size={18} />
                </div>
              </div>
              {error && <ErrorBox message={error} />}
              <LoaderButton loading={loading} label="Envoyer le lien" loadingLabel="Envoi..." />
              <BackButton onClick={() => switchMode('login')} />
            </form>
          )}

          {/* ───── INSCRIPTION ───── */}
          {!signupDone && mode === 'signup' && (
            <form onSubmit={handleEmailSignup} className="space-y-5">
              <EmailField value={email} onChange={setEmail} />
              <PasswordField value={password} onChange={setPassword} show={showPassword} onToggle={() => setShowPassword(!showPassword)} label="Mot de passe (min. 8 caractères)" />
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[3px] ml-1">Confirmer le mot de passe</label>
                <div className="relative group">
                  <input
                    type={showPassword ? 'text' : 'password'} value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} required
                    className="w-full bg-gray-50 border border-gray-200 px-12 py-4 text-gray-900 text-sm focus:border-red-600 outline-none transition-all font-medium"
                    placeholder="••••••••"
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600/40 group-focus-within:text-red-600 transition-colors" size={18} />
                </div>
              </div>
              {error && <ErrorBox message={error} />}
              <LoaderButton loading={loading} label="Créer mon compte" loadingLabel="Création..." icon={<UserPlus size={17} />} />
              <div className="text-center text-sm text-gray-500">
                Déjà un compte ?{' '}
                <button type="button" onClick={() => switchMode('login')} className="text-red-600 font-bold hover:underline">
                  Se connecter
                </button>
              </div>
            </form>
          )}

          {/* ───── CONNEXION ───── */}
          {!signupDone && mode === 'login' && (
            <div className="space-y-5">
              {/* Google */}
              <button
                type="button" onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 py-4 border-2 border-gray-200 hover:border-red-600/40 hover:bg-red-50/30 text-gray-700 font-bold text-sm transition-all duration-200"
              >
                <Chrome size={19} className="text-red-500" />
                Continuer avec Google
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-white text-gray-400 font-bold uppercase tracking-widest">ou</span>
                </div>
              </div>

              {/* Email form */}
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <EmailField value={email} onChange={setEmail} />
                
                <PasswordField 
                  value={password} 
                  onChange={setPassword} 
                  show={showPassword} 
                  onToggle={() => setShowPassword(!showPassword)} 
                  label={
                    <div className="flex justify-between items-center w-full">
                      <span>Mot de passe</span>
                      <button type="button" onClick={() => switchMode('forgot')} className="text-red-600 hover:underline">
                        Oublié ?
                      </button>
                    </div>
                  } 
                />

                {error && <ErrorBox message={error} />}

                <LoaderButton loading={loading} label="Se connecter" loadingLabel="Connexion..." icon={<LogIn size={17} />} />
              </form>

              {/* Switch to signup */}
              <div className="text-center text-sm text-gray-500 pt-2 border-t border-gray-100">
                Pas encore de compte ?{' '}
                <button onClick={() => switchMode('signup')} className="text-red-600 font-bold hover:underline">
                  Créer un compte
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Back to site */}
        <div className="mt-8 text-center">
          <Link to="/" className="text-gray-500 hover:text-red-600 font-bold text-xs tracking-[2px] uppercase flex items-center justify-center gap-2 transition-all">
            <ChevronRight size={14} className="rotate-180" />
            Retour au site
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ErrorBox({ message }: { message: string }) {
  return (
    <div className="flex gap-2 bg-red-50 border-l-4 border-red-600 text-red-700 px-4 py-3 text-xs font-bold">
      <AlertCircle size={15} className="shrink-0 mt-0.5" />
      <span>{message}</span>
    </div>
  );
}

function EmailField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[3px] ml-1">Adresse Email</label>
      <div className="relative group">
        <input
          type="email" value={value} onChange={(e) => onChange(e.target.value)} required
          className="w-full bg-gray-50 border border-gray-200 px-12 py-4 text-gray-900 text-sm focus:border-red-600 outline-none transition-all font-medium"
          placeholder="votre@email.com"
        />
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600/40 group-focus-within:text-red-600 transition-colors" size={18} />
      </div>
    </div>
  );
}

function PasswordField({ value, onChange, show, onToggle, label = 'Mot de passe' }: {
  value: string; onChange: (v: string) => void; show: boolean; onToggle: () => void; label?: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      {label && <div className="text-[10px] font-bold text-gray-400 uppercase tracking-[3px] ml-1">{label}</div>}
      <div className="relative group">
        <input
          type={show ? 'text' : 'password'} value={value} onChange={(e) => onChange(e.target.value)} required minLength={8}
          className="w-full bg-gray-50 border border-gray-200 px-12 py-4 pr-12 text-gray-900 text-sm focus:border-red-600 outline-none transition-all font-medium"
          placeholder="••••••••"
        />
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600/40 group-focus-within:text-red-600 transition-colors" size={18} />
        <button type="button" onClick={onToggle} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
          {show ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </div>
    </div>
  );
}

function LoaderButton({ loading, label, loadingLabel, icon }: {
  loading: boolean; label: string; loadingLabel: string; icon?: React.ReactNode;
}) {
  return (
    <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-3 py-4 disabled:opacity-60 disabled:cursor-not-allowed">
      {loading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
      ) : icon}
      {loading ? loadingLabel : label}
    </button>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="w-full text-center text-gray-500 hover:text-red-600 font-bold text-xs tracking-[2px] uppercase transition-all">
      ← Retour à la connexion
    </button>
  );
}
