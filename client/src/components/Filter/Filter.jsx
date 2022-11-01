import React from 'react'
import style from './Filter.module.css'
import Select from 'react-select';

export default function Filter(props) {



    return (
        <div className={style.filtersContain}  >
            <Select
                key={props.filterBy.map(el => el.id)}
                defaultValue={ { label: 'select the filters name', value: 'empty' }} 
                options={props.filterBy.map(elemnt => ({label: elemnt.name, value:elemnt.name, id: elemnt.id}))}
                onChange={(e) => props.onChangefilterby(e)}
            /> 
        </div>
    )
}




