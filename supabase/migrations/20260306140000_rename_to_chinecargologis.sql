-- Rename tables from chinecargologis to chinecargologis
ALTER TABLE IF EXISTS jongleur_chinecargologis_shipments RENAME TO jongleur_chinecargologis_shipments;
ALTER TABLE IF EXISTS jongleur_chinecargologis_site_settings RENAME TO jongleur_chinecargologis_site_settings;

-- Rename index if it exists
ALTER INDEX IF EXISTS idx_jongleur_chinecargologis_shipments_tracking_number 
RENAME TO idx_jongleur_chinecargologis_shipments_tracking_number;

-- Update existing site settings with the new company name
UPDATE jongleur_chinecargologis_site_settings 
SET company_name = 'Chine Cargo Logis', 
    site_email = 'contact@chinecargologis.com',
    support_email = 'support@chinecargologis.com'
WHERE company_name = 'Jongleur Chine Cargo' OR company_name = 'CHINE CARGO LOGIS';
