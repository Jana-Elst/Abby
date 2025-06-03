import { supabase } from '../supabaseClient';
import { getUserClocks } from '../services/data';
import AccountClocks from '../components/accountClocks';
import { NavLink } from 'react-router';

export async function clientLoader() {
    const { data: { user } } = await supabase.auth.getUser();
    let userClocks = []
    if (user) {
        const userId = user.id;
        userClocks = await getUserClocks(userId);
    }
    console.log(userClocks);
    return { userClocks, user };
}

const MyClocks = ({ loaderData }) => {
    const { userClocks, user } = loaderData;

    if (user) {
        return (
            <>
                <AccountClocks userClocks={userClocks} />
                <NavLink to={`${import.meta.env.BASE_URL}log-in`}>account</NavLink>
            </>

        )
    } else {
        return (
            <>
                <p>log in to see your clocks</p>
                <NavLink to={`${import.meta.env.BASE_URL}log-in`}>log in now</NavLink>
            </>
        )
    }

};

export default MyClocks;