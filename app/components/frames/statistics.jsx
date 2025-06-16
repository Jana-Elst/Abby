import Button from "../molecules/button";
import Title from "../molecules/title";

import dataCircle from "../../src/assets/data-circle.svg";
import dataDots from "../../src/assets/data-dots.svg";
import dataLines from "../../src/assets/data-lines.svg";
import status from "../../src/assets/status.svg";

import arrow from "../../src/assets/arrow-right.svg";
import { Swiper, SwiperSlide } from 'swiper/react';


const Statistics = () => {
    return (
        <div className="statistics">
            <Title extraClass="statistics__title">
                Zo vertraagden we <span className="yellow__fg">samen</span>
            </Title>
            <Swiper spaceBetween={0} slidesPerView={1}>
                <SwiperSlide >
                    <div className="statistic blue__bg">
                        <div className="statistic__visual">
                            <p className="statistic__data">134</p>
                            <p className="statistic__value h3">uur</p>
                            <img className="statistic__img" src={dataCircle} alt="data van aantal uur" />
                            <div className="statistic__background blue__bg"></div>
                        </div>
                        <p className="statistics__description h3">134 uur besteedden mensen deze week aan Abbymomenten.</p>
                        <img className="statistics__img" src={status} alt="status" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="statistic yellow__bg">
                        <div className="statistic__visual">
                            <p className="statistic__data">62</p>
                            <p className="statistic__value h3">mensen</p>
                            <img className="statistic__img" src={dataLines} alt="data van aantal uur" />
                            <div className="statistic__background yellow__bg"></div>
                        </div>
                        <p className="statistics__description h3">62 mensen startten deze week al een Abbymoment.</p>
                        <img className="statistics__img" src={status} alt="status" />
                    </div>
                </SwiperSlide>
                <SwiperSlide >
                    <div className="statistic orange__bg">
                        <div className="statistic__visual">
                            <p className="statistic__data">99</p>
                            <p className="statistic__value h3">momenten</p>
                            <img className="statistic__img" src={dataDots} alt="data van aantal uur" />
                            <div className="statistic__background orange__bg"></div>
                        </div>
                        <p className="statistics__description h3">99 Abbymomenten kwamen deze week tot leven.</p>
                        <img className="statistics__img" src={status} alt="status" />
                    </div>
                </SwiperSlide>
            </Swiper>
            <article className="container statistics__btn__container">
                <p className="h3 statistics__btn___title">Vertraag jij ook mee?</p>
                <p>Creëer een moment en laat de klok even voor jou tikken.</p>
                <Button link={'maak-een-abbymoment'} extraClass="btn__text statistics__btn yellow__bg btn__arrow">
                    Creëer jouw Abbymoment<img className='btn__icon' src={arrow} alt="een pijl" />
                </Button>
            </article>

        </div >
    )
};

export default Statistics;