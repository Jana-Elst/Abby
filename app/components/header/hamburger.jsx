export default function Hamburger({ isOpen }) {
    return (
        <>
            <svg style={{ display: 'none' }}>
                {isOpen ?
                    <symbol id="navicon" xmlns="http://www.w3.org/2000/svg" width="27" height="18" viewBox="0 0 27 18" fill="none">
                        <path d="M0 9H27M0 1H27M0 17H27" stroke="black" stroke-width="2" />
                  </symbol>
                    :
                    <symbol id="navicon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M1 1L19 19" stroke="black" stroke-width="2" />
                        <path d="M19 1L0.999999 19" stroke="black" stroke-width="2" />
                    </symbol>}
            </svg>

            <button style={{ width: "2rem", height: "2rem", backgroundColor: 'transparent', border: "none" }} className="nav__button" >
                <svg style={{ width: "2rem", height: "2rem" }} role="img" focusable="false">
                    <title id="svg-title">Menu</title>
                    <use id="iconlink" xlinkHref="#navicon"></use>
                </svg>
            </button>

        </>
    )
}