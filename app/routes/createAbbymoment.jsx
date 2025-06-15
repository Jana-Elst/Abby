//https://blog.logrocket.com/build-multi-step-form-usestate-hook/

//react imports
import { Form, redirect, Navigate, useLocation } from "react-router";
import { useState, useContext } from "react";

//components
import Confirmation from "../components/form/confirmation";
import Description from "../components/form/description";
import Location from "../components/form/location";
import Participants from "../components/form/participants";
import QrCode from "../components/form/qr-code";
import Time from "../components/form/time";
import VisabilityClock from "../components/form/visability-clock";
import ScheduledClocks from "../components/form/scheduledClocks";
import StartClock from "../components/form/startClock";


//services
import { addScheduledClock, startOnlineClock, startWallClock } from "../services/data";

//root variables
import { UserContext } from '../context/UserContext';
import { FormFlowContext } from '../context/FormFlowContext';

//add abbymoment
/* mag deze dan weg? */
export async function clientAction({ request }) {
    console.log('submitttt');
    const formData = await request.formData();

    //different data
    const name = formData.get("name");
    const userId = formData.get("userId");
    const description = formData.get("description");
    const scheduledStartTime = formData.get("time");
    const prive = formData.get("participants");
    const location = formData.get("location");
    const flowForm = formData.get("flowForm");
    const clockId = formData.get("clockId");

    let data;

    if (flowForm === 'plan' || flowForm === 'restartMoment') {
        data = await addScheduledClock(userId, name, description, scheduledStartTime, prive, location);
    } else if (flowForm === 'planNow' || flowForm === 'now' || flowForm === 'restartMomentNow' || flowForm === 'startScheduled') {
        console.log('startNow');
        //if clock is in on the wall, the row of the clock needs an update
        if (clockId) {
            data = await startWallClock(clockId, name, description, prive, location)
        } else {
            console.log('stuurt de juiste data door');
            //if the clock is now, but online, a new row in the database should be made
            data = await startOnlineClock(userId, name, description, prive, location);
        }
    }
    console.log(data);
    return redirect(`${import.meta.env.BASE_URL}maak-een-abbymoment/formulier?clockId=${data.id}`);
}

const handleSubmit = async (formData, setFormData) => {
    setFormData({
        ...formData,
        state: formData.state + 1
    });
}

const CreateAbbymoment = () => {
    const { userId } = useContext(UserContext);
    const { flowForm, setFlowForm } = useContext(FormFlowContext);

    //if restart
    const location = useLocation();

    const [formData, setFormData] = useState(() => {
        if (location.state) {
            const clock = location.state.clock[0]
            console.log('doorgestuurde klok', clock);

            let clockId = '';
            if (flowForm === 'startScheduled') {
                clockId = clock.id;
            }

            console.log(clockId);
            console.log(flowForm);
            return {
                clockId: clockId,
                name: clock.name,
                startTime: undefined,
                stopTime: undefined,
                clockWallPos: '',
                descricription: clock.description,
                private: clock.private,
                scheduledStartTime: '',
                scheduledStopTime: undefined,
                creator: userId,
                location: clock.location,
                state: 0,
                flow: flowForm
            }
        } else {
            return {
                clockId: '',
                name: '',
                startTime: undefined,
                stopTime: undefined,
                clockWallPos: '',
                description: '',
                private: '',
                scheduledStartTime: '',
                scheduledStopTime: undefined,
                creator: userId,
                location: '',
                state: 0,
                flow: flowForm
            }
        }
    });

    //different flows
    const flows = {
        plan: ['description', 'time', 'location', 'participants', 'confirmation'],
        planNow: ['description', 'time', 'qrCode', 'visabilityClock', 'location', 'participants', 'confirmation'],
        now: ['visabilityClock', 'description', 'location', 'participants', 'confirmation'],
        startScheduled: ['qr-code', 'visabilityClock', 'startButton', 'confirmation'],
        restartMoment: ['time', 'confirmation'],
        restartMomentNow: ['time', 'qrCode', 'visabilityClock', 'startButton', 'confirmation']
    }

    const conditionalComponent = () => {
        const currentComponent = flows[flowForm][formData.state];
        console.log('currentComp', currentComponent);

        switch (currentComponent) {
            case 'visabilityClock':
                return <VisabilityClock formData={formData} setFormData={setFormData} />

            case 'description':
                return <Description formData={formData} setFormData={setFormData} />

            case 'location':
                return <Location formData={formData} setFormData={setFormData} />

            case 'startButton':
                return <StartClock formData={formData} setFormData={setFormData} />

            case 'participants':
                return <Participants formData={formData} setFormData={setFormData} />


            case 'qrCode':
                return <QrCode flowForm={flowForm} setFlowForm={setFlowForm} formData={formData} setFormData={setFormData} />


            case 'time':
                return <Time setFlowForm={setFlowForm} flowForm={flowForm} flows={flows} formData={formData} setFormData={setFormData} />

            case 'confirmation':
                return <Confirmation setFlowForm={setFlowForm} formData={formData} setFormData={setFormData} />

            case 'scheduledClocks':
                return <ScheduledClocks flowForm={flowForm} formData={formData} setFormData={setFormData} />
        }
    }

    if (userId) {
        return (
            <>
                <Form key={userId} id="abbymomentForm" method="post" onSubmit={() => handleSubmit(formData, setFormData)}>
                    <input type="hidden" name="userId" value={userId} />
                    <input type="hidden" name="name" value={formData.name} />
                    <input type="hidden" name="description" value={formData.description} />
                    {/* <input type="hidden" name="clockWallPos" value={clockWallPos} /> */}
                    <input type="hidden" name="participants" value={formData.private} />
                    <input type="hidden" name="time" value={formData.scheduledStartTime} />
                    <input type="hidden" name="location" value={formData.location} />
                    <input type="hidden" name="flowForm" value={flowForm} />
                    <input type="hidden" name="clockId" value={formData.clockId || ''} />

                    {conditionalComponent()}
                </Form>
            </>

        )
    } else {
        return <Navigate to={`${import.meta.env.BASE_URL}maak-een-abbymoment`} />
    }
};

export default CreateAbbymoment;