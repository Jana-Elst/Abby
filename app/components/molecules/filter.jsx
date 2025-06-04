import './filter.css'

import { useState } from 'react';
import FilterItem from "../molecules/filterItem";
import Checkbox from './checkbox';
import Calender from './calender';

const Filter = () => {
    const [filterState, setFilterState] = useState('close');

    const [locationState, setLocationState] = useState(
        {
            accordion: 'close',
            selection: []
        }
    );

    const [dateState, setDateState] = useState(
        {
            accordion: 'close',
            selection: ""
        }
    );

    const [joinState, setJoinState] = useState(
        {
            accordion: 'close',
            selection: ""
        }
    );

    const handleClick = () => {
        console.log(filterState);
        if (filterState === 'close') {
            setFilterState('open');
        } else {
            setFilterState('close');
            setLocationState({
                ...locationState,
                accordion: 'close'
            }
            );
            setJoinState({
                ...joinState,
                accordion: 'close'
            });

            console.log(joinState);
        }
    }

    return (
        //button filter --> make it a component
        <>
            <button onClick={handleClick}>Filter</button>
            <ul className={filterState}>
                <FilterItem title={'Locatie'} itemState={locationState} setItemState={setLocationState}>
                    <Checkbox
                        name='filterLocation'
                        content={['Het atelier', 'De living', 'Het salon', 'Abbycafé', 'De abdijtuin', 'tentoonstellingsruimte A', 'tentoonstellingsruimte B']}
                        state={locationState}
                        setState={setLocationState}
                    />
                </FilterItem>
                <FilterItem title={'Datum'} filterState={filterState} itemState={dateState} setItemState={setDateState}>
                    <Calender setState={setDateState} state={dateState} id={'filterDate'} />
                </FilterItem>
                <FilterItem title={'Deelnemen mogelijk'} filterState={filterState} itemState={joinState} setItemState={setJoinState}>
                    <Checkbox
                        name='filterJoin'
                        content={['niet mogelijk', 'wel mogelijk']}
                        state={joinState}
                        setState={setJoinState}
                    />
                </FilterItem>
            </ul>
        </>
    )
};

export default Filter;