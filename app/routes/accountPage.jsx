// something with prev path?
// to show the right states?

import { useContext, useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { NavLink } from 'react-router';
import { UserContext } from '../context/UserContext';
import Title from "../components/molecules/title";
import Arrow from "../src/assets/arrow-right.svg";

import "./accountPage.css"

const AccountPage = () => {
    const { setUserId } = useContext(UserContext);
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
            <div className='account__wrapper'>
                <h3 className='h3 account__h3'>
                    Maak een account aan om een moment te maken
                </h3>
                <div className='account__container'>
                    <p className='account__title'>Login met jouw account</p>
                    <Auth providers={['facebook', 'google']} supabaseClient={supabase} localization={{
                        variables: {
                            sign_in: {
                                email_label: 'E-mailadres',
                                password_label: 'Jouw paswoord',
                                button_label: 'Log in',
                            },
                        },
                    }} appearance={{
                        theme: ThemeSupa, variables: {
                            default: {
                                colors: {
                                    brand: "var(--yellow)",
                                },
                            },
                        }, extend: true,
                        // Your custom classes
                        className: {
                            divider: 'remove',
                            input: 'account__input',
                            label: 'account__label',
                            button: 'btn__text account__btn account__btn:hover',
                            message: 'message',
                        },
                    }} />
                </div>
            </div>
        );
    } else {
        setUserId(session.user.id);
        return (
            <div className='succes__login'>
                <Title>Je bent ingelogd!</Title>
                <p className='h3'>Start nu je eigen Abbymoment of neem deel aan iemand anders zijn activiteit. </p>

                <div className='loguit__container'>
                    <button className='signout__btn' onClick={() => { signOut(); }}> Log uit </button>
                    <p className='loguit__email'> Je bent ingelogd als {session.user.email}</p>
                </div>
            </div>
        );
    }
};

export default AccountPage;