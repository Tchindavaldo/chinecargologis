import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Package, User, MapPin, Printer, ChevronRight } from 'lucide-react';
import QRCode from 'qrcode';
import { supabase } from '../lib/supabase';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

interface Insurance {
  name: string;
  amount: string;
  paid: boolean;
}

interface Shipment {
  tracking_number: string;
  status: string;
  origin: string;
  destination: string;
  carrier: string;
  carrier_reference: string;
  product: string;
  type_of_shipment: string;
  quantity: number;
  weight: string;
  payment_mode: string;
  shipment_mode: string;
  total_freight: string;
  expected_delivery_date: string;
  departure_date: string;
  departure_time: string;
  delivery_time: string;
  package_description: string;
  shipper_name: string;
  shipper_phone: string;
  shipper_email: string;
  shipper_address: string;
  receiver_name: string;
  receiver_phone: string;
  receiver_email: string;
  receiver_address: string;
  comment: string;
  image_url: string;
  insurances?: Insurance[];
  import_tax?: string;
  import_tax_paid?: boolean;
  status_date?: string;
  status_time?: string;
  tracking_progress?: number;
  tracking_stage?: string;
}

export default function Track() {
  const [searchParams] = useSearchParams();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  const generateQRCode = useCallback(async (trackingNumber: string) => {
    try {
      const trackingUrl = `${window.location.origin}/track?tracking=${trackingNumber}`;
      const qrCodeDataUrl = await QRCode.toDataURL(trackingUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: '#E8001D', // red
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(qrCodeDataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  }, []);

  const handleTrack = useCallback(async (e: React.FormEvent | null, initialTracking?: string) => {
    if (e) e.preventDefault();

    const tracking = initialTracking || trackingNumber.trim();
    if (!tracking) return;

    setLoading(true);
    setError('');
    setShipment(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('tolito_chinecargologis_shipments')
        .select('*')
        .eq('tracking_number', tracking)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (!data) {
        setError('Numéro de suivi non trouvé. Veuillez vérifier et réessayer.');
      } else {
        setShipment(data);
        generateQRCode(data.tracking_number);
      }
    } catch (err) {
      setError('Une erreur est survenue lors du suivi de votre expédition.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [trackingNumber, generateQRCode]);

  useEffect(() => {
    const initialTracking = searchParams.get('tracking');
    if (initialTracking) {
      setTrackingNumber(initialTracking);
      handleTrack(null, initialTracking);
    }
  }, [searchParams, handleTrack]);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--dark)', color: 'var(--text)' }}>
      <SEO 
        title="Suivi de Colis - Chine Cargo Logis | Temps Réel"
        description="Suivez vos expéditions en temps réel avec Chine Cargo Logis. Entrez votre numéro de suivi pour voir le statut et l'emplacement de votre colis."
        keywords="suivi, expédition, trajet, cargaison, logistique, livraison, temps réel"
        canonical="https://chinecargologis.com/track"
      />
      <Header />

      {/* HERO SECTION - SUBPAGE STYLE */}
      <section className="hero" style={{ minHeight: '55vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0b0f19' }}>
        <div className="hero-img-bg" style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1516939884455-1445c8652f83?w=1800&q=80')",
          opacity: 0.7,
          visibility: 'visible',
          zIndex: 1
        }}></div>
        <div className="hero-overlay" style={{ background: 'linear-gradient(to top, rgba(11, 15, 25, 0.95) 0%, rgba(11, 15, 25, 0.3) 100%)', zIndex: 2 }}></div>
        <div className="hero-overlay2" style={{ zIndex: 3 }}></div>
        
        <div className="hero-content text-center">
          <div className="hero-badge mx-auto">📍 Système Live</div>
          <h1 className="animate-fade-in-up" style={{ color: '#fff' }}>
            Suivi <em>Cargaison</em>
          </h1>
          <p className="hero-sub animate-fade-in-up mx-auto" style={{ animationDelay: '0.2s', color: 'rgba(255,255,255,0.9)' }}>
            Visibilité en temps réel pour vos expéditions mondiales. Gardez le contrôle sur chaque étape du trajet.
          </p>
          
          <div className="flex items-center justify-center gap-3 text-sm font-medium mt-8 text-gray-400">
            <Link to="/" className="hover:text-red-600 transition-colors font-semibold">Accueil</Link>
            <ChevronRight size={14} />
            <span className="text-red-500 font-semibold">Suivi</span>
          </div>
        </div>
      </section>

      {/* TRACKING INPUT AREA */}
      <section className="how py-16" style={{ background: 'var(--darker)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto -mt-32 relative z-20">
            <div className="bg-white p-1 shadow-2xl rounded-lg border border-gray-100">
              <div className="p-8 bg-white rounded-lg">
                <form onSubmit={(e) => handleTrack(e)} className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="N° de suivi (ex: CC-10-751490)"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      className="w-full p-5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 font-bold tracking-wider outline-none focus:border-red-600 transition-all placeholder:text-gray-400"
                    />
                    <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary whitespace-nowrap px-10 disabled:opacity-50"
                  >
                    {loading ? 'Recherche...' : 'Suivre maintenant'}
                  </button>
                </form>
                {error && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center font-bold">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RESULTS AREA */}
          {shipment ? (
            <div className="mt-16 animate-reveal">
              <div className="bg-white rounded-xl overflow-hidden shadow-2xl border border-gray-100">
                {/* Visual Tracking Progress Bar */}
                <div className="bg-white p-8 md:p-12 border-b border-gray-100">
                  <h3 className="section-tag mb-10 text-center">Progression de l'expédition</h3>
                  <div className="max-w-4xl mx-auto relative">
                    {/* Progress Bar Container */}
                    <div className="flex justify-between mb-8 relative z-10">
                      {[
                        { key: 'picked_up', icon: '📦', label: 'Collecté' },
                        { key: 'in_transit', icon: '🚚', label: 'En Transit' },
                        { key: 'customs', icon: '🛃', label: 'Douane' },
                        { key: 'out_for_delivery', icon: '🚛', label: 'En Livraison' },
                        { key: 'delivered', icon: '✅', label: 'Livré' }
                      ].map((stage, i, arr) => {
                        const stages = arr.map(s => s.key);
                        const currentIdx = stages.indexOf(shipment.tracking_stage || '');
                        const isDone = i <= currentIdx;
                        const isActive = i === currentIdx;
                        
                        return (
                          <div key={i} className="flex-1 flex flex-col items-center">
                            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-xl mb-3 shadow-lg transition-all duration-500 ${
                              isActive ? 'bg-red-600 text-white scale-125 z-20 ring-4 ring-red-100' : 
                              isDone ? 'bg-red-500 text-white z-10' : 'bg-gray-100 text-gray-400'
                            }`}>
                              {isDone && !isActive ? '✓' : stage.icon}
                            </div>
                            <div className={`text-[10px] md:text-xs font-black uppercase tracking-widest text-center ${
                              isDone ? 'text-red-600' : 'text-gray-400'
                            }`}>
                              {stage.label}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* The Line */}
                    <div className="absolute top-5 md:top-6 left-[10%] right-[10%] h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full bg-red-600 shadow-[0_0_15px_rgba(232,0,29,0.3)] transition-all duration-1000"
                        style={{ 
                          width: shipment.tracking_progress ? `${shipment.tracking_progress}%` : 
                                 shipment.tracking_stage ? `${(['picked_up', 'in_transit', 'customs', 'out_for_delivery', 'delivered'].indexOf(shipment.tracking_stage) / 4) * 100}%` : '0%' 
                        }}
                      ></div>
                    </div>
                    <div className="text-center mt-6 text-sm font-black text-red-600 tracking-widest uppercase">
                      {shipment.tracking_progress || 0}% COMPLÉTÉ
                    </div>
                  </div>
                </div>

                {/* Tracking Info Status Box */}
                <div className="bg-gray-50 p-8 md:p-12 border-b border-gray-100">
                  <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-red-600"></div>
                    <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
                      <div className="flex-1">
                        <div className="tracking-time-box mb-4">
                          <div className="text-2xl font-black text-gray-900 mb-1 tracking-tight">
                            {shipment.status_date ? formatDate(shipment.status_date) : 'N/A'}
                          </div>
                          <span className="text-sm font-bold text-gray-400 tracking-widest uppercase">{shipment.status_time || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-4 h-4 rounded-full bg-red-600 animate-pulse"></div>
                          <h4 className="text-2xl font-black italic tracking-tighter text-red-600 uppercase">{shipment.status}</h4>
                        </div>
                      </div>

                      {/* Insurances & Tax Info nested here like ref */}
                      <div className="w-full md:w-auto space-y-3 min-w-[300px]">
                        {shipment.insurances?.map((ins, i) => (
                          <div key={i} className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded border border-gray-100">
                            <span className="text-[10px] font-bold text-gray-400 uppercase">{ins.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-black text-gray-900">{ins.amount}</span>
                              <span className={`text-[9px] font-black px-1.5 py-0.5 rounded text-white ${ins.paid ? 'bg-green-600' : 'bg-red-600'}`}>
                                {ins.paid ? 'PAYÉ' : 'NON PAYÉ'}
                              </span>
                            </div>
                          </div>
                        ))}
                        {shipment.import_tax && (
                          <div className="flex justify-between items-center bg-amber-50 px-4 py-2 rounded border border-amber-100">
                            <span className="text-[10px] font-bold text-amber-600 uppercase">Taxe Import</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-black text-gray-900">{shipment.import_tax}</span>
                              <span className={`text-[9px] font-black px-1.5 py-0.5 rounded text-white ${shipment.import_tax_paid ? 'bg-green-600' : 'bg-red-600'}`}>
                                {shipment.import_tax_paid ? 'PAYÉ' : 'NON PAYÉ'}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 md:p-12">
                  {/* QR CODE - Centered like reference */}
                  <div className="flex flex-col items-center justify-center mb-12">
                    <div className="bg-white p-6 rounded-2xl border-4 border-gray-50 shadow-xl inline-block relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition"></div>
                      <div className="relative bg-white p-2 rounded-lg">
                        {qrCodeUrl ? (
                          <img src={qrCodeUrl} alt="QR Code" className="w-[140px] h-[140px]" />
                        ) : (
                          <div className="w-[140px] h-[140px] flex items-center justify-center text-gray-300">...</div>
                        )}
                      </div>
                      <p className="text-center font-black mt-4 tracking-[0.2em] text-gray-900 text-sm">{shipment.tracking_number}</p>
                    </div>
                  </div>

                  {/* Shipper & Receiver - side-by-side grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-xl relative overflow-hidden group hover:border-red-600/30 transition-all">
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition">
                        <User size={64} />
                      </div>
                      <h3 className="section-tag mb-6 flex items-center gap-3">
                        <User className="text-red-600" size={24} /> INFO EXPÉDITEUR
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Nom Complet</p>
                          <p className="text-gray-900 font-black tracking-tight">{shipment.shipper_name}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Adresse</p>
                          <p className="text-gray-600 text-sm font-medium leading-relaxed">{shipment.shipper_address}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Téléphone</p>
                            <p className="text-gray-900 font-bold text-sm tracking-tight">{shipment.shipper_phone}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Email</p>
                            <p className="text-gray-900 font-bold text-sm tracking-tight">{shipment.shipper_email}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-xl relative overflow-hidden group hover:border-red-600/30 transition-all">
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition">
                        <User size={64} />
                      </div>
                      <h3 className="section-tag mb-6 flex items-center gap-3">
                        <User className="text-red-600" size={24} /> INFO DESTINATAIRE
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Nom Complet</p>
                          <p className="text-gray-900 font-black tracking-tight">{shipment.receiver_name}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Adresse</p>
                          <p className="text-gray-600 text-sm font-medium leading-relaxed">{shipment.receiver_address}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Téléphone</p>
                            <p className="text-gray-900 font-bold text-sm tracking-tight">{shipment.receiver_phone}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Email</p>
                            <p className="text-gray-900 font-bold text-sm tracking-tight">{shipment.receiver_email}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Shipment Information Grid - 4 columns like reference */}
                  <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-xl mb-12">
                    <h3 className="section-tag mb-8 border-b border-gray-100 pb-4">Informations Générales</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6">
                      {[
                        { label: 'Origine', val: shipment.origin },
                        { label: 'Destination', val: shipment.destination },
                        { label: 'Produit', val: shipment.product },
                        { label: 'Statut Global', val: shipment.status },
                        { label: 'Transporteur', val: shipment.carrier },
                        { label: 'Type d\'Envoi', val: shipment.type_of_shipment },
                        { label: 'Poids', val: shipment.weight },
                        { label: 'Mode d\'Expédition', val: shipment.shipment_mode },
                        { label: 'Réf Transporteur', val: shipment.carrier_reference },
                        { label: 'Quantité', val: shipment.quantity },
                        { label: 'Mode de Paiement', val: shipment.payment_mode },
                        { label: 'Transporteur Total', val: shipment.total_freight },
                        { label: 'Date Livraison Prévue', val: formatDate(shipment.expected_delivery_date) },
                        { label: 'Date de Départ', val: formatDate(shipment.departure_date) },
                        { label: 'Heure de Départ', val: shipment.departure_time },
                        { label: 'Heure de Livraison', val: shipment.delivery_time },
                      ].map((item, i) => (
                        <div key={i}>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
                          <p className="text-gray-900 font-black text-sm tracking-tight">{item.val || 'N/A'}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Comment box */}
                  {shipment.comment && (
                    <div className="bg-amber-50 border-l-8 border-amber-500 p-8 rounded-r-xl mb-12 shadow-inner">
                      <div className="flex items-center gap-3 text-amber-800 font-black mb-2 tracking-widest uppercase">
                        <span className="text-2xl animate-pulse">⚠️</span> INFORMATION IMPORTANTE
                      </div>
                      <p className="text-amber-900 text-lg font-bold leading-relaxed italic">{shipment.comment}</p>
                    </div>
                  )}

                  {/* Shipment Image */}
                  {shipment.image_url && (
                    <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-xl mb-12">
                      <h3 className="section-tag mb-8 flex items-center gap-3">
                        <Package className="text-red-600" size={24} /> PHOTO DE L'EXPÉDITION
                      </h3>
                      <div className="rounded-lg overflow-hidden border border-gray-100">
                        <img src={shipment.image_url} alt="Shipment" className="w-full max-w-2xl mx-auto hover:scale-105 transition-all duration-1000" />
                      </div>
                    </div>
                  )}

                  {/* Location Map */}
                  <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-xl mb-12 overflow-hidden">
                    <h3 className="section-tag mb-8 flex items-center gap-3">
                      <MapPin className="text-red-600" size={24} /> LOCALISATION EN DIRECT
                    </h3>
                    <div className="mb-6 bg-red-600/5 p-4 rounded-xl border border-red-600/10">
                      <div className="flex items-center justify-between text-xs font-black tracking-widest uppercase">
                        <div className="flex items-center gap-2 text-red-600">
                          <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(232,0,29,0.5)]"></div>
                          <span>Origine : {shipment.origin}</span>
                        </div>
                        <div className="text-gray-400">
                           {shipment.carrier} Logistique
                        </div>
                      </div>
                    </div>
                    <div className="rounded-xl overflow-hidden border border-gray-100 grayscale hover:grayscale-0 transition-all duration-1000" style={{ height: '400px' }}>
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29532.261909129487!2d114.15769!3d22.28552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3404007368c8e47b%3A0xb9382c04fcfaa30e!2sHong%20Kong!5e0!3m2!1sfr!2sfr!4v1696234567890!5m2!1sfr!2sfr"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Map"
                      ></iframe>
                    </div>
                  </div>
                </div>

                {/* Print Detail Section bottom bar like ref */}
                <div className="bg-red-600 p-8 flex items-center justify-center">
                   <button onClick={handlePrint} className="bg-white text-red-600 px-12 py-4 rounded-lg font-black tracking-widest flex items-center gap-3 hover:bg-gray-100 transform active:scale-95 transition-all text-sm uppercase">
                      <Printer size={20} /> Imprimer les détails
                   </button>
                </div>
              </div>
            </div>
          ) : !loading && !error && (
            <div className="text-center py-20 animate-fade-in-up">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-100 shadow-xl">
                 <Package size={48} className="text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>Prêt pour le suivi</h3>
              <p className="text-gray-500 italic">Entrez votre numéro de suivi ci-dessus pour commencer.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

