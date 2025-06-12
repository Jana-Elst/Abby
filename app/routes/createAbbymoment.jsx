//https://blog.logrocket.com/build-multi-step-form-usestate-hook/

//react imports
import { Form, redirect, Navigate } from "react-router";
import { useState, useContext } from "react";

//components
import Confirmation from "../components/form/confirmation";
import Description from "../components/form/description";
import Info from "../components/form/info";
import Location from "../components/form/location";
import Participants from "../components/form/participants";
import QrCode from "../components/form/qr-code";
import Time from "../components/form/time";
import VisabilityClock from "../components/form/visability-clock";
import ScheduledClocks from "../components/form/scheduledClocks";


//services
import { addScheduledClock, startOnlineClock, startWallClock } from "../services/data";

//root variables
import { UserContext } from '../context/UserContext';
import { FormFlowContext } from '../context/FormFlowContext';
import { id } from "react-day-picker/locale";

//add abbymoment
/* mag deze dan weg? */
export async function clientAction({ request }) {
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

    if (flowForm === 'plan') {
        await addScheduledClock(userId, name, description, scheduledStartTime, prive, location);
    } else if (flowForm === 'planNow' || flowForm === 'now') {
        //if clock is in on the wall, the row of the clock needs an update
        if (clockId) {
            await startWallClock(clockId, name, description, prive, location)
        } else {
            //if the clock is now, but online, a new row in the database should be made
            await startOnlineClock(userId, name, description, prive, location);
        }
    }
    return redirect(`${import.meta.env.BASE_URL}maak-een-abbymoment/formulier`);
}

const handleSubmit = async (formData, setFormData) => {
    setFormData({
        ...formData,
        state: formData.state + 1
    });
}

const CreateAbbymoment = () => {
    const { userId, setUserId } = useContext(UserContext);
    const { flowForm, setFlowForm } = useContext(FormFlowContext);

    const [formData, setFormData] = useState({
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
    });

    //different flows
    const flows = {
        plan: ['description', 'time', 'location', 'participants', 'confirmation'],
        planNow: ['description', 'time', 'qrCode', 'visabilityClock', 'location', 'participants', 'confirmation'],
        now: ['visabilityClock', 'description', 'location', 'participants', 'confirmation'],
        startScheduled: ['visabilityClock', 'scheduledClocks', 'confirmation']
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


            case 'participants':
                return <Participants formData={formData} setFormData={setFormData} />


            case 'qrCode':
                return <QrCode flowForm={flowForm} setFlowForm={setFlowForm} formData={formData} setFormData={setFormData} />


            case 'time':
                return <Time flowForm={flowForm} setFlowForm={setFlowForm} formData={formData} setFormData={setFormData} />

            case 'confirmation':
                return <Confirmation flowForm={flowForm} formData={formData} setFormData={setFormData} />

            case 'scheduledClocks':
                return <ScheduledClocks flowForm={flowForm} formData={formData} setFormData={setFormData} />
        }
    }

    if (userId) {
        return (
            <>
                <Form key={userId} id="abbymomentForm" method="post" onSubmit={e => handleSubmit(formData, setFormData)}>
                    <input type="hidden" name="userId" value={userId} />
                    <input type="hidden" name="name" value={formData.name} />
                    <input type="hidden" name="description" value={formData.description} />
                    {/* <input type="hidden" name="clockWallPos" value={clockWallPos} /> */}
                    <input type="hidden" name="participants" value={formData.private} />
                    <input type="hidden" name="time" value={formData.scheduledStartTime} />
                    <input type="hidden" name="location" value={formData.location} />
                    <input type="hidden" name="flowForm" value={flowForm} />
                    <input type="hidden" name="clockId" value={formData.clockId} />

                    {conditionalComponent()}
                </Form>
            </>

        )
    } else {
        return <Navigate to={`${import.meta.env.BASE_URL}maak-een-abbymoment`} />
    }
};

export default CreateAbbymoment;