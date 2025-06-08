//https://blog.logrocket.com/build-multi-step-form-usestate-hook/

//react imports
import { Form, redirect } from "react-router";
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

//services
import { addClock } from "../services/data";

//root variables
import { UserContext } from '../root';
import { FormFlowContext } from '../root';

//add abbymoment
export async function clientAction({ request }) {
    const formData = await request.formData();

    //different data
    const name = formData.get("name");
    const userId = formData.get("userId");
    const description = formData.get("description");
    const scheduledStartTime = formData.get("time");
    const prive = formData.get("participants");
    const location = formData.get("location");
    const flowForm = formData.get("flowForm"); // Add this hidden input

    console.log(formData.get("location"));
    console.log(userId, name, description, scheduledStartTime, prive, location);

    await addClock(userId, name, description, scheduledStartTime, prive, location, flowForm);
    return redirect(`${import.meta.env.BASE_URL}maak-een-abbymoment`);
}

const CreateAbbymoment = () => {
    const { userId, setUserId } = useContext(UserContext);
    const { flowForm, setFlowForm } = useContext(FormFlowContext);
    const [formState, setFormState] = useState(0);

    const [formData, setFormData] = useState({
        clockId: '',
        name: '',
        startTime: undefined,
        stopTime: undefined,
        clockWallPos: 'online',
        description: '',
        private: '',
        scheduledStartTime: new Date().toISOString(),
        scheduledStopTime: undefined,
        creator: userId,
        location: '',
    });

    const handleSubmit = () => {
        setFormState(formState + 1);
    }

    //different flows
    const flows = {
        plan: ['info', 'description', 'time', 'location', 'participants', 'confirmation'],
        planNow: ['info', 'description', 'time', 'qrCode', 'visabilityClock', 'location', 'participants', 'confirmation'],
        now: ['visabilityClock', 'description', 'location', 'participants', 'confirmation'] //moet er helemaal in het begin geen kezue optie kies geplande klok of maak klok?
    }

    const conditionalComponent = () => {
        const flowKey = flowForm ? flows[flowForm][formState] : null;

        switch (flowKey) {
            case 'info':
                return <Info setFormState={setFormState} formState={formState} userId={userId} />

            case 'visabilityClock':
                return <VisabilityClock flowKey={flowKey} setFormState={setFormState} formState={formState} flowForm={flowForm} formData={formData} setFormData={setFormData} />

            case 'description':
                return <Description flowKey={flowKey} setFormState={setFormState} formState={formState} formData={formData} setFormData={setFormData} />

            case 'location':
                return <Location flowKey={flowKey}  setFormState={setFormState} formState={formState} flowForm={flowForm} formData={formData} setFormData={setFormData} />


            case 'participants':
                return <Participants flowKey={flowKey} setFormState={setFormState} formState={formState} flowForm={flowForm} formData={formData} setFormData={setFormData} />


            case 'qrCode':
                return <QrCode setFormState={setFormState} formState={formState} flowForm={flowForm} setFlowForm={setFlowForm} formData={formData} setFormData={setFormData} />


            case 'time':
                return <Time flowKey={flowKey} setFormState={setFormState} formState={formState} setFlowForm={setFlowForm} formData={formData} setFormData={setFormData} flowForm={flowForm} />

            case 'confirmation':
                return <Confirmation setFormState={setFormState} formState={formState} flowForm={flowForm} formData={formData} setFormData={setFormData} />
        }
    }

    return (
        <>
            <Form key={userId} id="abbymomentForm" method="post" onSubmit={handleSubmit}>
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="name" value={formData.name} />
                <input type="hidden" name="description" value={formData.description} />
                {/* <input type="hidden" name="clockWallPos" value={clockWallPos} /> */}
                <input type="hidden" name="participants" value={formData.private} />
                <input type="hidden" name="time" value={formData.scheduledStartTime} />
                <input type="hidden" name="location" value={formData.location} />
                <input type="hidden" name="flowForm" value={flowForm} />

                {conditionalComponent()}
            </Form>
        </>

    )
};

export default CreateAbbymoment;