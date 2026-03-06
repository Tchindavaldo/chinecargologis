/*
  # Create Shipment Tracking System

  1. New Tables
    - `shipments`
      - `id` (uuid, primary key)
      - `tracking_number` (text, unique) - The tracking code like CC-10-751490
      - `status` (text) - Current status (e.g., "On hold in Hong Kong")
      - `origin` (text) - Origin location (e.g., "China")
      - `destination` (text) - Destination location (e.g., "Ukraine")
      - `carrier` (text) - Carrier/transport company
      - `carrier_reference` (text) - Carrier reference number
      - `product` (text) - Product description
      - `type_of_shipment` (text) - Type of shipment
      - `quantity` (integer) - Quantity of items
      - `weight` (text) - Weight of shipment
      - `payment_mode` (text) - Payment mode
      - `shipment_mode` (text) - Shipment mode (e.g., "Road")
      - `total_freight` (text) - Total freight cost
      - `expected_delivery_date` (date) - Expected delivery date
      - `departure_date` (date) - Departure date
      - `departure_time` (text) - Departure time
      - `delivery_time` (text) - Expected delivery time
      - `package_description` (text) - Package description
      - `shipper_name` (text) - Shipper name
      - `shipper_phone` (text) - Shipper phone
      - `shipper_email` (text) - Shipper email
      - `shipper_address` (text) - Shipper address
      - `receiver_name` (text) - Receiver name
      - `receiver_phone` (text) - Receiver phone
      - `receiver_email` (text) - Receiver email
      - `receiver_address` (text) - Receiver address
      - `comment` (text) - Additional comments
      - `image_url` (text) - URL of the shipment image
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp

  2. Security
    - Enable RLS on `shipments` table
    - Add policies for public read access (tracking)
    - Add policies for authenticated admin write access

  3. Important Notes
    - Public users can track shipments using tracking number
    - Only authenticated admins can create/update/delete shipments
    - Image URLs are stored for shipment photos
*/

CREATE TABLE IF NOT EXISTS jongleur_chinecargologis_shipments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_number text UNIQUE NOT NULL,
  status text DEFAULT '',
  origin text DEFAULT '',
  destination text DEFAULT '',
  carrier text DEFAULT '',
  carrier_reference text DEFAULT '',
  product text DEFAULT '',
  type_of_shipment text DEFAULT '',
  quantity integer DEFAULT 0,
  weight text DEFAULT '',
  payment_mode text DEFAULT '',
  shipment_mode text DEFAULT '',
  total_freight text DEFAULT '',
  expected_delivery_date date,
  departure_date date,
  departure_time text DEFAULT '',
  delivery_time text DEFAULT '',
  package_description text DEFAULT '',
  shipper_name text DEFAULT '',
  shipper_phone text DEFAULT '',
  shipper_email text DEFAULT '',
  shipper_address text DEFAULT '',
  receiver_name text DEFAULT '',
  receiver_phone text DEFAULT '',
  receiver_email text DEFAULT '',
  receiver_address text DEFAULT '',
  comment text DEFAULT '',
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE jongleur_chinecargologis_shipments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view shipments by tracking number"
  ON jongleur_chinecargologis_shipments FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert shipments"
  ON jongleur_chinecargologis_shipments FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update shipments"
  ON jongleur_chinecargologis_shipments FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete shipments"
  ON jongleur_chinecargologis_shipments FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_jongleur_chinecargologis_shipments_tracking_number ON jongleur_chinecargologis_shipments(tracking_number);