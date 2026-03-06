/*
  # Add Insurance and Tracking Fields
  
  1. Changes
    - Add `insurances` (jsonb) - Array of insurance entries with name and amount
    - Add `import_tax` (text) - Import tax amount
    - Add `import_tax_paid` (boolean) - Whether import tax is paid
    - Add `status_date` (date) - Date for the current status
    - Add `status_time` (text) - Time for the current status
    - Add `tracking_progress` (integer) - Progress percentage for visual tracking (0-100)
    - Add `tracking_stage` (text) - Current stage in tracking (e.g., "picked_up", "in_transit", "customs", "delivered")
*/

-- Add new columns to shipments table
-- Add new columns to shipments table
ALTER TABLE jongleur_chinecargologis_shipments 
ADD COLUMN IF NOT EXISTS insurances jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS import_tax text DEFAULT '',
ADD COLUMN IF NOT EXISTS import_tax_paid boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS status_date date,
ADD COLUMN IF NOT EXISTS status_time text DEFAULT '',
ADD COLUMN IF NOT EXISTS tracking_progress integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS tracking_stage text DEFAULT 'picked_up';

-- Create site_settings table for storing site information
CREATE TABLE IF NOT EXISTS jongleur_chinecargologis_site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_email text DEFAULT '',
  site_phone text DEFAULT '',
  site_address text DEFAULT '',
  support_email text DEFAULT '',
  company_name text DEFAULT 'Jongleur Chine Cargo',
  company_description text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on site_settings
ALTER TABLE jongleur_chinecargologis_site_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read site settings
CREATE POLICY "Anyone can view site settings"
  ON jongleur_chinecargologis_site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only authenticated users can update site settings
CREATE POLICY "Authenticated users can update site settings"
  ON jongleur_chinecargologis_site_settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users can insert site settings
CREATE POLICY "Authenticated users can insert site settings"
  ON jongleur_chinecargologis_site_settings FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Insert default site settings if not exists
INSERT INTO jongleur_chinecargologis_site_settings (site_email, site_phone, site_address, support_email, company_name)
VALUES ('contact@chinecargologis.com', '+1 639 526 1121', 'Logistics Hub', 'support@chinecargologis.com', 'Jongleur Chine Cargo')
ON CONFLICT DO NOTHING;
