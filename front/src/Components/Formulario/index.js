import React, { Component } from 'react';
import axios from 'axios';

class Formulario extends Component{
    constructor(props){
        super(props);
        this.state = {
            airport: 3,
            clound: 4,
            fieldx: 10,
            fieldy: 10,
        }

        this.startFields = this.startFields.bind(this);
    }

    componentDidMount(){
        axios.defaults.baseURL = 'http://localhost:3001/';
        axios.defaults.headers.post['Content-Type']='application/json;charset=utf-8';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    }

    async startFields(){
        console.log('Entrou');

        let url = 'http://localhost:3001/Iniciar';
        let data = {
            airport: this.state.airport,
            clounds: this.state.clound,
            fieldX: this.state.fieldX,
            fieldY: this.state.fieldy
        }

        const resp = await axios.post(url, data);
        console.log(JSON.stringify(resp));

    }

    render(){
        return(
            <div>
                <label>Aeroportos:</label>
                <input type='number' id='airport' name='airports' min='3' value={this.state.airport} onChange={(e) => this.setState({airport: e.target.value})}></input>
                <br/>

                <label>Núvens:</label>
                <input type='number' id='clound'  name='clounds' min='4' value={this.state.clound} onChange={(e) => this.setState({clound: e.target.value})}></input>
                <br/>

                <label>Medidas do Terreno:</label><br/>
                <label>Largura:</label>
                <input type='number' id='fieldx' name='fieldX' min='10' value={this.state.fieldx} onChange={(e) => this.setState({fieldx: e.target.value})}></input><br/>
                <label>Comprimento:</label>
                <input type='number' id='fieldy' name='fieldy' min='10' value={this.state.fieldy} onChange={(e) => this.setState({fieldy: e.target.value})}></input><br/>

                <br/>
                <button type='button' onClick={() => this.startFields()}>Começar Teste</button>
            </div>
        )
    }
}

export default Formulario;