import { useContext, useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { NavLink, Link, useNavigate } from 'react-router';
import { UserContext } from '../root';

const AccountPage = () => {
    const { userId, setUserId } = useContext(UserContext);
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
        console.log(userId);
        return (
            <>
                <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
            </>
        );
    } else {
        setUserId(session.user.id);
        console.log(session);
        return (
            <>
                <div>you are logged in</div>
                <div>{session.user.email}</div>
                <button onClick={() => { signOut(); }}>sign out</button>
                <NavLink to={`${import.meta.env.BASE_URL}maak-een-abbymoment`}>continue to see your stuff</NavLink>
            </>
        );
    }
};

export default AccountPage;