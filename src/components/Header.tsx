import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import TopBar from './TopBar';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100]">
      {!scrolled && <TopBar />}
      <nav id="navbar" className={`site-nav ${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`} style={{ position: 'relative' }}>
      <Link to="/" className="logo flex-shrink-0">
        <div className="logo-icon text-xs">✦</div>
        <span className="hidden sm:inline">CHINE</span>CARGO<span className="hidden sm:inline text-red-600">LOGIS</span>
        <span className="sm:hidden text-red-600 font-black ml-1">CCL</span>
      </Link>

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
      </div>

      <div className="flex items-center gap-4">
        <Link to="/track" className="nav-cta desktop-only">
          SUIVRE COLIS →
        </Link>
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

