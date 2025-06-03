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
                        <NavLink onClick={toggleHamburger} to={`${import.meta.env.BASE_URL}`}>Home</NavLink>
                        <NavLink onClick={toggleHamburger} to={`${import.meta.env.BASE_URL}alle-activiteiten`}>Alle activiteiten</NavLink>
                        <NavLink onClick={toggleHamburger} to={`${import.meta.env.BASE_URL}activiteit-maken`}>Maak een activiteit</NavLink>
                        <NavLink onClick={toggleHamburger} to={`${import.meta.env.BASE_URL}mijn-activiteiten`}>Mijn Activiteiten</NavLink>
                    </ul>
                }

            </div>

        </div>
    )

}