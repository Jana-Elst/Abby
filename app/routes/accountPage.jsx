import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { NavLink } from 'react-router';

const AccountPage = () => {
    const [session, setSession] = useState(null);


    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    async function signOut() {
        const { error } = await supabase.auth.signOut();
        console.log(error);
    }

    if (!session) {
        return (
            <>
                <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
            </>
        );
    } else {
        return (
            <>
                <div>you are logged in</div>
                <div></div>

                <button
                    onClick={() => { signOut(); }}
                >
                    sign out
                </button>
                <NavLink to={'/mijn-activiteiten'}>continue to see your stuff</NavLink>
            </>
        );
    }
};

export default AccountPage;