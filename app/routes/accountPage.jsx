import { useContext, useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { NavLink } from 'react-router';
import { UserContext } from '../root';

const AccountPage = () => {
    const { userId, setUserId } = useContext(UserContext);
    console.log(userId);
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
        setUserId(null);
        return (
            <>
                <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
            </>
        );
    } else {
        setUserId(session.userId);
        console.log(session);
        return (
            <>
                <div>you are logged in</div>
                <div>{session.user.email}</div>
                <button onClick={() => { signOut(); }}>sign out</button>
                <NavLink to={`${import.meta.env.BASE_URL}mijn-activiteiten`}>continue to see your stuff</NavLink>
            </>
        );
    }
};

export default AccountPage;