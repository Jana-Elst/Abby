export default function Hamburger({ isOpen, toggleHamburger }) {
    return (
        <>
            <svg style={{ width:'0', height:'0' }}>
                {isOpen ?
                    <symbol id="navicon" xmlns="http://www.w3.org/2000/svg" width="27" height="18" viewBox="0 0 27 18" fill="none">
                        <path d="M0 9H27M0 1H27M0 17H27" stroke="black" strokeWidth="2" />
                    </symbol>
                    :
                    <symbol id="navicon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M1 1L19 19" stroke="black" strokeWidth="2" />
                        <path d="M19 1L0.999999 19" stroke="black" strokeWidth="2" />
                    </symbol>}
            </svg>

            <div className="hamburger" onClick={toggleHamburger}>
                <svg className="header__hamburger__svg">
                    <title id="svg-title">Menu</title>
                    <use className="header__hamburger__icon" id="iconlink" xlinkHref="#navicon"></use>
                </svg>
            </div>

        </>
    )
}