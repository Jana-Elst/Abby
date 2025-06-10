//import different frames
import Hero from "../components/frames/hero";
import Intro from "../components/frames/intro";
import ToDoInAbby from "../components/frames/toDoInAbby";
import Statistics from "../components/frames/statistics";
import AndYou from "../components/frames/andYou";
import Moments from "../components/frames/moments";

//style
import '../components/frames/Frames.css';

//load the museum clocks
import { getMuseumClocks, getClockProfile } from "../services/data";

export async function clientLoader() {
    const museumClocks = await getMuseumClocks();
    const clockProfile = await getClockProfile();

    console.log(museumClocks);

    return { museumClocks, clockProfile };
}


const Home = ({ loaderData }) => {
    const { museumClocks, clockProfile } = loaderData;

    return (
        <>
            {/* all the clocks in the database */}
            {/* <ClockList clocks={museumClocks}/> */}
            <Hero />
            <Intro />
            <ToDoInAbby />
            <Statistics />
            <AndYou />
            <Moments museumClocks={museumClocks} clockProfile={clockProfile} />
        </>

    )
};

export default Home;