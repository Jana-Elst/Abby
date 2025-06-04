import ClockList from "../components/molecules/clockList";
import Filter from "../components/molecules/filter";
import ToggleButton from "../components/molecules/toggleButton";

//load the museum clocks
import { getMuseumClocks } from "../services/data";
export async function clientLoader() {
    const museumClocks = await getMuseumClocks();
    console.log(museumClocks);

    return { museumClocks };
}

const Abbymoments = ({ loaderData }) => {
    const { museumClocks } = loaderData;

    return (
        <>
            <ToggleButton
                content1={'alle abbymomenten'}
                content2={'jouw abbymomenten'}
            />

            <Filter />
            <ClockList clocks={museumClocks} />
        </>

    )
};

export default Abbymoments;