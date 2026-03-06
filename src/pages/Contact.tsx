import { Mail, Phone, MapPin, Clock, ArrowRight, Send } from 'lucide-react';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { Link } from 'react-router-dom';
import { getSiteName } from '../utils/siteConfig';

export default function Contact() {
  const { settings } = useSiteSettings();
  const siteName = getSiteName();

  return (
    <div className="min-h-screen" style={{ background: 'var(--dark)', color: 'var(--text)' }}>
      <SEO 
        title={`Contact - ${siteName} | Partenaire Logistique Mondial`}
        description={`Contactez ${siteName} pour vos besoins de transport international. Obtenez un devis gratuit pour vos solutions de fret maritime, aérien et terrestre.`}
        keywords={`contact ${siteName}, devis logistique, contact expédition, transitaire chine`}
        canonical="https://chinecargologis.com/contact"
      />
      <Header />

      {/* HERO SECTION - SUBPAGE STYLE */}
      <section className="hero" style={{ minHeight: '60vh' }}>
        <div className="hero-img-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1800&q=80')" }}></div>
        <div className="hero-overlay"></div>
        <div className="hero-overlay2"></div>
        
        <div className="hero-content">
          <div className="hero-badge">Support 24/7</div>
          <h1 className="animate-fade-in-up">
            Parlons de votre <em>Projet</em>
          </h1>
          <p className="hero-sub animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Prêt à optimiser votre chaîne d'approvisionnement ? Notre équipe est là pour répondre à vos questions et vous proposer des solutions sur mesure.
          </p>
          
          <div className="flex items-center gap-3 text-sm font-medium text-gray-500 mt-8">
            <Link to="/" className="hover:text-red-600 transition-colors font-semibold">Accueil</Link>
            <ArrowRight size={14} />
            <span className="text-red-500 font-semibold">Contact</span>
          </div>
        </div>
      </section>

      {/* CONTACT INFO & FORM */}
      <section className="how py-24" style={{ background: 'var(--darker)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16 animate-reveal">
            <div className="section-tag">Contactez-nous</div>
            <h2 className="text-gray-900 mb-6">Nous apprécions vos commentaires et questions</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {siteName} est un fournisseur mondial de solutions de transport et de logistique.
              Contactez-nous pour toute demande de renseignements ou pour demander un devis pour vos besoins d'expédition.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <h3 className="section-tag">Coordonnées</h3>
              
              <div className="grid grid-cols-1 gap-4">
                {[
                  settings?.site_address ? { icon: <MapPin size={22} />, title: "Notre Emplacement", value: settings.site_address } : null,
                  settings?.site_phone ? { icon: <Phone size={22} />, title: "Numéro de Téléphone", value: settings.site_phone } : null,
                  settings?.site_email ? { icon: <Mail size={22} />, title: "Adresse E-mail", value: settings.site_email } : null,
                ].filter(Boolean).map((item, i) => (
                  <div key={i} className="bg-white border border-gray-100 shadow-lg rounded-xl p-6 group" style={{ cursor: 'default' }}>
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                        {item!.icon}
                      </div>
                      <div>
                        <div className="stat-label mb-1" style={{ textAlign: 'left' }}>{item!.title}</div>
                        <div className="text-gray-900 font-bold">{item!.value}</div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="bg-white border border-gray-100 shadow-lg rounded-xl p-6 group" style={{ cursor: 'default' }}>
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                      <Clock size={22} />
                    </div>
                    <div>
                      <div className="stat-label mb-1" style={{ textAlign: 'left' }}>Heures d'ouverture</div>
                      <div className="text-gray-900 font-bold space-y-1">
                        <div className="text-sm font-semibold">Lundi - Vendredi: 9h00 - 18h00</div>
                        <div className="text-sm font-semibold">Samedi: 9h00 - 13h00</div>
                        <div className="text-sm text-red-600 font-bold">Dimanche: Fermé</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden">
              <div className="p-8 lg:p-10">
                <h3 className="section-tag mb-6">Envoyez-nous un message</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="stat-label mb-2 block font-bold text-gray-500" style={{ textAlign: 'left' }}>Votre Nom *</label>
                      <input
                        type="text"
                        placeholder="Nom complet"
                        className="w-full p-4 border border-gray-100 rounded-xl bg-gray-50 focus:border-red-600 focus:bg-white transition-all outline-none text-gray-900 font-medium"
                        required
                      />
                    </div>
                    <div>
                      <label className="stat-label mb-2 block font-bold text-gray-500" style={{ textAlign: 'left' }}>Votre Email *</label>
                      <input
                        type="email"
                        placeholder="Adresse e-mail"
                        className="w-full p-4 border border-gray-100 rounded-xl bg-gray-50 focus:border-red-600 focus:bg-white transition-all outline-none text-gray-900 font-medium"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="stat-label mb-2 block font-bold text-gray-500" style={{ textAlign: 'left' }}>Sujet *</label>
                    <input
                      type="text"
                      placeholder="Objet de votre demande"
                      className="w-full p-4 border border-gray-100 rounded-xl bg-gray-50 focus:border-red-600 focus:bg-white transition-all outline-none text-gray-900 font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="stat-label mb-2 block font-bold text-gray-500" style={{ textAlign: 'left' }}>Votre Message *</label>
                    <textarea
                      placeholder="Comment pouvons-nous vous aider ?"
                      rows={5}
                      className="w-full p-4 border border-gray-100 rounded-xl bg-gray-50 focus:border-red-600 focus:bg-white transition-all outline-none text-gray-900 font-medium resize-none"
                      required
                    ></textarea>
                  </div>
                  <button className="btn-primary w-full flex items-center justify-center gap-2 py-5 text-lg">
                    Envoyer le Message <Send size={18} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="partners py-24" style={{ background: 'var(--dark)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Processus d'expédition fluide</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Demande de devis", desc: "Remplissez notre formulaire de contact avec vos détails d'expédition pour commencer." },
                { step: "02", title: "Solution sur mesure", desc: "Recevez un plan d'expédition personnalisé et des tarifs compétitifs de nos experts." },
                { step: "03", title: "Expédier et suivre", desc: "Nous gérons la logistique pendant que vous suivez votre expédition en temps réel." }
              ].map((item, i) => (
                <div key={i} className="bg-white border border-gray-100 shadow-xl rounded-2xl group overflow-hidden" style={{ cursor: 'default' }}>
                  <div className="p-8">
                    <div className="text-4xl font-black text-red-600/5 mb-2">{item.step}</div>
                    <div className="text-xl font-bold text-red-600 mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>{item.title}</div>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION - SHARED DESIGN */}
      <section className="cta-section">
        <div className="cta-bg-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=70')" }}></div>
        <div className="cta-bg-overlay"></div>
        <div className="cta-inner">
            <div className="corner-tl"></div>
            <div className="corner-br"></div>
            <div>
                <h2 className="cta-title">Prêt à expédier votre cargaison ?</h2>
                <p className="cta-sub">Contactez-nous dès aujourd'hui et obtenez un devis gratuit pour vos besoins d'expédition internationale.</p>
            </div>
            <div className="flex gap-4">
              {settings?.site_phone && (
                <a href={`tel:${settings.site_phone}`} className="btn-secondary">Appelez-nous</a>
              )}
              {settings?.site_email && (
                <a href={`mailto:${settings.site_email}`} className="btn-primary">Envoyer un Email</a>
              )}
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

