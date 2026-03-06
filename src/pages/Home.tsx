import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import OrganizationSchema from '../components/OrganizationSchema';
import CounterAnimation from '../components/CounterAnimation';

export default function Home() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const navigate = useNavigate();

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      navigate(`/track?tracking=${encodeURIComponent(trackingNumber.trim())}`);
    }
  };

  useEffect(() => {
    // Scroll reveal
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity = '1'; 
          (e.target as HTMLElement).style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    
    const revealElements = document.querySelectorAll('.stat-item, .service-card, .zone-card, .testi-card, .tarif-card, .how-step, .faq-item, .partner-logo');
    revealElements.forEach((el, i) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.opacity = '0'; 
      htmlEl.style.transform = 'translateY(22px)';
      htmlEl.style.transition = `opacity .55s ${i * 0.07}s ease, transform .55s ${i * 0.07}s ease, background .4s, border-color .3s`;
      obs.observe(el);
    });

    return () => {
      obs.disconnect();
    };
  }, []);

  const toggleFaq = (e: React.MouseEvent<HTMLDivElement>) => {
    const item = e.currentTarget.parentElement;
    if (!item) return;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  };

  return (
    <div style={{ background: 'var(--dark)', color: 'var(--text)' }}>
      <SEO />
      <OrganizationSchema />
      <Header />

      {/* Hero */}
      <section className="hero">
        <div className="hero-img-bg"></div>
        <div className="hero-overlay"></div>
        <div className="hero-overlay2"></div>
        <div className="hero-overlay3"></div>

        <div className="node node-1">📦 Shanghai → Paris · 48h</div>
        <div className="node node-2">✈ En transit · Dubai Hub</div>
        <div className="node node-3">🟢 Livré · Lyon · 09:42</div>
        <div className="node node-4">📡 CDX-9482 · En route</div>

        <div className="hero-content">
          <div className="hero-badge">🚀 Réseau logistique Chine → Monde</div>
          <h1>Livraison<br/><em>Ultra-Rapide</em><br/>Chine → Monde</h1>
          <p className="hero-sub">Expéditions depuis la Chine en 24h à 72h, suivi temps réel, dédouanement intégré. Connectez votre business aux marchés mondiaux.</p>

          <div className="hero-track-box">
            <div className="hero-track-label">🔍 Suivre mon colis</div>
            <form className="hero-track-form" onSubmit={handleTrackSubmit}>
              <input 
                className="hero-track-input" 
                type="text" 
                placeholder="Entrez votre numéro de tracking · Ex: CDX-948200-SH"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
              <button className="hero-track-btn" type="submit">
                <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/></svg>
                TRACK
              </button>
            </form>
          </div>

          <div className="hero-actions">
            <a href="#tarifs" className="btn-primary">Calculer un tarif</a>
            <a href="#services" className="btn-secondary">Nos services</a>
          </div>
          <div className="hero-trust">
            <div className="trust-item"><span>★★★★★</span> 4.9/5 · 12 000+ avis</div>
            <div className="trust-item"><span>✓</span> Paiement sécurisé</div>
            <div className="trust-item"><span>✓</span> Remboursement garanti</div>
          </div>
        </div>

        <div className="scroll-cue"><div className="scroll-line"></div>Découvrir</div>
      </section>

      {/* Stats */}
      <div className="stats-bar bg-white border-y border-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="stat-item">
          <div className="stat-value">
            <CounterAnimation end={2.4} duration={2500} suffix="M+" decimals={1} />
          </div>
          <div className="stat-label">Colis livrés</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">
            <CounterAnimation end={98} duration={2500} suffix="%" />
          </div>
          <div className="stat-label">Satisfaction client</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">
            <CounterAnimation end={48} duration={2500} suffix="h" />
          </div>
          <div className="stat-label">Délai Express moyen</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">
            <CounterAnimation end={180} duration={2500} suffix="+" />
          </div>
          <div className="stat-label">Pays desservis</div>
        </div>
      </div>

      {/* How it works */}
      <section className="how" id="how">
        <div className="how-bg-img"></div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="section-tag">// Processus simplifié</div>
          <h2>Expédier en <em style={{ color: 'var(--red)', fontStyle: 'normal' }}>5 étapes</em> simples</h2>
          <div className="how-steps">
            <div className="how-step"><div className="step-num">01</div><span className="step-icon-lg">📋</span><div className="step-h">Créez votre envoi</div><p className="step-p">Formulaire en ligne en 2 minutes depuis votre espace client sécurisé.</p></div>
            <div className="how-step"><div className="step-num">02</div><span className="step-icon-lg">🏭</span><div className="step-h">Collecte en Chine</div><p className="step-p">Récupération chez votre fournisseur, vérification qualité incluse.</p></div>
            <div className="how-step"><div className="step-num">03</div><span className="step-icon-lg">✈️</span><div className="step-h">Expédition Express</div><p className="step-p">Traitement à Shanghai ou Shenzhen, départ sur le prochain vol.</p></div>
            <div className="how-step"><div className="step-num">04</div><span className="step-icon-lg">🛃</span><div className="step-h">Dédouanement auto</div><p className="step-p">Nos experts gèrent toute la documentation. Aucune surprise.</p></div>
            <div className="how-step"><div className="step-num">05</div><span className="step-icon-lg">🏠</span><div className="step-h">Livraison chez vous</div><p className="step-p">À domicile, point relais ou entrepôt. Signature électronique.</p></div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services" id="services">
        <div className="section-tag">// Nos solutions</div>
        <h2>Services de livraison <em style={{ color: 'var(--red)', fontStyle: 'normal' }}>premium</em></h2>
        <div className="services-grid">
          <div className="service-card">
            <img className="service-img" src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=600&q=75" alt="Express delivery" loading="lazy" />
            <div className="service-body">
              <div className="service-number">01 — EXPRESS</div>
              <div className="service-title">Livraison Express 24–48h</div>
              <p className="service-desc">Expédition prioritaire depuis nos entrepôts en Chine. Traitement immédiat, vol direct, livraison garantie en 24 à 48 heures.</p>
            </div>
            <div className="service-arrow">→</div>
          </div>
          <div className="service-card">
            <img className="service-img" src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=75" alt="Freight" loading="lazy" />
            <div className="service-body">
              <div className="service-number">02 — FRET</div>
              <div className="service-title">Fret Maritime & Aérien</div>
              <p className="service-desc">Solutions optimisées pour gros volumes. Conteneurs FCL ou groupage LCL — logistique adaptée à vos volumes et budgets.</p>
            </div>
            <div className="service-arrow">→</div>
          </div>
          <div className="service-card">
            <img className="service-img" src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&q=75" alt="Track" loading="lazy" />
            <div className="service-body">
              <div className="service-number">03 — TRACK</div>
              <div className="service-title">Tracking Temps Réel</div>
              <p className="service-desc">Visibilité totale à chaque étape. Notifications SMS et email automatiques, alertes proactives, tableau de bord 24h/7j.</p>
            </div>
            <div className="service-arrow">→</div>
          </div>
          <div className="service-card">
            <img className="service-img" src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=75" alt="Customs" loading="lazy" />
            <div className="service-body">
              <div className="service-number">04 — CUSTOMS</div>
              <div className="service-title">Dédouanement Intégré</div>
              <p className="service-desc">Nos experts gèrent toute la documentation. Import, export, conformité réglementaire — livraison DDP ou DAP.</p>
            </div>
            <div className="service-arrow">→</div>
          </div>
          <div className="service-card">
            <img className="service-img" src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=75" alt="Ecommerce" loading="lazy" />
            <div className="service-body">
              <div className="service-number">05 — ECOM</div>
              <div className="service-title">Solutions E-commerce</div>
              <p className="service-desc">Intégration Shopify, Amazon, WooCommerce. Fulfillment automatisé, gestion des retours, étiquetage personnalisé.</p>
            </div>
            <div className="service-arrow">→</div>
          </div>
          <div className="service-card">
            <img className="service-img" src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=600&q=75" alt="Secure" loading="lazy" />
            <div className="service-body">
              <div className="service-number">06 — SECURE</div>
              <div className="service-title">Assurance & Sécurité</div>
              <p className="service-desc">Assurance tous risques, emballage renforcé et responsabilité contractuelle totale de la collecte à la livraison.</p>
            </div>
            <div className="service-arrow">→</div>
          </div>
        </div>
      </section>

      {/* Split Section */}
      <div className="split-section">
        <div className="split-img">
          <img src="https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=900&q=80" alt="Ship" loading="lazy" />
          <div className="split-img-overlay"></div>
        </div>
        <div className="split-content ">
          <div className="section-tag">// Fret maritime mondial</div>
          <h2>Des navires qui<br/>ne s'arrêtent <em style={{ color: 'var(--red)', fontStyle: 'normal' }}>jamais</em></h2>
          <p>Notre flotte partenaire opère 24h/24 sur les routes maritimes Shanghai–Europe, Shanghai–USA, Shanghai–Moyen-Orient. Chaque semaine, des centaines de conteneurs chargés en Chine arrivent à destination grâce à notre réseau.</p>
          <a href="#tarifs" className="btn-primary">Voir nos offres fret</a>
        </div>
      </div>

      <div className="img-band">
        <div className="img-band-item">
          <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=700&q=75" alt="Port" loading="lazy" />
          <div className="img-band-label">Port de Shanghai</div>
        </div>
        <div className="img-band-item">
          <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&q=75" alt="Ship" loading="lazy" />
          <div className="img-band-label">Ligne Asie–Europe</div>
        </div>
        <div className="img-band-item">
          <img src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=700&q=75" alt="Warehouse" loading="lazy" />
          <div className="img-band-label">Entrepôt Shenzhen</div>
        </div>
      </div>

      {/* Tracking */}
      <section className="tracking-section" id="tracking">
        <div>
          <div className="section-tag">// Suivi en direct</div>
          <h2>Où est votre<br/>livraison ?</h2>
          <p style={{ color: 'var(--muted)', marginTop: '14px', lineHeight: 1.78, fontSize: '.88rem' }}>Localisez votre colis en temps réel. Mises à jour toutes les 15 minutes depuis notre réseau de 180+ partenaires mondiaux.</p>
          <form className="tracking-input-group" onSubmit={handleTrackSubmit}>
            <input 
              type="text" 
              className="tracking-input" 
              placeholder="Ex: CDX-948200-SH" 
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
            />
            <button className="tracking-btn" type="submit">Suivre →</button>
          </form>
          <p style={{ fontSize: '.74rem', color: 'var(--muted)', marginTop: '10px', fontFamily: "'Rajdhani', sans-serif", letterSpacing: '1px' }}>Suivi SMS · Envoyez votre N° au <span style={{ color: 'var(--red)' }}>+33 6 XX XX XX XX</span></p>
        </div>
        <div>
          <div className="section-tag">// Statut · CDX-948200-SH</div>
          <div className="track-steps">
            <div className="track-step"><div className="step-dot done">✓</div><div className="step-info"><div className="step-title">Prise en charge — Shanghai</div><div className="step-detail">14 Jan · 08:32 CST · Entrepôt Pudong</div></div></div>
            <div className="track-step"><div className="step-dot done">✓</div><div className="step-info"><div className="step-title">Départ vol Pudong → CDG</div><div className="step-detail">14 Jan · 23:10 CST · Vol AF293</div></div></div>
            <div className="track-step"><div className="step-dot done">✓</div><div className="step-info"><div className="step-title">Arrivée Paris CDG — Dédouané ✓</div><div className="step-detail">15 Jan · 07:20 CET</div></div></div>
            <div className="track-step"><div className="step-dot active">▶</div><div className="step-info"><div className="step-title" style={{ color: 'var(--red)' }}>En cours de livraison — Lyon</div><div className="step-detail">15 Jan · 11:45 CET · Livreur en route</div></div></div>
            <div className="track-step"><div className="step-dot pending">5</div><div className="step-info"><div className="step-title" style={{ color: 'var(--muted)' }}>Livraison finale</div><div className="step-detail">Estimé aujourd'hui 14h–16h</div></div></div>
          </div>
        </div>
      </section>

      {/* Split Air */}
      <div className="split-section">
        <div className="split-content">
          <div className="section-tag">// Livraison aérienne express</div>
          <h2>Dans les airs en<br/><em style={{ color: 'var(--red)', fontStyle: 'normal' }}>moins de 24h</em></h2>
          <p>Vols directs depuis Shanghai Pudong et Shenzhen Baoan vers Paris CDG, Frankfurt, Dubai, New York. Nos accords préférentiels avec les compagnies aériennes garantissent une capacité fret même en haute saison.</p>
          <a href="#tarifs" className="btn-primary">Voir l'offre Express</a>
        </div>
        <div className="split-img">
          <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=80" alt="Plane" loading="lazy" />
          <div className="split-img-overlay" style={{ background: 'linear-gradient(to left, transparent, rgba(232,0,29, 0.05))' }}></div>
        </div>
      </div>

      {/* Tarifs */}
      <section className="tarifs" id="tarifs">
        <div className="tarifs-bg"></div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="section-tag">// Nos offres</div>
          <h2>Des tarifs clairs,<br/>sans <em style={{ color: 'var(--red)', fontStyle: 'normal' }}>surprise</em></h2>
          <div className="tarifs-grid">
            <div className="tarif-card">
              <div className="tarif-name">Standard</div>
              <div className="tarif-from">À partir de</div>
              <div className="tarif-price">9<sup>€</sup></div>
              <div className="tarif-unit">par kg · délai 5–10 jours</div>
              <ul className="tarif-feats">
                <li>Livraison économique aérienne</li>
                <li>Suivi en ligne inclus</li>
                <li>Dédouanement simplifié</li>
                <li>Assurance de base</li>
                <li className="off">Priorité d'expédition</li>
                <li className="off">Support dédié 24h</li>
              </ul>
              <div style={{ padding: '0 20px' }}>
                <a href="#" className="btn-secondary" style={{ width: '100%', textAlign: 'center', display: 'block' }}>Commencer</a>
              </div>
            </div>
            <div className="tarif-card featured">
              <div className="tarif-name">Express Pro</div>
              <div className="tarif-from">À partir de</div>
              <div className="tarif-price">19<sup>€</sup></div>
              <div className="tarif-unit">par kg · délai 48–72h</div>
              <ul className="tarif-feats">
                <li>Livraison express aérienne</li>
                <li>Suivi temps réel + alertes SMS</li>
                <li>Dédouanement DDP intégral</li>
                <li>Assurance tous risques</li>
                <li>Priorité d'expédition</li>
                <li>Support dédié 24h/7j</li>
              </ul>
              <div style={{ padding: '0 20px' }}>
                <a href="#" className="btn-primary" style={{ width: '100%', textAlign: 'center', display: 'block' }}>Expédier maintenant</a>
              </div>
            </div>
            <div className="tarif-card">
              <div className="tarif-name">Business</div>
              <div className="tarif-from">Volume · Fret dédié</div>
              <div className="tarif-price" style={{ fontSize: '1.9rem', paddingTop: '10px' }}>Sur devis</div>
              <div className="tarif-unit">tarifs dégressifs · contrat</div>
              <ul className="tarif-feats">
                <li>Fret aérien ou maritime dédié</li>
                <li>Dashboard entreprise avancé</li>
                <li>Dédouanement expert multi-pays</li>
                <li>Assurance marchandises premium</li>
                <li>Account manager dédié</li>
                <li>Intégration API & ERP</li>
              </ul>
              <div style={{ padding: '0 20px' }}>
                <a href="#contact" className="btn-secondary" style={{ width: '100%', textAlign: 'center', display: 'block' }}>Nous contacter</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials" id="avis">
        <div className="section-tag">// Ce que disent nos clients</div>
        <h2>Ils nous font <em style={{ color: 'var(--red)', fontStyle: 'normal' }}>confiance</em></h2>
        <div className="testi-grid">
          <div className="testi-card">
            <div className="testi-quote">"</div>
            <div className="testi-stars">★★★★★</div>
            <p className="testi-text">Incroyable ! Mon colis est parti de Shenzhen un lundi matin et était livré à Paris le mercredi soir. Le tracking en temps réel m'a permis de tout suivre sans stress.</p>
            <div className="testi-author"><div className="testi-avatar">ML</div><div><div className="testi-name">Marie L.</div><div className="testi-role">Gérante boutique e-commerce · Paris</div></div></div>
          </div>
          <div className="testi-card">
            <div className="testi-quote">"</div>
            <div className="testi-stars">★★★★★</div>
            <p className="testi-text">Nous importons en volume depuis Guangzhou. Chine CargoLogis gère tout : collecte, dédouanement, livraison. Zéro paperasse, résultats impeccables.</p>
            <div className="testi-author"><div className="testi-avatar">TC</div><div><div className="testi-name">Thomas C.</div><div className="testi-role">Directeur achats · Lyon</div></div></div>
          </div>
          <div className="testi-card">
            <div className="testi-quote">"</div>
            <div className="testi-stars">★★★★★</div>
            <p className="testi-text">J'ai testé 4 concurrents — Chine CargoLogis est le seul à tenir ses délais 100% du temps, même en haute saison. Incontournable.</p>
            <div className="testi-author"><div className="testi-avatar">SB</div><div><div className="testi-name">Sofia B.</div><div className="testi-role">E-commerçante Shopify · Bordeaux</div></div></div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <div className="partners">
        <div className="partners-label">Partenaires logistiques & transporteurs de confiance</div>
        <div className="partners-logos">
          <div className="partner-logo">DHL EXPRESS</div>
          <div className="partner-logo">FEDEX</div>
          <div className="partner-logo">AIR FRANCE CARGO</div>
          <div className="partner-logo">SF EXPRESS</div>
          <div className="partner-logo">CAINIAO</div>
          <div className="partner-logo">COSCO SHIPPING</div>
          <div className="partner-logo">UPS</div>
        </div>
      </div>

      {/* Zones */}
      <section className="zones" id="zones">
        <div className="section-tag">// Couverture mondiale</div>
        <h2>Nos principales <em style={{ color: 'var(--red)', fontStyle: 'normal' }}>destinations</em></h2>
        <div className="zones-grid">
          <div className="zone-card"><span className="zone-flag">🇫🇷</span><div className="zone-name">France</div><div className="zone-time">24 — 48h Express</div></div>
          <div className="zone-card"><span className="zone-flag">🇩🇪</span><div className="zone-name">Allemagne</div><div className="zone-time">24 — 72h Express</div></div>
          <div className="zone-card"><span className="zone-flag">🇺🇸</span><div className="zone-name">États-Unis</div><div className="zone-time">48 — 72h Express</div></div>
          <div className="zone-card"><span className="zone-flag">🇬🇧</span><div className="zone-name">Royaume-Uni</div><div className="zone-time">24 — 48h Express</div></div>
          <div className="zone-card"><span className="zone-flag">🇯🇵</span><div className="zone-name">Japon</div><div className="zone-time">12 — 24h Express</div></div>
          <div className="zone-card"><span className="zone-flag">🇦🇪</span><div className="zone-name">Émirats Arabes</div><div className="zone-time">24 — 48h Express</div></div>
          <div className="zone-card"><span className="zone-flag">🇨🇦</span><div className="zone-name">Canada</div><div className="zone-time">48 — 96h Express</div></div>
          <div className="zone-card"><span className="zone-flag">🇦🇺</span><div className="zone-name">Australie</div><div className="zone-time">48 — 96h Express</div></div>
          <div className="zone-card"><span className="zone-flag">🇧🇷</span><div className="zone-name">Brésil</div><div className="zone-time">72 — 96h Express</div></div>
          <div className="zone-card"><span className="zone-flag">🇸🇬</span><div className="zone-name">Singapour</div><div className="zone-time">24 — 48h Express</div></div>
          <div className="zone-card"><span className="zone-flag">🇿🇦</span><div className="zone-name">Afrique du Sud</div><div className="zone-time">72 — 120h Express</div></div>
          <div className="zone-card" style={{ background: 'rgba(232,0,29,.05)', borderColor: 'rgba(232,0,29,.2)' }}><span className="zone-flag">🌐</span><div className="zone-name">+170 Pays</div><div className="zone-time" style={{ color: 'var(--red)' }}>Voir toutes zones →</div></div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq" id="faq">
        <div className="faq-bg"></div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="section-tag">// Questions fréquentes</div>
          <h2>Tout ce que vous devez <em style={{ color: 'var(--red)', fontStyle: 'normal' }}>savoir</em></h2>
          <div className="faq-grid">
            <div className="faq-item">
              <div className="faq-q" onClick={toggleFaq}>Comment calculer le poids volumétrique ? <div className="faq-icon">+</div></div>
              <div className="faq-a">Le poids volumétrique se calcule ainsi : (L × l × H en cm) ÷ 5000. Si ce poids est supérieur au poids réel, c'est lui qui est retenu. Notre calculateur en ligne le fait automatiquement.</div>
            </div>
            <div className="faq-item">
              <div className="faq-q" onClick={toggleFaq}>Quels types de marchandises acceptez-vous ? <div className="faq-icon">+</div></div>
              <div className="faq-a">Nous acceptons la majorité des marchandises commerciales : électronique, textile, accessoires, pièces industrielles... Certains produits réglementés nécessitent une déclaration spéciale. Contactez-nous.</div>
            </div>
            <div className="faq-item">
              <div className="faq-q" onClick={toggleFaq}>Que se passe-t-il si mon colis est perdu ou endommagé ? <div className="faq-icon">+</div></div>
              <div className="faq-a">Notre assurance tous risques couvre la valeur déclarée. En cas de sinistre, notre service client traite votre réclamation sous 48h et le remboursement est effectué sous 5 jours ouvrés.</div>
            </div>
            <div className="faq-item">
              <div className="faq-q" onClick={toggleFaq}>Prenez-vous en charge le dédouanement à l'arrivée ? <div className="faq-icon">+</div></div>
              <div className="faq-a">Oui. Avec l'offre DDP (Delivered Duty Paid), taxes et droits de douane sont inclus dans votre tarif. Zéro surprise à la réception.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="newsletter-inner">
          <div className="section-tag" style={{ textAlign: 'center' }}>// Restez informé</div>
          <h2>Offres exclusives &<br/>actualités logistiques</h2>
          <p>Recevez nos meilleures offres, les mises à jour tarifaires et nos conseils pour optimiser vos imports depuis la Chine.</p>
          <div className="newsletter-form">
            <input type="email" className="newsletter-input" placeholder="votre@email.com" />
            <button className="newsletter-btn">S'abonner →</button>
          </div>
          <p style={{ fontSize: '.72rem', color: 'rgba(100,116,139,0.5)', marginTop: '12px', fontFamily: "'Rajdhani', sans-serif", letterSpacing: '1px' }}>Désabonnement possible à tout moment · Politique de confidentialité</p>
        </div>
      </section>

      {/* CTA Final */}
      <div className="cta-section" id="contact">
        <div className="cta-bg-img"></div>
        <div className="cta-bg-overlay"></div>
        <div className="corner-tl"></div>
        <div className="corner-br"></div>
        <div className="cta-inner">
          <div>
            <div className="section-tag">// Commencer maintenant</div>
            <div className="cta-title">Prêt à expédier<br/>depuis la <em style={{ fontStyle: 'normal', color: 'var(--red)' }}>Chine</em> ?</div>
            <p className="cta-sub">Obtenez un devis personnalisé en 2 minutes. Nos experts logistiques vous accompagnent à chaque étape — de Shanghai jusqu'à votre porte.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flexShrink: 0 }}>
            <a href="#" className="btn-primary" style={{ textAlign: 'center' }}>Obtenir un devis gratuit →</a>
            <a href="#" className="btn-secondary" style={{ textAlign: 'center' }}>📞 Parler à un expert</a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
