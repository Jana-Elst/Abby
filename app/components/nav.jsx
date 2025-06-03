import Hamburger from "./hamburger";
import { useState } from 'react';
import { NavLink } from "react-router";

export default function Nav() {
    const [hamburgerOpen, setHamburgerOpen] = useState(true);

    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen)
    }

    return (
        <div>
            <div className="navigation">
                <div className="hamburger" onClick={toggleHamburger}>
                    <Hamburger isOpen={hamburgerOpen} />
                </div>
                {!hamburgerOpen &&
                    <ul>
                        <NavLink onClick={toggleHamburger} to={'/'}>Home</NavLink>
                        <NavLink onClick={toggleHamburger} to={'/alle-activiteiten'}>Alle activiteiten</NavLink>
                        <NavLink onClick={toggleHamburger} to={'/activiteit-maken'}>Maak een activiteit</NavLink>
                        <NavLink onClick={toggleHamburger} to={'/mijn-activiteiten'}>Mijn Activiteiten</NavLink>
                    </ul>
                }

            </div>

        </div>
    )

}