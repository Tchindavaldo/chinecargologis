-- Migration : Système d'authentification avec rôles pour chinecargologis
-- Date: 2026-04-08

-- Table des utilisateurs autorisés avec leur rôle
CREATE TABLE IF NOT EXISTS tolito_chinecargologis_authorized_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('admin', 'client')),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE tolito_chinecargologis_authorized_users ENABLE ROW LEVEL SECURITY;

-- Supprime les policies existantes avant de les recréer (idempotent)
DROP POLICY IF EXISTS "User can read own authorized record" ON tolito_chinecargologis_authorized_users;
DROP POLICY IF EXISTS "User can update own user_id" ON tolito_chinecargologis_authorized_users;
DROP POLICY IF EXISTS "Service role full access" ON tolito_chinecargologis_authorized_users;
DROP POLICY IF EXISTS "User can insert own record" ON tolito_chinecargologis_authorized_users;

-- Un user peut lire sa propre entrée (soit par son UUID, soit par l'email validé dans son token)
CREATE POLICY "User can read own authorized record"
  ON tolito_chinecargologis_authorized_users
  FOR SELECT
  USING (auth.uid() = user_id OR email = (auth.jwt() ->> 'email'));

-- Un user peut update son propre user_id (lors de la première connexion)
CREATE POLICY "User can update own user_id"
  ON tolito_chinecargologis_authorized_users
  FOR UPDATE
  USING (email = (auth.jwt() ->> 'email'));

-- Un user peut s'insérer lui-même (s'il est manquant)
CREATE POLICY "User can insert own record"
  ON tolito_chinecargologis_authorized_users
  FOR INSERT
  WITH CHECK (email = (auth.jwt() ->> 'email'));

-- Service role peut tout faire (pour la fonction trigger)
CREATE POLICY "Service role full access"
  ON tolito_chinecargologis_authorized_users
  FOR ALL
  USING (auth.role() = 'service_role');

-- Fonction : lie user_id si pré-approuvé, sinon auto-inscrit comme client
CREATE OR REPLACE FUNCTION tolito_chinecargologis_link_authorized_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Lier user_id si l'email est déjà dans la table (ex: admin pré-approuvé)
  UPDATE tolito_chinecargologis_authorized_users
  SET user_id = NEW.id, updated_at = NOW()
  WHERE email = NEW.email AND user_id IS NULL;

  -- Si pas encore dans la table → auto-inscrire comme client
  IF NOT FOUND THEN
    INSERT INTO tolito_chinecargologis_authorized_users (user_id, email, role, active)
    VALUES (NEW.id, NEW.email, 'client', true)
    ON CONFLICT (email) DO NOTHING;
  END IF;

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Ne jamais bloquer la création du user
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger sur auth.users (se déclenche après chaque INSERT = nouvelle inscription)
-- Nom préfixé pour éviter les conflits avec d'autres projets sur le même Supabase
DROP TRIGGER IF EXISTS tolito_chinecargologis_link_user ON auth.users;
CREATE TRIGGER tolito_chinecargologis_link_user
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION tolito_chinecargologis_link_authorized_user();

-- Insérer les admins initiaux (user_id sera lié automatiquement à la connexion)
INSERT INTO tolito_chinecargologis_authorized_users (email, role, active)
VALUES 
  ('junior@gmail.com', 'admin', true),
  ('admin@chinecargologis.com', 'admin', true)
ON CONFLICT (email) DO NOTHING;

-- Commentaires
COMMENT ON TABLE tolito_chinecargologis_authorized_users IS 'Utilisateurs autorisés avec leur rôle (admin ou client)';
COMMENT ON COLUMN tolito_chinecargologis_authorized_users.user_id IS 'Lié automatiquement à auth.users lors de la première connexion';
COMMENT ON COLUMN tolito_chinecargologis_authorized_users.role IS 'admin = accès CRUD complet, client = lecture seule de ses colis';
