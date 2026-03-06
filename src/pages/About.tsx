import { Shield, Clock, Globe, Users, ChevronRight, Target, Award } from 'lucide-react';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CounterAnimation from '../components/CounterAnimation';
import { Link } from 'react-router-dom';
import { useSiteSettings } from '../hooks/useSiteSettings';

export default function About() {
  const { settings } = useSiteSettings();
  const companyName = settings?.company_name || 'Chine Cargo Logis';

  return (
    <div className="min-h-screen" style={{ background: 'var(--dark)', color: 'var(--text)' }}>
      <SEO 
        title={`À Propos - ${companyName} | Logistique Globale`}
        description={`Découvrez ${companyName}, votre partenaire de confiance pour le transport international Chine → Monde. Excellence et fiabilité.`}
        keywords={`propos ${companyName}, logistique chine, transport international, partenaire transport`}
        canonical="https://chinecargologis.com/about"
      />
      <Header />

      {/* HERO SECTION - SUBPAGE STYLE */}
      <section className="hero" style={{ minHeight: '60vh' }}>
        <div className="hero-img-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1800&q=80')" }}></div>
        <div className="hero-overlay"></div>
        <div className="hero-overlay2"></div>
        
        <div className="hero-content">
          <div className="hero-badge">Notre Histoire</div>
          <h1 className="animate-fade-in-up">
            L'Excellence en <em>Mouvement</em>
          </h1>
          <p className="hero-sub animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Depuis 1963, nous sommes le pont reliant les entreprises au monde entier. 
            L'efficacité, la sécurité et la fiabilité sont les piliers de notre héritage.
          </p>
          
          <div className="flex items-center gap-3 text-sm font-medium text-gray-500 mt-8">
            <Link to="/" className="hover:text-red-600 transition-colors font-semibold">Accueil</Link>
            <ChevronRight size={14} />
            <span className="text-red-600 font-semibold">À Propos</span>
          </div>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="how py-24" style={{ background: 'var(--darker)' }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-amber-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070" 
                alt="Notre Mission" 
                className="rounded-2xl shadow-2xl relative z-10" 
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 border border-gray-100 shadow-xl rounded-lg z-20 hidden md:block">
                <p className="stat-value text-red-600">100<span>%</span></p>
                <p className="stat-label text-gray-500">Engagement Sécurité</p>
              </div>
            </div>
            
            <div className="animate-reveal">
              <div className="section-tag">Qui sommes-nous</div>
              <h2 className="text-gray-900 mb-6">L'Excellence dans chaque expédition</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Chine Cargo Logis n'est pas seulement une entreprise de logistique ; nous sommes votre partenaire stratégique de croissance. 
                Avec une présence dans plus de 200 pays, nous exploitons des technologies de pointe et un vaste réseau pour simplifier les chaînes d'approvisionnement complexes.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-10">
                Notre mission est de fournir des solutions de transport fluides, transparentes et efficaces qui permettent aux entreprises de se développer sans frontières.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-100 shadow-lg rounded-xl p-6" style={{ cursor: 'default' }}>
                  <div className="flex items-center gap-4 mb-3">
                    <Shield className="text-red-600" size={24} />
                    <h4 className="font-bold text-gray-900">Fret Sécurisé</h4>
                  </div>
                  <p className="text-sm text-gray-500">Couverture d'assurance complète pour chaque colis.</p>
                </div>
                <div className="bg-white border border-gray-100 shadow-lg rounded-xl p-6" style={{ cursor: 'default' }}>
                  <div className="flex items-center gap-4 mb-3">
                    <Clock className="text-red-600" size={24} />
                    <h4 className="font-bold text-gray-900">Livraison Ponctuelle</h4>
                  </div>
                  <p className="text-sm text-gray-500">Respect rigoureux des délais de livraison garantis.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATISTICS - REDESIGNED */}
      <section className="stats-bar py-20 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-y-12 gap-x-8 lg:gap-x-0">
            {[
              { label: "Années d'Expérience", value: 61, suffix: "+" },
              { label: "Experts Logistique", value: 2500, suffix: "+" },
              { label: "Couverture Globale", value: 79, suffix: "%" },
              { label: "Pays Desservis", value: 207, suffix: "+" },
              { label: "Clients Corporate", value: 186, suffix: "+" },
              { label: "Véhicules Propres", value: 450, suffix: "+" }
            ].map((stat, i, arr) => (
              <div key={i} className={`stat-item text-center px-4 ${i % 2 === 0 && i !== arr.length - 1 ? 'border-r-0 md:border-r border-gray-100' : ''} ${i % 3 === 2 ? 'lg:border-r-0' : 'lg:border-r'} xl:${i === arr.length - 1 ? 'border-r-0' : 'border-r'}`}>
                <div className="stat-value justify-center mb-2">
                  <CounterAnimation end={stat.value} duration={2000} suffix={stat.suffix} decimals={stat.label === "Années d'Expérience" ? 0 : 0} />
                </div>
                <div className="stat-label max-w-[120px] mx-auto leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="how py-24" style={{ background: 'var(--dark)' }}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="section-tag">Valeurs fondamentales</div>
            <h2 className="text-gray-900 mb-4">Construit sur la Confiance et la Performance</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { title: "Réseau Global", desc: "Des opérations s'étendant sur plus de 207 pays offrant une expédition sans faille.", icon: <Globe size={28} /> },
              { title: "Équipe d'Experts", desc: "Plus de 2500 professionnels apportant des décennies d'expertise logistique.", icon: <Users size={28} /> },
              { title: "Technologie Avancée", desc: "Suivi IA en temps réel et systèmes automatisés garantissant la transparence.", icon: <Target size={28} /> },
              { title: "Succès Client", desc: "Des gestionnaires de compte dédiés s'assurant que vos besoins uniques sont satisfaits.", icon: <Award size={28} /> }
            ].map((item, i) => (
              <div key={i} className="bg-white border border-gray-100 shadow-xl rounded-2xl p-10 group transition-all hover:-translate-y-2" style={{ cursor: 'default' }}>
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-red-50 text-red-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h4>
                    <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

