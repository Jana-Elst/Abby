const Title = ({children, extraClass}) => {
    return (
        <h2 className={extraClass}>{children}</h2>
    )
};

export default Title;