//import different frames
import Hero from "../components/frames/hero";
import Intro from "../components/frames/intro";
import Solutions from "../components/frames/solutions";
import ToDoInAbby from "../components/frames/toDoInAbby";
import Statistics from "../components/frames/statistics";
import AndYou from "../components/frames/andYou";
import Moments from "../components/frames/moments";

//style
import '../components/frames/Frames.css';

//load the museum clocks
import { getMuseumClocks } from "../services/data";

export async function clientLoader() {
    const museumClocks = await getMuseumClocks();
    console.log(museumClocks);

    return { museumClocks };
}


const Home = ({ loaderData }) => {
    const { museumClocks } = loaderData;

    return (
        <>
            {/* all the clocks in the database */}
            {/* <ClockList clocks={museumClocks}/> */}
            <Hero />
            <Intro />
            <Solutions />
            <ToDoInAbby />
            <Statistics />
            <AndYou />
            <Moments museumClocks={museumClocks} />
        </>

    )
};

export default Home;