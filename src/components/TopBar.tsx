import { Mail, Phone, MapPin } from 'lucide-react';
import { useSiteSettings } from '../hooks/useSiteSettings';

export default function TopBar() {
  const { settings, loading } = useSiteSettings();

  if (loading || !settings) return (
    <div className="bg-[#080c16] border-b border-white/5 py-2 hidden md:block" style={{ height: '36px' }} />
  );

  return (
    <div className="bg-[#080c16] border-b border-white/5 py-2 hidden md:block">
      <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">
        <div className="flex items-center gap-6">
          {settings.site_email && (
            <div className="flex items-center gap-2">
              <Mail size={12} className="text-red-600 flex-shrink-0" />
              <a href={`mailto:${settings.site_email}`} className="hover:text-white transition-colors">
                {settings.site_email}
              </a>
            </div>
          )}
          {settings.site_phone && (
            <div className="flex items-center gap-2">
              <Phone size={12} className="text-red-600 flex-shrink-0" />
              <a href={`tel:${settings.site_phone}`} className="hover:text-white transition-colors">
                {settings.site_phone}
              </a>
            </div>
          )}
          {settings.site_address && (
            <div className="flex items-center gap-2">
              <MapPin size={12} className="text-red-600 flex-shrink-0" />
              <span className="truncate max-w-[220px]">{settings.site_address}</span>
            </div>
          )}
        </div>
        <span className="text-white/20 tracking-[0.3em]">SUIVI GLOBAL 24/7</span>
      </div>
    </div>
  );
}
