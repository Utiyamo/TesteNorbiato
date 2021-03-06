import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Layer from '../Layer';
import Histogram from '../Histogram';

export default function Formulario(){
    const [airport, setAirport] = useState(3);
    const [clound, setClound] = useState(4);
    const [field, setField] = useState({
        x: 10,
        y: 10
    });
    const [response, setResponse] = useState({
        daysForAll: '',
        daysForFirst: '',
        map: [],
        histogram: []
    });

    function handleUpdateAirport(value){
        setAirport(value);
    }

    function handleUpdateClound(value){
        setClound(value);
    }

    function handleUpdateFieldX(value){
        const data = {
            x: value,
            y: field.y
        }

        setField(data);
    }

    function handleUpdateFieldY(value){
        const data = {
            x: field.x,
            y: value
        };

        setField(data);
    }

    function handleUpdateResponse(req){
        const dados = {
            daysForFirst: req.data.diasPrimeiroAeroporto,
            daysForAll: req.data.dias,
            map: req.data.mapa,
            histogram: req.data.histograma
        }

        setResponse(dados);
    }

    async function startFields(){
        let url = `http://localhost:8000/?airport=${airport}&clounds=${clound}&fieldX=${field.x}&fieldY=${field.y}`;

        const resp = await axios.get(url);
        
        handleUpdateResponse(resp);
    }

    useEffect(async () => {
        axios.defaults.baseURL = 'http://localhost:8000/';
        axios.defaults.headers.post['Content-Type']='application/json;charset=utf-8';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

        setAirport(3);
        setClound(4);
        setField({
            x: 10,
            y: 10
        });

    }, []);

    return(
        <div>
                <label>Aeroportos:</label>
                <input type='number' id='airport' name='airports' min='3' value={airport} onChange={(e) => handleUpdateAirport(e.target.value) }></input>
                <br/>

                <label>Núvens:</label>
                <input type='number' id='clound'  name='clounds' min='4' value={clound} onChange={(e) => handleUpdateClound(e.target.value) }></input>
                <br/>

                <label>Medidas do Terreno:</label><br/>
                <label>Largura:</label>
                <input type='number' id='fieldx' name='fieldX' min='10' value={field.x} onChange={(e) => handleUpdateFieldX(e.target.value)}></input><br/>
                <label>Comprimento:</label>
                <input type='number' id='fieldy' name='fieldy' min='10' value={field.y} onChange={(e) => handleUpdateFieldY(e.target.value)}></input><br/>
                <br/>
                <button type='button' onClick={startFields}>Começar Teste</button>

                <br></br>
                <label>Dias para cobrir todos os Aeroportos: {response.daysForAll}</label> <br/>
                <label>Dias para cobrir o primeiro Aeroporto: {response.daysForFirst}</label>

                <h2>Resultado Final</h2>
                <Layer data={response} campo={field}/><br/>

                <h2>Hist&oacute;rico</h2>
                <Histogram data={response} campo={field} />
            </div>
    )
}
