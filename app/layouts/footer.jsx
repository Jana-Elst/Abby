import { Outlet } from "react-router";
import "./footer.css"

import arrowRight from "../src/assets/arrow-right.svg";

const Footer = () => {
    return (
        <>
            <>
                <Outlet />
                <footer>
                    <div className="footer__container">
                        <h3 className="footer__title h4">Contact</h3>
                        <address className="footer__extra">
                            <a href="mailto:abby@kortrijk.be" className="extra__info">abby@kortrijk.be</a>
                            <a href="tel:+32 (0)56 27 74 60" className="extra__info">+32 (0)56 27 74 60</a>
                            <a className="extra__info" target="__blank" href="https://www.google.com/maps/dir//Houtmarkt,+8500+Kortrijk/@50.8290158,3.1870085,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x47c33b1d0f7bc771:0x76427cb56c38e61b!2m2!1d3.2694088!2d50.8290448?entry=ttu&g_ep=EgoyMDI1MDYwOS4xIKXMDSoASAFQAw%3D%3D">Begijnhofpark 8500 Kortrijk</a>
                        </address>
                    </div>
                    <div className="footer__container">
                        <h3 className="footer__title h4">Opening hours</h3>
                        <ul className="footer__extra">
                            <li className="extra__info">Open van 10 tot 22 uur</li>
                            <li className="extra__info">(Expozalen 10 tot 18 uur)</li>
                            <li className="extra__info">Laatste tickets: 17 uur</li>
                            <li className="extra__info">Gesloten op maandag</li>
                        </ul>
                    </div>
                    <a className="footer__website h4" href="https://www.kortrijk.be/abby" target="__blank">
                        <h3 className="website__title">Bekijk de Abby website</h3>
                        <img className="website__arrow" src={arrowRight} alt="data van aantal uur" />
                    </a>
                    <div className="footer__foodnote">
                        <svg className="foodnote__img" xmlns="http://www.w3.org/2000/svg" width="624" height="213" viewBox="0 0 624 213" fill="none">
                            <path d="M624.025 0H564.665L538.634 110.174L511.793 0H453.118L515.273 144.65V212.722H561.871V144.688L624.025 0ZM457.636 62.6026C457.636 28.0293 429.601 0 395.018 0H340.836V212.722H408.066C442.65 212.722 470.685 184.693 470.685 150.12C470.685 129.51 460.696 111.267 445.32 99.8639C453.056 89.4545 457.636 76.5658 457.636 62.5995V62.6026ZM417.681 62.6026C417.681 74.616 407.941 84.3526 395.924 84.3526H380.807V40.8557H395.924C407.941 40.8557 417.681 50.5923 417.681 62.6026ZM429.801 150.095C429.801 162.105 420.061 171.845 408.044 171.845H380.807V128.345H408.044C420.061 128.345 429.801 138.085 429.801 150.095ZM301.009 99.867C308.745 89.4576 313.325 76.569 313.325 62.6026C313.325 28.0293 285.29 0 250.706 0H196.525V212.722H263.755C298.339 212.722 326.376 184.693 326.376 150.12C326.376 129.51 316.385 111.267 301.012 99.8639L301.009 99.867ZM273.37 62.6026C273.37 74.616 263.63 84.3526 251.613 84.3526H236.496V40.8557H251.613C263.627 40.8557 273.37 50.5923 273.37 62.6026ZM285.49 150.095C285.49 162.105 275.75 171.845 263.733 171.845H236.493V128.345H263.733C275.747 128.345 285.49 138.085 285.49 150.095ZM126.36 212.725H187.34L122.114 0L66.0878 0.0840972L0.892578 212.725H61.8754L94.1163 39.2827L126.36 212.722V212.725Z" fill="#0D0D0D" />
                        </svg>
                        <ul className="foodnote__urls">
                            <li className="foodnote__url">Algemene voorwaarden</li>
                            <li className="foodnote__url">Privacy policy</li>
                            <li className="foodnote__url">UiTPAS-partner</li>
                        </ul>
                    </div>
                </footer>
            </>
        </>
    )
};

export default Footer