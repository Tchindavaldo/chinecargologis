import { Plane, Ship, PackageCheck, Warehouse, Zap, MapPin, ArrowRight, ShieldCheck, Clock, Globe } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { getSiteName } from '../utils/siteConfig';

export default function Services() {
  const siteName = getSiteName();

  return (
    <div className="min-h-screen" style={{ background: 'var(--dark)', color: 'var(--text)' }}>
      <SEO title={`Nos Services - ${siteName}`} description="Découvrez nos solutions logistiques complètes : Fret Maritime, Fret Aérien, et services de courrier personnalisés." />
      <Header />

      {/* HERO SECTION - SUBPAGE STYLE */}
      <section className="hero" style={{ minHeight: '60vh' }}>
        <div className="hero-img-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?q=80&w=2065')" }}></div>
        <div className="hero-overlay"></div>
        <div className="hero-overlay2"></div>
        
        <div className="hero-content">
          <div className="hero-badge">Expertise Logistique</div>
          <h1 className="animate-fade-in-up">
            Nos <em>Services</em>
          </h1>
          <p className="hero-sub animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Des solutions logistiques sur mesure conçues pour faire progresser votre entreprise. 
            Du fret maritime à la livraison du dernier kilomètre, nous gérons tout avec précision.
          </p>
          
          <div className="flex items-center gap-3 text-sm font-medium text-gray-500 mt-8">
            <Link to="/" className="hover:text-red-600 transition-colors font-semibold">Accueil</Link>
            <ArrowRight size={14} />
            <span className="text-red-500 font-semibold">Services</span>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="how py-24" style={{ background: 'var(--darker)' }}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20 animate-reveal">
            <div className="section-tag">Notre Expertise</div>
            <h2 className="text-gray-900 mb-6">Solutions Logistiques de Classe Mondiale</h2>
            <p className="text-gray-600 text-lg">
              Nous offrons une suite complète de services d'expédition et de logistique. 
              Que vous ayez besoin de rapidité, de rentabilité ou d'une manipulation spécialisée, nous avons la solution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Fret Maritime",
                icon: <Ship size={40} />,
                desc: "Transport rentable pour de grandes quantités de marchandises à l'échelle internationale via des navires de charge.",
                features: ["Expéditions FCL & LCL", "Service porte-à-porte", "Dédouanement"]
              },
              {
                title: "Fret Aérien",
                icon: <Plane size={40} />,
                desc: "La méthode la plus rapide pour l'expédition internationale, idéale pour les cargaisons urgentes et de haute valeur.",
                features: ["Options Express & Standard", "Suivi en temps réel", "Traitement prioritaire"]
              },
              {
                title: "Services de Courrier",
                icon: <PackageCheck size={40} />,
                desc: "Livraison rapide et fiable de colis et documents pour les entreprises et les particuliers.",
                features: ["Livraison le jour même", "Expédition de documents", "Ramassage express"]
              },
              {
                title: "Services d'Entreposage",
                icon: <Warehouse size={40} />,
                desc: "Solutions de stockage temporaires et à long terme sécurisées avec des installations climatisées.",
                features: ["Contrôle climatique", "Sécurité 24/7", "Gestion d'inventaire"]
              },
              {
                title: "Fret Rapide",
                icon: <Zap size={40} />,
                desc: "Services de livraison accélérés pour les expéditions urgentes nécessitant un transit rapide.",
                features: ["Délais de livraison garantis", "Douane prioritaire", "Support dédié"]
              },
              {
                title: "Suivi de Cargaison",
                icon: <MapPin size={40} />,
                desc: "Système de surveillance des expéditions en temps réel pour gérer vos opérations logistiques.",
                features: ["Mises à jour en direct", "Notifications SMS", "Rapports détaillés"]
              }
            ].map((service, index) => (
              <div key={index} className="bg-white border border-gray-100 shadow-xl rounded-2xl group transition-all hover:-translate-y-2 overflow-hidden">
                <div className="p-10">
                   <div className="text-6xl font-black text-red-600/5 mb-4 select-none">0{index + 1}</div>
                   <div className="text-red-600 mb-6 group-hover:scale-110 transition-transform duration-500 inline-block bg-red-50 p-4 rounded-2xl">
                     {service.icon}
                   </div>
                   <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>{service.title}</h3>
                   <p className="text-gray-500 mb-6 leading-relaxed">
                     {service.desc}
                   </p>
                   
                   <ul className="space-y-3 mb-8">
                     {service.features.map((feature, i) => (
                       <li key={i} className="flex items-center text-sm text-gray-400 font-semibold">
                         <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3" />
                         {feature}
                       </li>
                     ))}
                   </ul>
                   
                   <Link to="/contact" className="btn-secondary w-full text-center flex items-center justify-center gap-2 transform group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 transition-all duration-300">
                      Demander un devis <ArrowRight size={18} />
                   </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION */}
      <section className="partners py-24" style={{ background: 'var(--dark)' }}>
        <div className="container mx-auto px-4">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                 {[
                     { icon: <ShieldCheck size={32} />, title: "Manipulation Sécurisée", desc: "Votre cargaison est assurée et manipulée avec le plus grand soin tout au long du voyage." },
                     { icon: <Clock size={32} />, title: "Livraison à Temps", desc: "Nous valorisons votre temps. Nos itinéraires optimisés garantissent le respect des délais." },
                     { icon: <Globe size={32} />, title: "Réseau Global", desc: "Avec des partenaires dans plus de 207 pays, nous vous connectons à chaque coin du monde." }
                 ].map((item, i) => (
                     <div key={i} className="flex gap-6 items-start animate-reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                         <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-red-600 shrink-0 shadow-2xl border border-gray-100">
                             {item.icon}
                         </div>
                         <div>
                             <h4 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{item.title}</h4>
                             <p className="text-gray-500 leading-relaxed text-sm font-medium">{item.desc}</p>
                         </div>
                     </div>
                 ))}
             </div>
        </div>
      </section>

      {/* CTA SECTION - REDESIGNED */}
      <section className="cta-section">
        <div className="cta-bg-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1600&q=70')" }}></div>
        <div className="cta-bg-overlay"></div>
        <div className="cta-inner">
            <div className="corner-tl"></div>
            <div className="corner-br"></div>
            <div>
                <h2 className="cta-title">Besoin d'une Solution Personnalisée ?</h2>
                <p className="cta-sub">Chaque entreprise a des besoins logistiques uniques. Notre équipe est prête à concevoir une solution d'expédition sur mesure qui répond à vos exigences et à votre budget.</p>
            </div>
            <Link to="/contact" className="btn-primary">
              Contacter notre équipe
            </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

