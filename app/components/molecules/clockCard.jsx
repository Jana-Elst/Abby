//react
import { Link } from "react-router";
import { useContext } from "react";

//root variables
import { UserContext } from '../../context/UserContext';

//components
import Clock from "../atoms/clock";
import ButtonClockCard from "./buttonClockCard";

//functions
import { getTime } from "../../services/clock";
import arrow from "../../src/assets/arrow-right.svg";

import './clockCard.css';

const ClockCard = ({ clock, clockProfile }) => {
    const { userId } = useContext(UserContext);
    const participants = clockProfile.filter(cp => cp.clock_id === clock.id).map(cp => cp.profile_id);

    return (
        <>
            <li className="card">
                <Link to={`${import.meta.env.BASE_URL}abbymomenten/${clock.id}`}>
                    <div className="card__top">
                        { //show 'maker'
                            userId === clock.creator
                            && <p className="card__type purple__bg">Maker</p>
                        }
                        {
                            //show participant
                            userId == !clock.creator && participants.includes(userId)
                            && <p className="card__type green__bg">Deelnemer</p>
                        }
                        <div className="card__info">
                            { //show start time (only if clock is scheduled)
                                clock.startTime
                                    ? ""
                                    : (
                                        <>
                                            <div className="card__time">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <circle cx="8" cy="8" r="6.75" stroke="black" strokeWidth="1.5" />
                                                    <path d="M8 7.99986L8 1.57129" stroke="black" strokeWidth="1.5" />
                                                </svg>
                                                <p>{getTime(clock.scheduledStartTime).time}</p>
                                            </div>
                                            <div className="card__date">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.09093 2.5H5.7273V3.86364H3.68184H3L3.00002 17.5H3.68184H17.3182H18V3.86364H17.3182H15.2728V2.5H13.9091V3.86364H7.09093V2.5ZM4.36366 7.95455V5.22727H16.6364V7.95455H4.36366ZM4.36366 9.31818V16.1364H16.6364V9.31818H4.36366Z" fill="black" />
                                                </svg>
                                                <p>{getTime(clock.scheduledStartTime).date}</p>
                                            </div>
                                        </>
                                    )
                            }

                            { //show participant (only of you can participate)
                                clock.private
                                    ? ""
                                    :
                                    <div className="card__people">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                            <path d="M9.16699 2.09961C10.9423 2.09981 12.4004 3.55857 12.4004 5.33301C12.4003 5.9155 12.2409 6.46267 11.9668 6.93652C10.9648 7.25366 10.2037 8.12775 10.0547 9.19141C9.76633 9.13587 9.46998 9.10452 9.16699 9.10449C6.78621 9.10449 4.77868 10.8842 4.29199 13.3047L4.25 13.54L4.23145 13.6562H8.30371C7.99324 14.1361 7.75188 14.6671 7.59082 15.2334H2.60156C2.62138 13.7635 3.07562 12.1859 3.83984 10.8525C4.62207 9.48792 5.72188 8.38875 6.99609 7.91699L7.15234 7.85938L7.02832 7.74902C6.35829 7.15478 5.9337 6.28987 5.93359 5.33301C5.93359 3.55845 7.39154 2.09961 9.16699 2.09961ZM9.16699 3.67676C8.2427 3.67676 7.51172 4.40792 7.51172 5.33301C7.51191 6.25791 8.24282 6.98828 9.16699 6.98828C10.091 6.98809 10.8211 6.25779 10.8213 5.33301C10.8213 4.40805 10.0911 3.67695 9.16699 3.67676Z" fill="black" stroke="white" strokeWidth="0.2" />
                                            <path d="M13.1672 7.3335C11.7027 7.3335 10.5006 8.53579 10.5006 9.99963C10.5006 10.7894 10.8509 11.5026 11.4032 11.9924C9.31824 12.7643 7.83398 15.5724 7.83398 17.9998C8.10078 17.9998 8.10073 17.9998 8.04229 17.9998C8.10073 17.9998 8.3566 18.0001 8.54525 18.0001H13.1672H17.7892C17.9778 18.0001 18.1007 17.9998 18.2922 17.9998C18.5007 17.9998 18.5005 17.9998 18.5005 17.9998C18.5005 15.5724 17.0163 12.7643 14.9314 11.9924C15.4836 11.5026 15.8339 10.7894 15.8339 9.99963C15.8339 8.53579 14.6318 7.3335 13.1672 7.3335ZM13.1672 8.75529C13.8625 8.75529 14.4112 9.30374 14.4112 9.99963C14.4112 10.6955 13.8625 11.244 13.1672 11.244C12.472 11.244 11.9232 10.6955 11.9232 9.99963C11.9232 9.30374 12.472 8.75529 13.1672 8.75529ZM13.1672 13.0973C15.0897 13.0973 16.707 14.5812 17.0216 16.5783H13.1672H9.31289C9.62748 14.5812 11.2447 13.0973 13.1672 13.0973Z" fill="black" />
                                        </svg>
                                        <p className="card__participants">{participants.length}</p>
                                    </div>
                            }
                        </div>
                    </div>
                    {clock.startTime && !clock.stopTime && (participants.includes(userId) || userId === clock.creator) ? (
                        <>
                            <div className={`card__active ${userId === clock.creator ? `purple__bg` : `green__bg`}`}>
                                <div className="card__middle--active">
                                    <p className="card__name h4 card__name--active">{clock.name}</p>
                                    <div className="card__clock card__clock--active">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="156" height="156" viewBox="0 0 91 91" fill="none">
                                            <circle cx="45.5" cy="45.5" r="43.5" stroke="black" strokeWidth="3" />
                                            <mask id="path-2-inside-1_1522_32842" fill="white">
                                                <path d="M45.5 0.5C57.4347 0.5 68.8807 5.24106 77.3198 13.6802L45.5 45.5V0.5Z" />
                                            </mask>
                                            <path d="M45.5 0.5C57.4347 0.5 68.8807 5.24106 77.3198 13.6802L45.5 45.5V0.5Z" fill="black" stroke="black" strokeWidth="2" mask="url(#path-2-inside-1_1522_32842)" />
                                        </svg>
                                    </div>
                                </div>
                                <img className='btn__icon btn__card__arrow btn__card__arrow--active' src={arrow} alt="een pijl" />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="card__middle">
                                <p className="card__name h4">{clock.name}</p>
                                    <Clock className={"card__clock"} canvasSize={"120"} clock={clock} />
                            </div>
                            <ButtonClockCard userId={userId} clock={clock} participants={participants} />
                        </>
                    )}
                </Link>
            </li>
        </>
    )
};

export default ClockCard;