//react
import { useState } from "react";

//extarnal components //calender stuff
//https://daypicker.dev/start
//https://daypicker.dev/guides/input-fields
import { addMonths, format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

//components
import Title from "../molecules/title";
import ToggleButton from "../molecules/toggleButton"
import ButtonBack from './buttonBack';
import QrCode from "./qr-code";
import ButtonNext from "./buttonNext";

const Time = ({ setFormState, formState, setFlowForm, flowForm, formData, flowKey, setFormData }) => {
    const [timeState, setTimeState] = useState("Later");

    const today = new Date();
    const nextMonth = addMonths(today, 1);
    const [month, setMonth] = useState(nextMonth);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedDate, setSelectedDate] = useState(undefined);
    const [inputValue, setInputValue] = useState("");


    const handleClickNext = () => {
        if (timeState === 'Later') {
            setFlowForm("plan");
            setFormState(formState + 1);
        } else {
            setFlowForm("planNow");
            setFormState(formState + 1);
        }
    }

    const handleDayPickerSelect = (date) => {
        console.log(formData);

        if (!date) {
            setInputValue("");
            setSelectedDate(undefined);
        } else {
            setSelectedDate(date);
            setMonth(date);
            setInputValue(format(date, "MM/dd/yyyy"));

            setFormData({
                ...formData,
                scheduledStartTime: date,
            });
        }
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        const parsedDate = parse(e.target.value, "MM/dd/yyyy", new Date());

        if (isValid(parsedDate)) {
            setFormData({
                ...formData,
                scheduledStartTime: parsedDate,
            });
        }
    };

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
                            animate
                            weekStartsOn={1}
                            disabled={{
                                before: new Date(),
                                dayOfWeek: [1]
                            }}
                            onSelect={handleDayPickerSelect}
                            required
                        />
                        <button onClick={() => setMonth(today)}>Go to Today</button>
                    </>
                    : ""
            }
            <ButtonNext setFormState={setFormState} formState={formState} flowForm={flowForm} flowKey={flowKey} formData={formData}>Volgende stap</ButtonNext>
        </>

    )
};

export default Time;