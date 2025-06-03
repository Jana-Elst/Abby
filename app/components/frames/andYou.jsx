import Button from "../molecules/button";
import Title from "../molecules/title";

const AndYou = () => {
    return (
        <div className='andYou'>
            <Title
                title={"En jij? Hoe ga jij je dag vullen?"}
            />
            {/* image and text */}
            <Button
                link={'/'}
                content={'Begin jouw Abbymoment'}
            />
        </div >
    )
};

export default AndYou;