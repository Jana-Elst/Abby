import { useState } from 'react';

const InfoButton = ({ children }) => {
    const [state, setState] = useState('close');

    return (
        state === 'close' ?
            (
                <button onClick={() => setState('open')}>info</button>
            ) : (
                <div>
                    <button onClick={() => setState('close')}>Close</button>
                    {children}
                </div>
            )
    )
};

export default InfoButton;