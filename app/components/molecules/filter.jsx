import './filter.css'

import { useState } from 'react';
import { Form } from 'react-router';

//components
import FilterItem from './filterItem'
import FilterSmall from './filterSmall';

import filterX from "../../src/assets/filter-x.svg";
import filterIcon from "../../src/assets/filter-filter.svg";

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
                <div className="filter__btns">
                    <Button extraClass="filter__state  orange__bg" type={filterState.general === 'close' ? 'submit' : 'button'} click={handleClick}>
                        <p className="btn__text">{filterState.general === 'close' ? 'filter' : 'close'}</p>
                        <img className='btn__icon' src={filterState.general === 'close' ? filterIcon : filterX} alt="icon" />
                    </Button>

                    {/* show or remove delete all filters button */}
                    {
                        filterState.general !== 'close'
                            ? <Button extraClass="filter__btn" click={handleRemoveAll}>Verwijder alle filters</Button>
                            : ""

                    }

                    {/* show selected filters */}
                    {
                        filterState.general === 'close'
                            ? <FilterSmall extraClass="filter__btn" filterState={filterState} setFilterState={setFilterState} />
                            : ""
                    }
                </div>


                <ul className={filterState.general}>
                    {/* <FilterItem title={'location'} filterState={filterState} setFilterState={setFilterState}>
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
                    </FilterItem> */}
                    <div className="filters__time">
                        <p className="filters__title h4">Datum</p>
                        <TimeInput extraClass="filters__date" formData={filterState} setFormData={setFilterState} />
                        <p className="filters__btn orange__bg">Vandaag</p>
                        {/* hier moet een foreach waar all de datum staat die is geselecteerd */}
                        {/* <FilterItem checkbox={true} title={'Toon enkel momenten waar anderen aan kunnen deelnemen'} filterState={filterState} setFilterState={setFilterState} name={'joinSelection'}>
                    </FilterItem> */}
                    </div>
                    <FilterItem extraClass="fitlers__checkbox h4" checkbox={true} title={'Gemaakt door Abby'} filterState={filterState} setFilterState={setFilterState} name={'abbySelection'}>
                    </FilterItem>
                </ul>
            </Form>
        </>
    )
};

export default Filter;