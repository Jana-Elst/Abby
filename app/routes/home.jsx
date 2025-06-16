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
import { useRef } from 'react';
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
    const carrouselRef1 = useRef(null);
    const carrouselRef2 = useRef(null);
    const carrouselRef3 = useRef(null);

    useGSAP(() => {
        const carouselRef1 = carrouselRef1.current;
        const carouselRef2 = carrouselRef2.current;
        const carouselRef3 = carrouselRef3.current;
        const widthMoveStart1 = carouselRef1.scrollWidth - window.innerWidth;
        const widthMoveStart2 = carouselRef2.scrollWidth - window.innerWidth;
        const widthMoveStart3 = carouselRef3.scrollWidth - window.innerWidth;

        const introTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".intro__scroll",
                start: "top 70%",
                end: "bottom center",
                scrub: true,
                markers: false,
                toggleActions: "reverse pause resume pause"
            }
        });

        introTl.fromTo(".scroll__header", { x: 350 }, { x: -400, duration: 3 })
            .fromTo(".scroll__span", { x: 360 }, { x: -50, duration: 3 }, ">-3");



        console.log(widthMoveStart1, widthMoveStart2, widthMoveStart3);


        gsap.fromTo(".carousel__wrapper--1", { x: 8 }, {
            x: -widthMoveStart1 - 8, 
            duration: 8, 
            ease: "none", 
            repeat: -1,
            repeatDelay: .1,
            yoyo: true, });
        gsap.fromTo(".carousel__wrapper--2", { x: -widthMoveStart2 - 8 }, {
            x: 8, 
            duration: 8, 
            ease: "none", 
            repeat: -1,
            repeatDelay: .1,
            yoyo: true, });
        gsap.fromTo(".carousel__wrapper--3", { x: 8 }, {
            x: -widthMoveStart3 - 8, 
            duration: 8, 
            ease: "none", 
            repeat: -1,
            repeatDelay: .1,
            yoyo: true, });

    });

    return (
        <div className="home__container">
            <Hero />
            <Intro />
            <Abbymoment />
            <Living />
            <Join />
            <AndYou propref={carrouselRef1} propref2={carrouselRef2} propref3={carrouselRef3} />
            <Statistics />
            {/* <Moments museumClocks={museumClocks} clockProfile={clockProfile} /> */}
        </div>

    )
};

export default Home;