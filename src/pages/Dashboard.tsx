import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Package, LogOut, Search, User, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import SEO from '../components/SEO';

interface Shipment {
  id: string;
  tracking_number: string;
  status: string;
  origin: string;
  destination: string;
  carrier: string;
  shipper_name: string;
  receiver_name: string;
  expected_delivery_date: string;
  tracking_progress: number;
  tracking_stage: string;
  created_at: string;
}

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      fetchMyShipments();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email]);

  const fetchMyShipments = async () => {
    try {
      const { data, error } = await supabase
        .from('tolito_chinecargologis_shipments')
        .select('id, tracking_number, status, origin, destination, carrier, shipper_name, receiver_name, expected_delivery_date, tracking_progress, tracking_stage, created_at')
        .or(`shipper_email.eq.${user!.email},receiver_email.eq.${user!.email}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setShipments(data || []);
    } catch (err) {
      console.error('Error fetching shipments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    await signOut();
    navigate('/');
  };

  const filtered = shipments.filter(s =>
    s.tracking_number.toLowerCase().includes(search.toLowerCase()) ||
    s.status.toLowerCase().includes(search.toLowerCase()) ||
    s.origin.toLowerCase().includes(search.toLowerCase()) ||
    s.destination.toLowerCase().includes(search.toLowerCase())
  );

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Client';

  return (
    <div className="min-h-screen" style={{ background: 'var(--darker)' }}>
      <SEO title="Mon Tableau de Bord - Chine Cargo Logis" description="Suivez vos expéditions en temps réel." />

      {/* HEADER */}
      <header className="bg-gray-900/80 backdrop-blur-sm border-b border-red-600/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.png?v=5" alt="Chine Cargo Logis" className="h-10 w-auto object-contain" />
              <div className="hidden sm:block">
                <span className="text-white font-black tracking-tight text-base leading-none block">CHINE CARGO</span>
                <span className="text-red-600 font-bold tracking-[0.2em] text-[10px]">LOGISTICS SOLUTIONS</span>
              </div>
            </Link>
            <div className="h-6 w-px bg-white/10 mx-2 hidden sm:block"></div>
            <div className="hidden sm:flex items-center gap-2 text-gray-400 text-sm">
              <User size={14} className="text-red-500" />
              <span className="font-semibold">{displayName}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-gray-400 hover:text-white text-xs font-bold tracking-widest uppercase transition-colors hidden sm:block"
            >
              Site Vitrine
            </Link>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-2 bg-white/5 hover:bg-red-600 px-4 py-2 rounded-lg transition-all duration-300 font-bold text-xs border border-white/10 hover:border-red-600 text-white disabled:opacity-50"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              {loggingOut ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <LogOut size={15} className="text-red-400" />
              )}
              <span className="hidden sm:inline">{loggingOut ? 'DÉCONNEXION...' : 'DÉCONNEXION'}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">

        {/* WELCOME BANNER */}
        <div className="mb-10 relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-red-600/20 p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-red-500 font-bold text-xs tracking-[3px] uppercase mb-2">Tableau de Bord Client</p>
              <h1 className="text-2xl sm:text-3xl font-black text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Bonjour, <span className="text-red-500">{displayName}</span>
              </h1>
              <p className="text-gray-400 text-sm mt-2">
                Vous avez <span className="text-white font-bold">{shipments.length}</span> expédition{shipments.length !== 1 ? 's' : ''} associée{shipments.length !== 1 ? 's' : ''} à votre compte.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center border border-red-600/20">
                <Package size={28} className="text-red-500" />
              </div>
            </div>
          </div>
        </div>

        {/* SEARCH */}
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Rechercher par numéro de suivi, statut, origine..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-900/80 border border-gray-700/50 focus:border-red-600/50 text-white px-5 py-4 pl-12 rounded-xl outline-none transition-all placeholder:text-gray-500 backdrop-blur-sm"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        </div>

        {/* SHIPMENTS LIST */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-12 h-12 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-bold tracking-widest text-xs uppercase">Chargement de vos expéditions...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-800">
              <Package size={40} className="text-gray-600" />
            </div>
            <h3 className="text-xl font-black text-gray-400 mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              {search ? 'Aucun résultat' : 'Aucune expédition'}
            </h3>
            <p className="text-gray-600 text-sm">
              {search
                ? 'Modifiez votre recherche pour trouver vos colis.'
                : 'Aucune expédition n\'est associée à votre compte pour le moment.'}
            </p>
            {search && (
              <button onClick={() => setSearch('')} className="mt-4 text-red-500 font-bold text-sm hover:underline">
                Effacer la recherche
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Suivi
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Origine
                    </th>
                    <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Destination
                    </th>
                    <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expéditeur
                    </th>
                    <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Destinataire
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filtered.map((shipment) => (
                    <tr key={shipment.id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                        {shipment.tracking_number}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                        {shipment.status}
                      </td>
                      <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {shipment.origin}
                      </td>
                      <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {shipment.destination}
                      </td>
                      <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {shipment.shipper_name}
                      </td>
                      <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {shipment.receiver_name}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/track?tracking=${shipment.tracking_number}`}
                          className="inline-flex items-center gap-1 text-red-600 hover:text-red-900 border border-red-600 hover:bg-red-50 px-2 py-1 sm:px-3 sm:py-1 rounded"
                        >
                          <ArrowRight size={14} />
                          <span className="hidden sm:inline">Suivre</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
