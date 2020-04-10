import React from 'react';
import Grid from '../Grid';

export default function Histogram(props){
    return(
        <ul>
            {
                props.data.histogram.length > 0 ?
                    props.data.histogram.map(element => (
                        <li>
                            <label>Dia: {element.dia}</label>
                            <br/>
                            <Grid objeto={JSON.parse(element.mapa)} campo={props.campo}/>
                        </li>
                    )) 
                    :
                    undefined
            }
        </ul>
    )
}