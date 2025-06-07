//react
import { useState } from "react";

//extarnal components //calender stuff
//https://daypicker.dev/start
//https://daypicker.dev/guides/input-fields
import { addMonths } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

//components
import Title from "../molecules/title";
import ToggleButton from "../molecules/toggleButton"
import ButtonBack from './buttonBack';
import QrCode from "./qr-code";

const Time = ({ setFormState, formState, setFlowForm, flowForm }) => {
    const [timeState, setTimeState] = useState("Later");

    const today = new Date();
    const nextMonth = addMonths(today, 1);
    const [month, setMonth] = useState(nextMonth);

    const handleClickNext = () => {
        if (timeState === 'Later') {
            setFlowForm("plan");
            setFormState(formState + 1);
        } else {
            setFlowForm("planNow");
            setFormState(formState + 1);
        }
    }

    return (
        <>
            <ButtonBack setFormState={setFormState} formState={formState} flowForm={flowForm}>Terug</ButtonBack>
            <Title title={"Wanneer is je Abbymoment?"} />
            <ToggleButton content1={"Nu"} content2={"Later"} state={timeState} setState={setTimeState} />
            {
                timeState === 'Later'
                    ? <>
                        <DayPicker
                            navLayout="around"
                            captionLayout="dropdown"
                            month={month}
                            onMonthChange={setMonth}
                            firstWeekContainsDate={0}
                            mode="single"
                            required
                            animate
                            weekStartsOn={1}
                            disabled={{
                                before: new Date(),
                                dayOfWeek: [1]
                            }}
                        />
                        <button onClick={() => setMonth(today)}>Go to Today</button>
                    </>
                    : ""
            }
            <button onClick={handleClickNext}>volgende stap</button>
        </>

    )
};

export default Time;