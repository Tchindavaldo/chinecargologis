import { Link } from 'react-router-dom';
import { useSiteSettings } from '../hooks/useSiteSettings';

export default function Footer() {
  const { settings } = useSiteSettings();

  return (
    <footer>
      <div className="footer-top">
        <div>
          {settings?.company_name && (
            <div className="footer-logo">{settings.company_name}</div>
          )}
          {settings?.company_description && (
            <p className="footer-desc">{settings.company_description}</p>
          )}
          <div className="footer-socials">
            <div className="social-btn">in</div>
            <div className="social-btn">tw</div>
            <div className="social-btn">ig</div>
            <div className="social-btn">yt</div>
          </div>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li><Link to="/services">Express 24–48h</Link></li>
            <li><Link to="/services">Fret Aérien</Link></li>
            <li><Link to="/services">Fret Maritime</Link></li>
            <li><Link to="/services">E-commerce</Link></li>
            <li><Link to="/services">Dédouanement</Link></li>
            <li><Link to="/services">Assurance</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Entreprise</h4>
          <ul>
            <li><Link to="/about">À propos</Link></li>
            <li><Link to="/network">Nos entrepôts</Link></li>
            <li><Link to="/blog">Blog logistique</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><Link to="/contact">💬 Chat en ligne</Link></li>
            {settings?.site_phone && (
              <li><a href={`tel:${settings.site_phone}`}>📞 {settings.site_phone}</a></li>
            )}
            {settings?.site_email && (
              <li><a href={`mailto:${settings.site_email}`}>✉ {settings.site_email}</a></li>
            )}
            {settings?.site_address && (
              <li><span>📍 {settings.site_address}</span></li>
            )}
            <li><Link to="/faq">FAQ &amp; Aide</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-copy">
          © {new Date().getFullYear()} {settings?.company_name} · Tous droits réservés
        </div>
        <ul className="footer-bottom-links">
          <li><Link to="/legals">Mentions légales</Link></li>
          <li><Link to="/terms">CGV</Link></li>
          <li><Link to="/privacy">Confidentialité</Link></li>
          <li><Link to="/cookies">Cookies</Link></li>
        </ul>
      </div>
    </footer>
  );
}
