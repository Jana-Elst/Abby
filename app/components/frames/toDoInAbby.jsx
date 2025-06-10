import Title from "../molecules/title";

const ToDoInAbby = () => {
    return (
        <div className="toDoInAbby" id='Abby'>
            <div>
                <Title
                    title={"Abby"}>
                </Title>
                <p>Tijd om het wat rustiger aan te doen</p>
                <p>kom tot rust in onze living en laat je inspireren</p>
            </div>
            <div>
                combineer met
                <ul>
                    <li>ontmoet onbekenden</li>
                    <li>volg een workshop in het atelier</li>
                    <li>geniet van een koffie in het café</li>
                    <p>ontdek de tentoonstelling</p>
                </ul>
            </div>
        </div>
    )
};

export default ToDoInAbby;
