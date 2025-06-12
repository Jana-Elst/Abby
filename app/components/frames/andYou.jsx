import Title from "../molecules/title";

import ontdekAnimal from "../../src/assets/ontdek-animal.jpg";
import ontdekDiana from "../../src/assets/ontdek-diana.jpg";
import ontdekMen from "../../src/assets/ontdek-men.jpg";
import ontdekRiver from "../../src/assets/ontdek-river.jpg";
import ontdekThee from "../../src/assets/ontdek-thee.jpg";
import ontdekVase from "../../src/assets/ontdek-vase.jpg";

import planArt from "../../src/assets/plan-art.jpg";
import planBooks from "../../src/assets/plan-books.jpg";
import planCafe from "../../src/assets/plan-cafe.jpg";
import planFlower from "../../src/assets/plan-flower.jpg";
import planGarden from "../../src/assets/plan-garden.jpg";
import planGreen from "../../src/assets/plan-green.jpg";
import planSchool from "../../src/assets/plan-school.jpg";
import planWorkshop from "../../src/assets/plan-workshop.jpg";

import bekijkBall from "../../src/assets/bekijk-ball.jpg";
import bekijkClothing from "../../src/assets/bekijk-clothing.jpg";
import bekijkHorse from "../../src/assets/bekijk-horse.jpg";
import bekijkLamp from "../../src/assets/bekijk-lamp.jpg";
import bekijkLiving from "../../src/assets/bekijk-living.jpg";
import bekijkPainting from "../../src/assets/bekijk-painting.jpg";
import bekijkScreens from "../../src/assets/bekijk-screens.jpg";
import bekijkWall from "../../src/assets/bekijk-wall.jpg";

const AndYou = () => {
    return (
        <div className='andYou'>
            <Title extraClass="andYou__title">
                Hoe ga jij je dag <span className="purple__fg">Invullen?</span>
            </Title>
            <article className="andYou__carousel">
                <section>
                    <h3 className="carousel__header">Bekijk de tentoonstelling</h3>
                    <div className="carousel__images">
                        <img className="carousel__img" src={bekijkBall} alt="Bekijk Ball" />
                        <img className="carousel__img" src={bekijkClothing} alt="Bekijk Clothing" />
                        <img className="carousel__img" src={bekijkHorse} alt="Bekijk Horse" />
                        <img className="carousel__img" src={bekijkLamp} alt="Bekijk Lamp" />
                        <img className="carousel__img" src={bekijkLiving} alt="Bekijk Living" />
                        <img className="carousel__img" src={bekijkPainting} alt="Bekijk Painting" />
                        <img className="carousel__img" src={bekijkScreens} alt="Bekijk Screens" />
                        <img className="carousel__img" src={bekijkWall} alt="Bekijk Wall" />
                    </div>
                </section>
                <section>
                    <h3 className="carousel__header">Plan een Abbymoment</h3>
                    <div className="carousel__images">
                        <img className="carousel__img" src={planArt} alt="Plan Art" />
                        <img className="carousel__img" src={planBooks} alt="Plan Books" />
                        <img className="carousel__img" src={planCafe} alt="Plan Cafe" />
                        <img className="carousel__img" src={planFlower} alt="Plan Flower" />
                        <img className="carousel__img" src={planGarden} alt="Plan Garden" />
                        <img className="carousel__img" src={planGreen} alt="Plan Green" />
                        <img className="carousel__img" src={planSchool} alt="Plan School" />
                        <img className="carousel__img" src={planWorkshop} alt="Plan Workshop" />
                    </div>
                </section>
                <section>
                    <h3 className="carousel__header">Ontdek onze collectie</h3>
                    <div className="carousel__images">
                        <img className="carousel__img" src={ontdekAnimal} alt="Ontdek Animal" />
                        <img className="carousel__img" src={ontdekDiana} alt="Ontdek Diana" />
                        <img className="carousel__img" src={ontdekMen} alt="Ontdek Men" />
                        <img className="carousel__img" src={ontdekRiver} alt="Ontdek River" />
                        <img className="carousel__img" src={ontdekThee} alt="Ontdek Thee" />
                        <img className="carousel__img" src={ontdekVase} alt="Ontdek Vase" />
                    </div>
                </section>
            </article>
        </div >
    )
};

export default AndYou;