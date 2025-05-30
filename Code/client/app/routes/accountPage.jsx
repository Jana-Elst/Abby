import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from "@supabase/auth-ui-shared";
import AccountClocks from '../components/accountClocks';
import { getUserClocks } from '../services/data';

export async function clientLoader(){
    const { data: { user } } = await supabase.auth.getUser()
    const userId = user.id;
    const userClocks = await getUserClocks(userId)
    console.log(userClocks);
    return {userClocks};
}

const AccountPage = ({loaderData}) => {
    const {userClocks} = loaderData
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
                <AccountClocks userClocks={userClocks} />
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