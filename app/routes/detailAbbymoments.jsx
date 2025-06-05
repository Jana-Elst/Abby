import { useMatch } from "react-router-dom";

import Title from "../components/molecules/title";
import Button from "../components/molecules/button"

import { getTime } from "../services/clock";

//get clock
import { getClock } from "../services/data";
export async function clientLoader() {
    //get clock id --> last element from querystring
    let url = window.location.href;
    url = url.split('/');
    const id = url[url.length - 1];

    //get data clock
    let clock = await getClock(id);
    clock = clock[0];
    console.log(clock);
    return { clock };
}


const DetailClock = ({ loaderData }) => {
    const { clock } = loaderData;

    return (
        <>
            {/* //back button */}
            <Title title={clock.name} />
            <p>
                {
                    clock.startTime
                        ? getTime(clock.startTime).date
                        : getTime(clock.sheduledStartTime).date
                }
            </p>
            <p>
                {
                    clock.startTime
                        ? getTime(clock.startTime).time
                        : getTime(clock.sheduledStartTime).time
                }
            </p>
            <p>Klok</p>
            <p>
                {
                    clock.description
                        ? clock.description
                        : ""
                }
            </p>
            <p>deelnemers</p>
            <button>
                {
                    clock.private
                        ? "Je kan niet meedoen aan dit Abbymoment"
                        : "Doe mee met dit Abbymoment"

                }
            </button>
        </>
    )
};

export default DetailClock;