import AddClock from "../components/addClock";
import { addClock } from "../services/data";
import { supabase } from '../supabaseClient';
import { Link, redirect } from "react-router";

export async function clientAction({request}) {
    const formData = await request.formData();
    const activity = formData.get("activity");
    const userId = formData.get("userId");
    const description = formData.get("description");

    await addClock(userId, activity, description);
    return redirect(`/mijn-activiteiten`);
}

export async function clientLoader() {
    const { data: { user } } = await supabase.auth.getUser();
    return { user };
}

const CreateClockForm = ({ loaderData }) => {
    const { user } = loaderData;
    if (user) {
        return (
            <>
                <Link to={"/activiteit-maken"}>back</Link>
                <p>create a clock</p>
                <AddClock type={"now"} user={user.id} />
            </>

        )
    } else {
        return (
            <>
                <Link to={"/activiteit-maken"}>back</Link>
                <p>log in to see create clocks</p>
                <Link to={"/log-in"}>log in now</Link>
            </>
        )
    }

};

export default CreateClockForm;