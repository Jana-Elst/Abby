import { Form, useNavigate } from "react-router";

const AddClock = ({type, user}) => {
    const navigate = useNavigate();

    return (
        <>
        
            <p>type of clock: {type}</p>
            <Form key={user.id} id="clock-form" method="post">
                <input 
                    style={{ display: 'none' }}
                    name="userId"
                    defaultValue={user}
                    type="text"
                />
                
                <label style={{ display: 'grid' }}>
                    <span>Activity</span>
                    <input
                        name="activity"
                        placeholder="Abby activiteit"
                        type="text"
                    />
                </label>

                <label style={{ display: 'grid' }}>
                    <span>description</span>
                    <textarea
                        name="description"
                        placeholder="description Abby activiteit"
                       rows={5}
                       cols={20}
                    />
                </label>
                
                <button type="submit">Save</button>
                <button onClick={() => navigate(-1)} type="button">
                    Cancel
                </button>
            </Form >

        </>

    )
};

export default AddClock;