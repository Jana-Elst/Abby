import { useState } from 'react';

const FilterItem = ({ title, itemState, setItemState, children }) => {

    const handleClick = () => {
        if (itemState.accordion === 'close') {
            setItemState(
                {
                    ...itemState,
                    accordion: 'open'
                }
            );
        } else {
            setItemState(
                {
                    ...itemState,
                    accordion: 'close'
                }
            );
        }

        console.log(itemState);
    }

    return (
        <li>
            <button onClick={handleClick}>{title}</button>
            <div className={itemState.accordion}>
                {children}
            </div>
        </li>
    )
};

export default FilterItem;