const currentMap = (state = [], action) => {
    switch(action.type){
        case "INCREMEMT":
            return{
                ...state,
                map: action.payload
            }

        case "UPDATE":
            for(let map in state){
                if(map.days === action.payload.days){
                    return {
                        ...state,
                        map: action.payload
                    }
                }
            }
    }
}