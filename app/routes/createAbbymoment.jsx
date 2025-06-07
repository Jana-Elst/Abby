//https://blog.logrocket.com/build-multi-step-form-usestate-hook/

//react imports
import { Link, Form } from "react-router";
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
// export async function clientAction({ request }) {
//     const formData = await request.formData();
//     const activity = formData.get("title");
//     const userId = formData.get("userId");
//     const description = formData.get("description");

//     await addClock(userId, activity, description);
//     return redirect(`${import.meta.env.BASE_URL}`);
// }

const CreateAbbymoment = () => {
    const { userId, setUserId } = useContext(UserContext);
    const { flowForm, setFlowForm } = useContext(FormFlowContext);
    const [formState, setFormState] = useState(0);

    const [formData, setFormData] = useState({
        name: '',
        startTime: null,
        stopTime: null,
        clockWallPos: null,
        description: '',
        private: false,
        scheduledStartTime: null,
        scheduledStopTime: null,
        creator: userId
    });

    //different flows
    const flows = {
        plan: ['info', 'description', 'time', 'location', 'participants', 'confirmation'],
        planNow: ['info', 'description', 'time','qrCode', 'visabilityClock', 'location', 'participants', 'confirmation'],
        now: ['visabilityClock', 'description', 'location', 'participants', 'confirmation']
    }

    const conditionalComponent = () => {
        console.log(flows[flowForm][formState]);
        const flowKey = flowForm ? flows[flowForm][formState] : null;

        switch (flowKey) {
            case 'info':
                return <Info setFormState={setFormState} formState={formState} userId={userId} />

            case 'visabilityClock':
                return <VisabilityClock setFormState={setFormState} formState={formState} flowForm={flowForm} formData={formData} setFormData={setFormData} />

            case 'description':
                return <Description setFormState={setFormState} formState={formState} formData={formData} setFormData={setFormData} />

            case 'location':
                return <Location setFormState={setFormState} formState={formState} flowForm={flowForm} formData={formData} setFormData={setFormData} />


            case 'participants':
                return <Participants setFormState={setFormState} formState={formState} flowForm={flowForm} formData={formData} setFormData={setFormData} />


            case 'qrCode':
                return <QrCode setFormState={setFormState} formState={formState} flowForm={flowForm} setFlowForm={setFlowForm} formData={formData} setFormData={setFormData} />


            case 'time':
                return <Time setFormState={setFormState} formState={formState} setFlowForm={setFlowForm} formData={formData} setFormData={setFormData} />

            case 'confirmation':
                return <Confirmation setFormState={setFormState} formState={formState} flowForm={flowForm} formData={formData} setFormData={setFormData} />
        }
    }

    return (
        <>
            {/* <Form key={userId} id="abbymomentForm" method="post"> */}
                {conditionalComponent()}
                {/* <p>create a clock</p>
            <Link to={`${import.meta.env.BASE_URL}maak-activiteit`}>create a new clock</Link> */}
            {/* </Form> */}
        </>

    )
};

export default CreateAbbymoment;