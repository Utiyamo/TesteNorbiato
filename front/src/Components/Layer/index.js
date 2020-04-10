import React from 'react';
import Grid from '../Grid';

export default function Layer(props){
    return(
        <ul>
            {props.data.map.length > 0 ? 
                <li>
                    <label>Dia: {props.data.daysForAll}</label>
                    <br/>
                    <Grid objeto={props.data.map} campo={props.campo}/>
                </li>
                :
                undefined
            }
        </ul>
    )
}