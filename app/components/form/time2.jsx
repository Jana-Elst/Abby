// react
import { useState } from "react";

// external calendar components
//https://daypicker.dev/start
//https://daypicker.dev/guides/input-fields
import { addMonths, parseISO } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

// components
import Title from "../molecules/title";
import ButtonBack from './buttonBack';
import ButtonNext from "./buttonNext";

const Time = ({ setFlowForm, formData, setFormData }) => {
    //calender stuff
    const today = new Date();
    const nextMonth = addMonths(today, 1);
    const [month, setMonth] = useState(nextMonth);
    const [selectedDate, setSelectedDate] = useState(new Date());

    //a function for the date
    const handleDayPickerSelect = (date) => {
        if (date) {
            setSelectedDate(date);
            setMonth(date);
            setFormData({
                ...formData,
                scheduledStartTime: date.toISOString()
            });
        }
    };

    //set correct things onChange toggle BTN
    const handleChangeFlow = (name) => {
        setFormData({
            ...formData,
            flow: name
        });
        setFlowForm(name);
    }

    return (
        <>
            <ButtonBack formData={formData} setFormData={setFormData}>Terug</ButtonBack>
            <Title>Wanneer is je Abbymoment?</Title>

            {/* toggle now later */}
            <div>
                <div>
                    <input type="radio"
                        id="planNow"
                        name="time"
                        value="planNow"
                        checked={flowForm === 'planNow'}
                        onChange={(e) => { handleChangeFlow('planNow') }}
                    />
                    <label htmlFor="planNow">Nu</label>
                </div>

                <div>
                    <input type="radio"
                        id="plan"
                        name="time"
                        value="plan"
                        checked={flowForm === 'plan'}
                        onChange={(e) => { handleChangeFlow('plan') }}

                    />
                    <label htmlFor="plan">Later</label>
                </div>
            </div>

            {/* show calender  & hour picker if later */}
            {
                flowForm === 'plan'
                    ? <>
                        {/* hour picker */}
                        

                        {/* calender */}
                        <DayPicker
                            navLayout="around"
                            captionLayout="dropdown"
                            month={month}
                            onMonthChange={setMonth}
                            mode="single"
                            selected={formData.scheduledStartTime ? parseISO(formData.scheduledStartTime) : undefined}
                            onSelect={handleDayPickerSelect}
                            weekStartsOn={1}
                            disabled={{
                                before: today,
                                dayOfWeek: [1],
                            }}
                            required
                        />
                        <button type='button' onClick={() => setMonth(today)}>Vandaag</button>
                    </>
                    : ""
            }

            <ButtonNext
                buttonType='button'
                setFormState={setFormState}
                formState={formState}
                flowForm={flowForm}
                flowKey={flowKey}
                formData={formData}
            > Volgende stap </ButtonNext>
        </>
    );
};

export default Time;
