import Button from "../molecules/button";
import Title from "../molecules/title";

const AndYou = () => {
    return (
        <div className='andYou'>
            <Title
                title={"En jij? Hoe ga jij je dag vullen?"}
            />
            {/* image and text */}
            <Button link={'/'}>
                Begin jouw Abbymoment
            </Button>
        </div >
    )
};

export default AndYou;