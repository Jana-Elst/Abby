export default function Hamburger({ isOpen }) {
    return (
        <>
            <svg style={{display: 'none'}}>
                {isOpen ?
                    <symbol id="navicon" viewBox="0 0 54 57" fill="none">
                        <path d="M17.1816 45.0682V20.5227" stroke="#1B1B1B" strokeWidth="3.68182" strokeLinecap="round" />
                        <path d="M36.8184 45.0682V20.5227" stroke="#1B1B1B" strokeWidth="3.68182" strokeLinecap="round" />
                        <path d="M27 45.6818V11.3182" stroke="#1B1B1B" strokeWidth="3.68182" strokeLinecap="round" />
                    </symbol>
                    :
                    <symbol id="navicon" viewBox="0 0 24 24" fill="#1B1B1B">
                        <path d="M19.1,17.7L6.3,4.9c-.4-.4-1-.4-1.4,0s-.4,1,0,1.4l12.7,12.7c.4.4,1,.4,1.4,0s.4-1,0-1.4Z" />
                        <path d="M6.3,19.1l12.7-12.7c.4-.4.4-1,0-1.4s-1-.4-1.4,0l-12.7,12.7c-.4.4-.4,1,0,1.4s1,.4,1.4,0Z" />
                    </symbol>}
            </svg>

            <button style={{ width: "2rem", height: "2rem", backgroundColor:'transparent', border:"none"}} className="nav__button" >
                <svg style={{ width: "2rem", height: "2rem"}} role="img" focusable="false">
                    <title id="svg-title">Menu</title>
                    <use id="iconlink" xlinkHref="#navicon"></use>
                </svg>
            </button>

        </>
    )
}