'use strict'

class Interface {
 /*   async start_process(req, res, next){
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

        res.json(field);
        return next();
    }
*/

    async iniciar_contagem(req, res, next){
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

        const days = 0,
        daysforfirst = 0,
        stop_dayforfirst = false;
        
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

                let expancao = await expancao_fumaça(field, coordenadas);

                field = expancao.nfield;
                if(expancao.cobriu_airport)
                    stop_dayforfirst = true;

                days = days + 1;
                if(!stop_dayforfirst)
                    daysforfirst = daysforfirst + 1;
                
            }
            else
                const data_histogram = {
                    dia: days,
                    mapa: field
                }
                histogram.push(data_histogram);
                break;
        }

        const data = {
            dias: days,
            diasPrimeiroAeroporto: daysforfirst,
            mapa: field,
            histograma: histogram
        }

        res.json(data);
        return next();

    }
}

valida_coordenada = (field, x, y) =>{
    for(let i in field){
        let obj = field[i];

        if(obj.x === x && obj.y === y){
           return obj.data !== '. ' ? 0 : 1; 
        }
    }

    return -1;
}

valida_airports = (field) => {
    for(let i in field){
        return field[i].data === 'A ' ? true : false;            
    }
}

expancao_fumaça = (field, coordenadas) => {
    const nfield = field;
    const cobriu = false;

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

module.exports = new Interface;