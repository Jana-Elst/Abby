import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { Auth } from '../../node_modules/@supabase/auth-ui-react/dist'
import { ThemeSupa } from "@supabase/auth-ui-shared";

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
                <div>User Logged in!</div>
                <button
                    onClick={() => { signOut(); }}
                >
                    sign out
                </button>
            </>
        );
    }

};

export default AccountPage;