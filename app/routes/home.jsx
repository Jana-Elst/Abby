import ClockList from "../components/clockList";
import { getMuseumClocks } from "../services/data";

export async function clientLoader(){
    const museumClocks = await getMuseumClocks();
    console.log(museumClocks);
    
    return {museumClocks};
}


const HomeCampaignRoute = ({ loaderData }) => {
    const { museumClocks } = loaderData

    return (
        <>
            <p>campaign</p>
            <ClockList clocks={museumClocks}/>
        </>

    )
};

export default HomeCampaignRoute;