import React, { Component } from 'react';
import axios from 'axios';

import Grid from '../Grid';

class Layer extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: props.dados
        }
    }

    render(){
        return(
            <div>
                {
                    this.state.data.map((item) => {
                        
                    })
                }
            </div>
        )
    }
}