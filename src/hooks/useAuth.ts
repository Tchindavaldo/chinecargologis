import { useState, useEffect, createContext, useContext } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export type UserRole = 'admin' | 'client' | null;

interface AuthContextType {
    user: User | null;
    session: Session | null;
    role: UserRole;
    loading: boolean;
    signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    role: null,
    loading: true,
    signOut: async () => { },
});

export function useAuth() {
    return useContext(AuthContext);
}

export function useAuthProvider(): AuthContextType {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [role, setRole] = useState<UserRole>(null);
    const [loading, setLoading] = useState(true);

    const fetchRole = async (currentUser: User | null) => {
        if (!currentUser) {
            setRole(null);
            return;
        }

        try {
            // Essaie d'abord de lier le user_id si ce n'est pas encore fait
            await supabase
                .from('tolito_chinecargologis_authorized_users')
                .update({ user_id: currentUser.id, updated_at: new Date().toISOString() })
                .eq('email', currentUser.email || '')
                .is('user_id', null);

            // Récupère le rôle
            const { data, error } = await supabase
                .from('tolito_chinecargologis_authorized_users')
                .select('role, active')
                .eq('user_id', currentUser.id)
                .eq('active', true)
                .maybeSingle();

            if (error || !data) {
                // Essaie par email si user_id pas encore lié
                const { data: dataByEmail } = await supabase
                    .from('tolito_chinecargologis_authorized_users')
                    .select('role, active')
                    .eq('email', currentUser.email || '')
                    .eq('active', true)
                    .maybeSingle();

                if (dataByEmail?.role) {
                    // Lier user_id maintenant
                    await supabase
                        .from('tolito_chinecargologis_authorized_users')
                        .update({ user_id: currentUser.id })
                        .eq('email', currentUser.email || '');
                    setRole(dataByEmail.role as UserRole);
                } else {
                    // AUTO RECOUVREMENT : L'utilisateur est connecté mais manque dans la table (vieux compte ou bug trigger)
                    // On force sa création comme client
                    const { error: insertError } = await supabase
                        .from('tolito_chinecargologis_authorized_users')
                        .insert({
                            user_id: currentUser.id,
                            email: currentUser.email || '',
                            role: 'client',
                            active: true
                        });

                    if (!insertError) {
                        setRole('client');
                    } else {
                        setRole(null);
                    }
                }
                return;
            }

            setRole(data.active ? (data.role as UserRole) : null);
        } catch (err) {
            console.error('Error fetching role:', err);
            setRole(null);
        }
    };

    useEffect(() => {
        // Supabase onAuthStateChange va automatiquement déclencher l'événement INITIAL_SESSION
        // Il ne faut surtout pas appeler getSession() en parallèle, sinon fetchRole 
        // s'exécute 2 fois simultanément (cause crash localStorage et conflits)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            setSession(session);
            setUser(session?.user ?? null);

            // Éviler les requêtes en boucle inutile lors de simples refresh ou sign out
            if (event === 'SIGNED_OUT') {
                setRole(null);
                setLoading(false);
                return;
            }

            await fetchRole(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setSession(null);
        setRole(null);
    };

    return { user, session, role, loading, signOut };
}
