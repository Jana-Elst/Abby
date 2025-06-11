import { useContext } from 'react'
import Title from "../components/molecules/title";
import Button from "../components/molecules/button"
import { UserContext } from '../context/UserContext';

import { getTime } from "../services/clock";

//get clock
import { getClock } from "../services/data";
export async function clientLoader({ params }) {
    const id = params.abbymomentId;
    console.log(id);

    //get data clock
    let clock = await getClock(id);
    clock = clock[0];
    console.log(clock);
    return { clock };
}


const DetailClock = ({ loaderData }) => {
    const userId = "";
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
            {
                clock.private
                    ? (<button>Je kan niet meedoen aan dit Abbymoment</button>)
                    : !clock.private && userId
                        ? (<button>Doe mee met dit Abbymoment</button>)
                        : <Button link={'log-in'}>Log-in</Button>
            }
        </>
    )
};

export default DetailClock;