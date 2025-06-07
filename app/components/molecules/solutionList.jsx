import SolutionCard from "./solutionCard";

const SolutionList = () => {
    return (
        <ul>
            <SolutionCard
                id={1}
                title={"Vind een plaats om los te koppelen."}
                description={"In een wereld die nooit stopt, heb je recht op stilte."}
            />
            <SolutionCard
                id={2}
                title={"Vind een plaats om los te koppelen."}
                description={"In een wereld die nooit stopt, heb je recht op stilte."}
            />
            <SolutionCard
                id={3}
                title={"Vind een plaats om los te koppelen."}
                description={"In een wereld die nooit stopt, heb je recht op stilte."}
            />
        </ul>
    )
};

export default SolutionList;