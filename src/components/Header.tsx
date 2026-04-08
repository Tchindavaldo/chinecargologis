import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, UserCircle, LogOut, LayoutDashboard, ShieldCheck, ChevronDown } from 'lucide-react';
import TopBar from './TopBar';
import { useAuth } from '../hooks/useAuth';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const { user, role, signOut } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ferme le menu user si clic en dehors
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      // Ne ferme pas si on a cliqué en dehors MAIS qu'une déconnexion est en cours
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node) && !loggingOut) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [loggingOut]);

  const handleLogout = async () => {
    setLoggingOut(true);
    setIsMenuOpen(false);
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Purge absolue pour éviter que le navigateur ne garde un état corrompu
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('sb-')) localStorage.removeItem(key);
      });
      // RAFRAICHISSEMENT HARD
      if (window.location.pathname === '/') {
        window.location.reload();
      } else {
        window.location.href = '/';
      }
    }
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Mon Compte';
  const dashboardPath = role === 'admin' ? '/admin' : '/dashboard';

  return (
    <header className="fixed top-0 left-0 right-0 z-[100]">
      {!scrolled && <TopBar />}
      <nav
        id="navbar"
        className={`site-nav ${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}
        style={{ position: 'relative' }}
      >
        {/* LOGO */}
        <Link to="/" className="logo flex items-center gap-4">
          <img src="/logo.png?v=5" alt="Chine Cargo Logis" className="h-14 w-auto object-contain" />
          <div className="flex flex-col leading-tight">
            <span className="text-white font-black tracking-tight text-xl">CHINE CARGO</span>
            <span className="text-red-600 font-bold tracking-[0.2em] text-[12px]">LOGISTICS SOLUTIONS</span>
          </div>
        </Link>

        {/* NAV LINKS */}
        <div className={`nav-links-wrapper ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Accueil</Link></li>
            <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>À Propos</Link></li>
            <li><Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link></li>
            <li><Link to="/network" onClick={() => setIsMenuOpen(false)}>Réseau</Link></li>
            <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
          </ul>
          <Link to="/track" className="nav-cta mobile-only" onClick={() => setIsMenuOpen(false)}>
            SUIVRE COLIS →
          </Link>
          {/* MOBILE: options auth */}
          <div className="mobile-only mt-3 border-t border-white/10 pt-3">
            {user ? (
              <div className="flex flex-col gap-2 px-2">
                <Link
                  to={dashboardPath}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 text-white/80 hover:text-white font-bold text-sm py-2"
                >
                  <LayoutDashboard size={15} className="text-red-500" />
                  {role === 'admin' ? 'Dashboard Admin' : 'Mes Expéditions'}
                </Link>
                <button
                  onClick={() => { setIsMenuOpen(false); handleLogout(); }}
                  className="flex items-center gap-2 text-red-400 hover:text-red-300 font-bold text-sm py-2"
                >
                  <LogOut size={15} />
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 text-white/80 hover:text-red-400 font-bold text-sm py-2 px-2"
              >
                <UserCircle size={15} className="text-red-500" />
                Mon Espace
              </Link>
            )}
          </div>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">
          <Link to="/track" className="nav-cta desktop-only">
            SUIVRE COLIS →
          </Link>

          {/* NON CONNECTÉ → Bouton "Mon Espace" */}
          {!user && (
            <Link
              to="/login"
              className="hidden sm:flex items-center gap-2 px-4 py-2 border border-white/20 hover:border-red-600 text-white/80 hover:text-white text-xs font-bold tracking-widest uppercase transition-all duration-200 rounded-none"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              <UserCircle size={15} />
              MON ESPACE
            </Link>
          )}

          {/* CONNECTÉ → Avatar + Menu déroulant */}
          {user && (
            <div className="relative hidden sm:block" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-600/30 text-white transition-all duration-200 rounded-none"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              >
                <div className="w-6 h-6 rounded-full bg-red-600/20 border border-red-600/30 flex items-center justify-center">
                  {user.user_metadata?.avatar_url ? (
                    <img src={user.user_metadata.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <UserCircle size={14} className="text-red-400" />
                  )}
                </div>
                <span className="text-xs font-bold max-w-[100px] truncate">{displayName}</span>
                <ChevronDown size={12} className={`text-gray-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown */}
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-gray-900 border border-gray-800/80 shadow-2xl shadow-black/50 z-50">
                  <div className="px-4 py-3 border-b border-gray-800">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Connecté en tant que</p>
                    <p className="text-white text-xs font-bold truncate mt-0.5">{user.email}</p>
                    <span className={`inline-flex items-center gap-1 mt-1.5 text-[9px] font-black px-2 py-0.5 uppercase tracking-widest ${role === 'admin' ? 'bg-red-600/20 text-red-400' : 'bg-blue-600/20 text-blue-400'}`}>
                      {role === 'admin' ? <ShieldCheck size={9} /> : <UserCircle size={9} />}
                      {role === 'admin' ? 'Administrateur' : 'Client'}
                    </span>
                  </div>

                  <Link
                    to={dashboardPath}
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-xs font-bold uppercase tracking-wider"
                  >
                    <LayoutDashboard size={14} className="text-red-500" />
                    {role === 'admin' ? 'Dashboard Admin' : 'Mes Expéditions'}
                  </Link>

                  <button
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-red-600/5 transition-colors text-xs font-bold uppercase tracking-wider border-t border-gray-800 disabled:opacity-50"
                  >
                    {loggingOut ? (
                      <div className="w-3.5 h-3.5 border-2 border-gray-400 border-t-red-600 rounded-full animate-spin"></div>
                    ) : (
                      <LogOut size={14} />
                    )}
                    {loggingOut ? 'Déconnexion...' : 'Déconnexion'}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
