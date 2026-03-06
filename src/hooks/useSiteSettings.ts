import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface SiteSettings {
  id?: string;
  site_email: string;
  site_phone: string;
  site_address: string;
  support_email: string;
  company_name: string;
  company_description: string;
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('tolito_chinecargologis_site_settings')
          .select('*')
          .limit(1)
          .maybeSingle();

        if (!error && data) {
          setSettings(data);
        }
      } catch (err) {
        console.error('Error fetching site settings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading };
}
