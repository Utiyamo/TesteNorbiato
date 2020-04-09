import React from 'react';

export default function Grid(props){
    const fieldy = props.campo.y;
    let render = new Array();

    function renderiza(){
        const array = new Array();
        let linha = '';
        const mapa = props.objeto;

        mapa.map(element => {
            if(element.y < fieldy-1){
                linha += element.data;
                console.log(linha);
            }
            else{
                linha += element.data;
                linha += '\n';
                array.push(linha);

                linha = '';
            }
        })
        console.log(JSON.stringify(array));

        render = array;
        
    }

    renderiza();

    return(
        <>
            {render.map(element => (
                <>
                <label>{element}</label><br/>
                </>
            ))}
        </>
    )
}