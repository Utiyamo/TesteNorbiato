import React, { Component } from 'react';

class Grid extends Component{
    constructor(props){
        super(props);
        this.state = {
            rows: props.rows,
            line: ''
        }
    }

    render(){
        return(
            <div>
                {
                    this.state.rows.map((row) => {
                        this.setState({line: ''});
                        row.map((column) => {
                            let lineatu = this.state.line + column.data;

                            this.setState({line: lineatu});
                        })
                        return(
                            <label>{this.state.line}</label>
                        )
                    })
                }
            </div>
        );
    }
}