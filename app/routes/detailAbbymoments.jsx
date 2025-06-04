import { useMatch } from "react-router-dom";

const DetailClock = () => {
    const match = useMatch("/:firstRoute/:secondRoute/*");
    const id = match.params["*"];

    return (
        <>
            {/* //back button */}
            <p>Dit is de detailpage van klok {`${id}`}</p>
        </>
    )
};

export default DetailClock;