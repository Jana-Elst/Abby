import './filter.css'

const FilterItem = ({ title, filterState, setFilterState, children, checkbox = null, name = null, extraClass }) => {
    const selectionName = `${title}Selection`

    const handleClick = () => {
        if (filterState[title] === 'close') {
            setFilterState(
                {
                    ...filterState,
                    [title]: 'open'
                }
            );
        } else {
            setFilterState(
                {
                    ...filterState,
                    [title]: 'close'
                }
            );
        }
    }

    const handleToggle = (e, newSelection) => {
        setFilterState({
            ...filterState,
            [newSelection]: e.target.checked
        });
    }

    if (!checkbox) {
        return (
            <li>
                <div>
                    <p>{title}</p>
                    {
                        filterState[selectionName]
                            ? <p>{filterState[selectionName].length}</p>
                            : ""
                    }
                    <button type='button' onClick={handleClick}>dropdown arrow</button>
                </div>
                <div className={filterState[title]}>
                    {children}
                </div>
            </li>
        )
    } else {
        return (
            <li>
                <div className={extraClass}>
                    <p>{title}</p>
                    <input
                        type="checkbox"
                        id={title}
                        name={title}
                        onChange={e => handleToggle(e, name)}
                        checked={filterState[name]} />
                </div>
            </li>
        )
    }
};

export default FilterItem;