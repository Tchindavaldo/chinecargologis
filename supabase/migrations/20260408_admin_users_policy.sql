-- Permettre aux administrateurs de lister et gérer les utilisateurs (lecture, désactivation)
-- Création d'une fonction SECURITY DEFINER pour éviter l'erreur de boucle infinie RLS (infinite recursion)
CREATE OR REPLACE FUNCTION chinecargologis_is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM tolito_chinecargologis_authorized_users
    WHERE email = (auth.jwt() ->> 'email') AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Supprimer la politique au cas où elle existerait déjà
DROP POLICY IF EXISTS "Admins can manage all users" ON tolito_chinecargologis_authorized_users;

-- Création de la politique avec la fonction sécurisée
CREATE POLICY "Admins can manage all users"
  ON tolito_chinecargologis_authorized_users
  FOR ALL
  USING (chinecargologis_is_admin());
