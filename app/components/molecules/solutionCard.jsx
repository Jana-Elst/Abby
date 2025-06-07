const SolutionCard = ({id, title, description, image}) => {
    return (
        <li>
            <p>{id}</p>
            <p>{title}</p>
            <p>{description}</p>
        </li>
    )
};

export default SolutionCard;