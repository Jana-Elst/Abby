import './filter.css'

import { useState } from 'react';
import { Form } from 'react-router';

//components
import FilterItem from './filterItem'
import FilterSmall from './filterSmall';

//components
import Button from './button';
import TimeInput from '../form/timeInput'

//functions
import { locations } from '../../services/museumData'

const Filter = () => {
    const [filterState, setFilterState] = useState(
        {
            general: 'close',
            location: 'close',
            datum: 'close',

            locationSelection: [],
            datumSelection: [],
            abbySelection: false,
            joinSelection: false
        }
    );

    const handleClick = () => {
        console.log(filterState);
        if (filterState.general === 'close') {
            setFilterState({
                ...filterState,
                general: 'open'
            });
        } else {
            setFilterState({
                ...filterState,
                general: 'close',
                datum: 'close',
                location: 'close'
            });
        }
    }

    const handleRemoveAll = () => {
        setFilterState({
            ...filterState,
            locationSelection: [],
            datumSelection: [],
            abbySelection: false,
            joinSelection: false
        })
    }

    const onChange = (e, name) => {
        const value = e.target.value;
        const selectionName = `${name}Selection`
        let newSelection = [...filterState[selectionName]]

        if (e.target.checked) {
            newSelection.push(value);
        } else {
            newSelection = newSelection.filter(item => item !== value);
        }

        setFilterState({
            ...filterState,
            [selectionName]: newSelection
        });
    }

    return (
        <>
            <Form id="filter">
                <Button type={filterState.general === 'close' ? 'submit' : 'button'} click={handleClick} icon={filterState.general === 'close' ? '' : ''}>Filter</Button>

                {/* show or remove delete all filters button */}
                {
                    filterState.general === 'close' || !filterState.locationSelection.length > 0 && !filterState.datumSelection.length > 0 && !filterState.abbySelection && !filterState.joinSelection
                        ? ""
                        : <Button click={handleRemoveAll}>Verwijder alle filters</Button>

                }

                {/* show selected filters */}
                {
                    filterState.general === 'close'
                        ? <FilterSmall filterState={filterState} setFilterState={setFilterState} />
                        : ""
                }

                <ul className={filterState.general}>
                    <FilterItem title={'location'} filterState={filterState} setFilterState={setFilterState}>
                        {
                            locations.map(location => (
                                <div className=''>
                                    <input
                                        type="checkbox"
                                        id={location}
                                        name='location'
                                        value={location}
                                        onChange={(e) => onChange(e, 'location')}
                                        checked={filterState.locationSelection.includes(location)} />
                                    <label htmlFor={location}>{location}</label>
                                </div>
                            ))
                        }
                    </FilterItem>
                    <FilterItem title={'datum'} filterState={filterState} setFilterState={setFilterState}>
                        <TimeInput formData={filterState} setFormData={setFilterState} />
                    </FilterItem>
                    <FilterItem checkbox={true} title={'Toon enkel momenten waar anderen aan kunnen deelnemen'} filterState={filterState} setFilterState={setFilterState} name={'joinSelection'}>
                    </FilterItem>
                    <FilterItem checkbox={true} title={'Toon enkel momenten die gemaakt zijn door Abby'} filterState={filterState} setFilterState={setFilterState} name={'abbySelection'}>
                    </FilterItem>
                </ul>
            </Form>
        </>
    )
};

export default Filter;