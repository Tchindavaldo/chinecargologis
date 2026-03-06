import { FileText, ShieldCheck, Lock, Globe, Scale, Phone, Mail, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--dark)', color: 'var(--text)' }}>
      <SEO
        title="Conditions Générales - Chine Cargo Logis"
        description="Consultez les conditions générales d'utilisation et de services de Chine Cargo Logis. Transparence, conformité et responsabilités." 
        keywords="conditions générales, termes et conditions, china delivery express, politique d'utilisation"
        canonical="https://chinecargologis.com/terms"
      />
      <Header />

      {/* HERO SECTION */}
      <section className="hero" style={{ minHeight: '50vh' }}>
        <div className="hero-img-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1505839673365-e3971f8d9184?q=80&w=2100')" }}></div>
        <div className="hero-overlay"></div>
        <div className="hero-overlay2"></div>
        
        <div className="hero-content">
          <div className="hero-badge">⚖ Juridique</div>
          <h1 className="animate-fade-in-up">
            Termes & <em>Conditions</em>
          </h1>
          <p className="hero-sub animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Transparence, conformité et cadre légal de nos services logistiques mondiaux.
          </p>
          
          <div className="flex items-center gap-3 text-sm font-medium text-gray-500 mt-8">
            <Link to="/" className="hover:text-red-600 transition-colors font-semibold">Accueil</Link>
            <ChevronRight size={14} />
            <span className="text-red-500 font-semibold">Conditions Générales</span>
          </div>
        </div>
      </section>

      <main className="py-24" style={{ background: 'var(--darker)' }}>
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Key Principles */}
          <section className="mb-24 animate-reveal">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-10 border border-gray-100 shadow-xl rounded-2xl">
                <ShieldCheck className="text-red-600 mb-6" size={42} />
                <h2 className="text-xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'Orbitron, sans-serif' }}>Confiance</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Nous nous engageons à fournir des informations claires sur nos services, tarifs et délais afin de garantir une relation durable.
                </p>
              </div>
              <div className="bg-white p-10 border border-gray-100 shadow-xl rounded-2xl">
                <Lock className="text-red-600 mb-6" size={42} />
                <h2 className="text-xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'Orbitron, sans-serif' }}>Sécurité</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Toutes les données sont traitées conformément au RGPD et utilisées uniquement pour la gestion de vos expéditions mondiales.
                </p>
              </div>
              <div className="bg-white p-10 border border-gray-100 shadow-xl rounded-2xl">
                <Globe className="text-red-600 mb-6" size={42} />
                <h2 className="text-xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'Orbitron, sans-serif' }}>Globalité</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Nos services couvrent plus de 180 pays avec des standards de qualité uniformes et des partenaires certifiés.
                </p>
              </div>
            </div>
          </section>

          {/* Legal Articles */}
          <section className="space-y-12">
            {[
              {
                icon: <Scale className="text-red-600" size={32} />,
                title: "1. Acceptation des Conditions",
                subtitle: "Application à tous les utilisateurs de Chine Cargo Logis",
                content: "En accédant à notre plateforme ou en utilisant nos services, vous acceptez pleinement ces conditions générales. Si vous n'êtes pas d'accord, veuillez ne pas utiliser nos services.",
                list: [
                  "Les conditions peuvent être mises à jour sans préavis.",
                  "Les clients professionnels peuvent signer un contrat spécifique.",
                  "La version française des conditions fait foi en cas de litige."
                ]
              },
              {
                icon: <FileText className="text-red-600" size={32} />,
                title: "2. Prestations Logistiques",
                subtitle: "Description des services logistiques fournis",
                content: "Chine Cargo Logis offre des services de transport international, de dédouanement et de stockage. Chaque prestation est encadrée par des procédures certifiées.",
                list: [
                  "Les délais sont donnés à titre indicatif selon les formalités douanières.",
                  "Les marchandises prohibées nécessitent une validation préalable.",
                  "Des assurances complémentaires sont proposées sur demande."
                ]
              },
              {
                icon: <Lock className="text-red-600" size={32} />,
                title: "3. Confidentialité & Données",
                subtitle: "Traitement sécurisé des informations",
                content: "Nous limitons la collecte des données aux informations nécessaires au traitement et à la conformité légale de vos envois internationaux.",
                list: [
                  "Conformité totale au RGPD.",
                  "Accès restreint aux données par le personnel habilité.",
                  "Droits de modification et de suppression sur simple demande."
                ]
              },
              {
                icon: <Globe className="text-red-600" size={32} />,
                title: "4. Responsabilités",
                subtitle: "Engagements et limites de responsabilité",
                content: "Notre responsabilité est limitée conformément aux conventions internationales de transport en vigueur.",
                list: [
                  "Exactitude impérative des informations fournies par le client.",
                  "Tentative de résolution amiable privilégiée en cas de litige.",
                  "Compétence exclusive des tribunaux du siège social."
                ]
              }
            ].map((article, idx) => (
              <article key={idx} className="bg-white border border-gray-100 shadow-xl rounded-2xl p-10 animate-reveal" style={{ animationDelay: `${idx * 0.1}s` }}>
                <header className="flex items-center gap-6 mb-8">
                  <div className="w-14 h-14 bg-red-50 flex items-center justify-center border border-red-100 rounded-xl">
                    {article.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>{article.title}</h3>
                    <p className="text-red-600 text-xs font-bold tracking-widest uppercase" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{article.subtitle}</p>
                  </div>
                </header>
                <div className="space-y-6">
                  <p className="text-gray-600 leading-relaxed text-lg font-medium">{article.content}</p>
                  <ul className="space-y-3">
                    {article.list.map((item, i) => (
                      <li key={i} className="flex items-start gap-4 text-gray-500 text-sm font-medium">
                        <span className="text-red-600 font-bold mt-1">▶</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </section>

          {/* Contact Support */}
          <section className="mt-24 bg-white p-12 border border-gray-100 shadow-2xl rounded-3xl animate-reveal">
            <h3 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>Contact & Support Juridique</h3>
            <p className="text-gray-500 mb-10 leading-relaxed text-lg">
              Pour toute question relative à ces conditions ou pour exercer vos droits, notre équipe juridique est à votre disposition.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center gap-5 bg-gray-50 p-6 border border-gray-100 rounded-2xl hover:border-red-600 transition-all group">
                <div className="w-12 h-12 bg-red-50 flex items-center justify-center border border-red-100 rounded-xl group-hover:bg-red-600 group-hover:text-white transition-all">
                  <Phone size={20} className="text-red-600 group-hover:text-white" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Service Client</div>
                  <a href="tel:+33100000000" className="text-lg font-bold text-gray-900 hover:text-red-600 transition-all font-orbit">
                    +33 1 XX XX XX XX
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-5 bg-gray-50 p-6 border border-gray-100 rounded-2xl hover:border-red-600 transition-all group">
                <div className="w-12 h-12 bg-red-50 flex items-center justify-center border border-red-100 rounded-xl group-hover:bg-red-600 group-hover:text-white transition-all">
                  <Mail size={20} className="text-red-600 group-hover:text-white" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Assistance Email</div>
                  <a href="mailto:contact@chinadx.fr" className="text-lg font-bold text-gray-900 hover:text-red-600 transition-all font-orbit">
                    contact@chinadx.fr
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

