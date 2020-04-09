'use strict';

var IndexModel = require('../models/index');

function valida_coordenada(field, x, y){
    for(let i in field){
        let obj = field[i];

        if(obj.x === x && obj.y === y){
           return obj.data !== '. ' ? 0 : 1; 
        }
    }

    return -1;
}

function valida_airports(field){
    for(let i in field){
        if(field[i].data === 'A ')
            return true;
    }

    return false;
}

function expancao_fumaça(field, coordenadas){
    const nfield = field;
    let cobriu = false;

    for(var b in coordenadas){
        const i = coordenadas[b].x;
        const j = coordenadas[b].y;

        for(let a in field){
            if(field[a].x === (i-1) && field[a].y === j && field[a].data !== '* ' ){
                if(field[a].data === 'A ')
                    cobriu = true;
                nfield[a].data = '* ';
            }
            else if(field[a].x === i && field[a].y === (j-1) && field[a].data !== '* '){
                if(field[a].data === 'A ')
                    cobriu = true;
                nfield[a].data = '* ';
            }
            else if(field[a].x === i && field[a].y === (j+1) && field[a].data !== '* '){
                if(field[a].data === 'A ')
                    cobriu = true;
                nfield[a].data = '* ';
            }
            else if(field[a].x === (i+1) && field[a].y === j && field[a].data !== '* '){
                if(field[a].data === 'A ')
                    cobriu = true;
                nfield[a].data = '* ';
            }
            else
                continue;
        }
    
    }

    const retorno = {
        field: nfield,
        cobriu_airport: cobriu
    };

    return retorno;
}



module.exports = function (router) {

    var model = new IndexModel();

    router.get('/', function (req, res) {
        
        
        res.render('index', model);
        
        
    });


    router.post('/', async function iniciar_contagem(req, res, next){
        const message = {
            status: 0,
            message: ''
        }
        
        const body = req.body;

        if(!body.airport && body.airport < 3){
            let ret = message;
            ret.status = 401;
            ret.message = 'Falta de informações. Quantidade de aeroportos não equivalente com o necessário para o calculo.';

            res.send(ret);
            return next();
        }

        if(!body.clounds && body.clounds < 4){
            let ret = message;
            ret.status = 401;
            ret.message = 'Falta de informações. Quantidade de núvens não equivalente com o necessário para o calculo.';

            res.send(ret);
            return next();
        }

        if((!body.fieldX && body.fieldX < 10) && (!body.fieldY && body.fieldY < 10)){
            let ret = message;
            ret.status = 401;
            ret.message = 'Falta de informações. Tamanho do campo esta incompativel com o necessário para o calculo.';

            res.send(ret);
            return next();
        }

        const field = new Array();
        const histogram = new Array();

        //Preenche o FIELD
        for(let i = 0; i < body.fieldX; i++){
            for(let j = 0; j < body.fieldY; j++){
                const inf = {
                    x: i,
                    y: j,
                    data: '. '
                }

                field.push(inf);
            }
        }

        //Distribui os Aeroportos
        for(let i = 0; i < body.airport; i++){
            let x = Math.floor(Math.random()*(body.fieldX-0+1)+0);
            let y = Math.floor(Math.random()*(body.fieldY-0+1)+0);

            switch(await valida_coordenada(field, x, y)){
                case -1:
                    i--;
                    break;

                case 0:
                    i--;
                    break;

                case 1:
                    for(let i in field){
                        let obj = field[i];
                        
                        if(obj.x === x && obj.y === y)
                            obj.data = 'A ';
                    }

                    break;
            }
        }

        //Distribui as Núvens
        for(let i = 0; i < body.clounds; i++){
            let x = Math.floor(Math.random()*(body.fieldX-0+1)+0);
            let y = Math.floor(Math.random()*(body.fieldY-0+1)+0);
            
            switch(await valida_coordenada(field, x, y)){
                case -1:
                    i--;
                    break;

                case 0:
                    i--;
                    break;

                case 1:
                    for(let i in field){
                        let obj = field[i];
                        
                        if(obj.x === x && obj.y === y)
                            obj.data = '* ';
                    }

                    break;
            }
        }
        let days = 0,
        daysforfirst = 0;
        let stop_dayforfirst = false;
        
        while(true){
            if(await valida_airports(field)){
                const data_histogram = {
                    dia: days,
                    mapa: field
                }
                histogram.push(data_histogram);

                let coordenadas = new Array();
                for(let i in field){
                    if(field[i].data === '* '){
                        let data = {
                            x: field[i].x,
                            y: field[i].y
                        }

                        coordenadas.push(data);
                    }
                }

                const expancao = await expancao_fumaça(field, coordenadas);
                await(5000);

                for(let a in field){
                    field[a].data = expancao.field[a].data;
                }

                if(expancao.cobriu_airport)
                    stop_dayforfirst = true;

                days++;
                if(!stop_dayforfirst)
                    daysforfirst = daysforfirst + 1;
            }
            else{
                const datahistogram = {
                    dia: days,
                    mapa: field
                }
                histogram.push(datahistogram);
                break;
            }
        }

        const data = {
            dias: days,
            diasPrimeiroAeroporto: daysforfirst,
            mapa: field,
            histograma: histogram
        }

        res.json(data);
        return next();

    })

};
