//import different frames
import Hero from "../components/frames/hero";
import Intro from "../components/frames/intro";
// import ToDoInAbby from "../components/frames/toDoInAbby";
import Abbymoment from "../components/frames/abbymoment";
import Living from "../components/frames/living";
import Join from "../components/frames/join";
import AndYou from "../components/frames/andYou";
import Statistics from "../components/frames/statistics";
// import Moments from "../components/frames/moments";
import "./home.css"

//style
import '../components/frames/Frames.css';

//load the museum clocks
import { getClockProfile } from "../services/data";

//gsap
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(ScrollTrigger);

export async function clientLoader() {
    const clockProfile = await getClockProfile();

    return { clockProfile };
}


const Home = ({ loaderData }) => {
    const { clockProfile } = loaderData;

    useGSAP(() => {
        //     const introTl = gsap.timeline({
        //         scrollTrigger: {
        //             trigger: ".intro__scroll",
        //             pin: ".intro__pin",
        //             start: "top top",
        //             end: "bottom bottom",
        //             scrub: true,
        //             markers: true,
        //             toggleActions: "resume pause reverse pause"
        //         }
        //       });



        const introTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".intro__scroll",
                start: "top 70%",
                end: "bottom center",
                scrub: true,
                markers: false,
                toggleActions: "resume pause reverse pause"
            }
        });

        introTl.fromTo(".scroll__header", { x: 350 }, { x: -400, duration: 3 })
            .fromTo(".scroll__span", { x: 360 }, { x: -50, duration: 3}, ">-3");
    });

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