import { Form } from 'react-router';

const FilterSmall = ({ filterState, setFilterState }) => {
    const removeSelectedFilter = (e, item) => {
        let newState = { ...filterState };

        if (filterState.locationSelection.includes(item)) {
            newState.locationSelection = filterState.locationSelection.filter(loc => loc !== item);
        } else if (filterState.datumSelection.includes(item)) {
            newState.datumSelection = filterState.datumSelection.filter(date => date !== item);
        } else if (item === 'deelnemen mogelijk') {
            newState.joinSelection = false;
        } else if (item === 'gemaakt door Abby') {
            newState.abbySelection = false;
        }

        setFilterState(newState);
    }

    const allSelectedFilters = [
        ...filterState.locationSelection,
        ...filterState.datumSelection,
        ...(filterState.joinSelection ? ['deelnemen mogelijk'] : []),
        ...(filterState.abbySelection ? ['gemaakt door Abby'] : [])
    ];

    return (
        <Form id="smallFilter" onChange={(event) => submit(event.currentTarget)}>
            {
                allSelectedFilters.map(item => <div>
                    <input
                        type='checkbox'
                        id={item}
                        name={item}
                        checked={true}
                        onChange={(e) => removeSelectedFilter(e, item)} />
                    <label htmlFor={item}>{item}</label>
                </div>
                )
            }
        </Form >
    )
};

export default FilterSmall;