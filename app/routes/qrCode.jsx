import { useContext } from "react";
import { Navigate } from "react-router";

import { FormFlowContext } from '../root';

const QrCode = () => {
    const { flowForm, setFlowForm } = useContext(FormFlowContext);

    if (flowForm === 'plan') {
        setFlowForm('now');
    }
    
    return <Navigate to={`${import.meta.env.BASE_URL}maak-een-abbymoment`} />
    
};

export default QrCode;