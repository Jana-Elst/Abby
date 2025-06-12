import Button from "../molecules/button";
import Title from "../molecules/title";

import dataCircle from "../../src/assets/data-circle.svg";
import dataDots from "../../src/assets/data-dots.svg";
import dataLines from "../../src/assets/data-lines.svg";
import status from "../../src/assets/status.svg";

const Statistics = () => {
    return (
        <div className="statistics">
            <Title extraClass="statistics__title">
                Zo vult de <span className="yellow__fg">community</span> Abby.
            </Title>
            <article className="statistics__swipe">
                <section className="statistic blue__bg">
                    <div className="statistic__visual">
                        <p className="statistic__data">134</p>
                        <p className="statistic__value h3">uur</p>
                        <img className="statistic__img" src={dataCircle} alt="data van aantal uur" />
                    </div>
                    <p className="statistics__description h3">134 uur besteedden mensen deze week aan Abbymomenten.</p>
                    <img className="statistics__img" src={status} alt="status" />
                </section>
                <section className="statistic yellow__bg">
                    <div className="statistic__visual">
                        <p className="statistic__data">62</p>
                        <p className="statistic__value h3">mensen</p>
                        <img className="statistic__img" src={dataLines} alt="data van aantal uur" />
                    </div>
                    <p className="statistics__description h3">62 mensen startten deze week al een Abbymoment.</p>
                    <img className="statistics__img" src={status} alt="status" />
                </section>
                <section className="statistic orange__bg">
                    <div className="statistic__visual">
                        <p className="statistic__data">99</p>
                        <p className="statistic__value h3">momenten</p>
                        <img className="statistic__img" src={dataDots} alt="data van aantal uur" />
                    </div>
                    <p className="statistics__description h3">99 Abbymomenten kwamen deze week tot leven.</p>
                    <img className="statistics__img" src={status} alt="status" />
                </section>
            </article>
            <Button link={'abbymomenten'} extraClass="btn__text statistics__btn yellow__bg">
                Begin jouw Abbymoment
            </Button>
        </div >
    )
};

export default Statistics;