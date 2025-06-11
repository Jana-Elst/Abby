import Hamburger from "./hamburger";
import { useState, useContext } from 'react';
import { NavLink } from "react-router";

//root variables
import { FormFlowContext } from '../../context/FormFlowContext';

export default function Nav() {
    const [hamburgerOpen, setHamburgerOpen] = useState(true);
    // const { flowForm, setFlowForm } = useContext(FormFlowContext);

    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen)
    }

    const changeFormFlowState = () => {
        // setFlowForm('schedule');
    }

    return (
        <div>
            <div className="navigation">
                <div className="hamburger" onClick={toggleHamburger}>
                    <Hamburger isOpen={hamburgerOpen} />
                </div>
                {!hamburgerOpen &&
                    <div>
                        <ul>
                            <NavLink onClick={toggleHamburger} to={`${import.meta.env.BASE_URL}`}>Startpagina</NavLink>
                            <NavLink onClick={toggleHamburger} to={`${import.meta.env.BASE_URL}abbymomenten`}>Alle Abbymomenten</NavLink>
                            <NavLink onClick={() => { toggleHamburger(); changeFormFlowState(); }} to={`${import.meta.env.BASE_URL}maak-een-abbymoment`}>Plan een Abbymoment</NavLink>
                            <NavLink onClick={toggleHamburger} to={`${import.meta.env.BASE_URL}log-in`}>Log in</NavLink>
                        </ul>
                        <ul>
                            <li>NL</li>
                            <li>FR</li>
                            <li>ENG</li>
                        </ul>
                    </div>
                }

            </div>

        </div>
    )

}