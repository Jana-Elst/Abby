//import different frames
import Hero from "../components/frames/hero";
import Intro from "../components/frames/intro";
// import ToDoInAbby from "../components/frames/toDoInAbby";
import Abbymoment from "../components/frames/abbymoment";
import Living from "../components/frames/living";
import Join from "../components/frames/join";
import AndYou from "../components/frames/andYou";
import Statistics from "../components/frames/statistics";
import Moments from "../components/frames/moments";
import "./home.css"

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
        <div className="home__container">
            <Hero />
            <Intro />
            <Abbymoment />
            <Living />
            <Join />
            <AndYou />
            <Statistics />
            {/* <Moments museumClocks={museumClocks} clockProfile={clockProfile} /> */}
        </div>

    )
};

export default Home;