import { ChevronRight, MapPin, Target, Send } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CounterAnimation from '../components/CounterAnimation';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

export default function Network() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--dark)', color: 'var(--text)' }}>
      <SEO 
        title="Notre Réseau - Chine Cargo Logis | Présence Mondiale"
        description="Explorez le réseau logistique mondial de Chine Cargo Logis. Plus de 200 pays desservis par nos hubs stratégiques de Shanghai à Rotterdam."
        keywords="réseau logistique, hubs mondiaux, transport international chine, logistique globale"
        canonical="https://chinecargologis.com/network"
      />
      <Header />

      {/* HERO SECTION - SUBPAGE STYLE */}
      <section className="hero" style={{ minHeight: '60vh' }}>
        <div className="hero-img-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')" }}></div>
        <div className="hero-overlay"></div>
        <div className="hero-overlay2"></div>
        
        <div className="hero-content">
          <div className="hero-badge">🌐 Réseau Mondial</div>
          <h1 className="animate-fade-in-up">
            Présence <em>Globale</em>
          </h1>
          <p className="hero-sub animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Couvrant plus de 200 pays, notre réseau logistique garantit que votre cargaison atteint n'importe quelle destination avec rapidité et sécurité.
          </p>
          
          <div className="flex items-center gap-3 text-sm font-medium text-gray-500 mt-8">
            <Link to="/" className="hover:text-red-600 transition-colors font-semibold">Accueil</Link>
            <ChevronRight size={14} />
            <span className="text-red-500 font-semibold">Réseau</span>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <div className="stats-bar">
        {[
          { label: "Pays Desservis", value: 207, suffix: "+" },
          { label: "Bureaux Mondiaux", value: 450, suffix: "" },
          { label: "Professionnels", value: 2500, suffix: "+" },
          { label: "Satisfaction", value: 98, suffix: "%" }
        ].map((stat, i) => (
          <div key={i} className="stat-item">
            <div className="stat-value">
              <CounterAnimation end={stat.value} duration={2000} suffix={stat.suffix} />
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* REGIONAL COVERAGE */}
      <section className="how py-24" style={{ background: 'var(--darker)' }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div className="animate-reveal">
               <div className="section-tag">// Portée Mondiale</div>
               <h2 className="text-gray-900 mb-6">Des Opérations à Travers <em style={{ color: 'var(--red)', fontStyle: 'normal' }}>les Continents</em></h2>
               <p className="text-gray-600 text-lg leading-relaxed mb-8">
                 Nous avons établi des hubs stratégiques sur les principaux marchés mondiaux pour faciliter un commerce fluide. 
                 Notre expertise locale combinée aux normes mondiales garantit l'efficacité partout.
               </p>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {[
                   'Amérique du Nord & Sud',
                   'Europe & Moyen-Orient',
                   'Asie-Pacifique',
                   'Afrique'
                 ].map((region, i) => (
                   <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                     <span className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">{i + 1}</span>
                     <span className="text-gray-900 font-semibold">{region}</span>
                   </div>
                 ))}
               </div>
             </div>
             <div className="relative animate-reveal" style={{ animationDelay: '0.3s' }}>
                <div className="absolute inset-0 bg-red-600/5 rounded-full blur-3xl transform scale-75" />
                <div className="bg-white p-2 rounded-2xl shadow-2xl border border-gray-100">
                  <img 
                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2050" 
                    alt="World Map Connection" 
                    className="w-full rounded-xl transition-all duration-700" 
                  />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* STRATEGIC HUBS GRID */}
      <section className="services py-24" style={{ background: 'var(--dark)' }}>
        <div className="container mx-auto px-4 text-center">
            <div className="section-tag">// Hubs Stratégiques</div>
            <h2 className="text-gray-900 mb-16">Nos Principaux <em style={{ color: 'var(--red)', fontStyle: 'normal' }}>Centres Opérationnels</em></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { city: "Shanghai, Chine", address: "2588 Pudong Ave, Pudong", phone: "+86 21 6888 8888", type: "Hub Asie" },
                { city: "Rotterdam, Pays-Bas", address: "Maasvlakte 2, 3011 Rotterdam", phone: "+31 10 123 4567", type: "Hub Europe" },
                { city: "Los Angeles, USA", address: "1000 W Seaside Ave, Long Beach", phone: "+1 562 123 4567", type: "Hub Amérique" },
                { city: "Dubai, EAU", address: "Jebel Ali Free Zone", phone: "+971 4 123 4567", type: "Hub Moyen-Orient" },
                { city: "Singapour", address: "10 Pasir Panjang Rd", phone: "+65 6123 4567", type: "Hub ASEAN" },
                { city: "Hambourg, Allemagne", address: "HafenCity, 20457 Hambourg", phone: "+49 40 1234 5678", type: "Hub Logistique" }
              ].map((office, i) => (
                <div key={i} className="bg-white border border-gray-100 shadow-lg rounded-2xl group transition-all hover:-translate-y-2 text-left">
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="stat-label text-red-600 mb-1" style={{ textAlign: 'left' }}>{office.type}</div>
                        <h4 className="text-2xl font-bold text-gray-900 group-hover:text-red-600 transition-colors" style={{ fontFamily: 'Orbitron, sans-serif' }}>{office.city}</h4>
                      </div>
                      <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center border border-red-100">
                        <MapPin className="text-red-600" size={24} />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                         <Target size={16} className="text-gray-400 mt-1" />
                         <p className="text-gray-500 text-sm">{office.address}</p>
                      </div>
                      <div className="flex items-center gap-3">
                         <Send size={16} className="text-gray-400" />
                         <p className="text-gray-900 font-bold">{office.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <div className="cta-section">
        <div className="cta-bg-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1600&q=70')" }}></div>
        <div className="cta-bg-overlay"></div>
        <div className="corner-tl"></div>
        <div className="corner-br"></div>
        <div className="cta-inner">
          <div className="animate-reveal">
            <div className="section-tag">// Rejoignez notre réseau</div>
            <div className="cta-title">Étendez votre <em style={{ fontStyle: 'normal', color: 'var(--red)' }}>Business</em> mondialement</div>
            <p className="cta-sub">Bénéficiez de notre expertise et de nos infrastructures pour optimiser vos flux logistiques internationaux.</p>
          </div>
          <div className="flex flex-col gap-4 animate-reveal" style={{ animationDelay: '0.2s' }}>
            <Link to="/contact" className="btn-primary">Parlons de votre projet</Link>
            <Link to="/services" className="btn-secondary">Voir nos solutions</Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

