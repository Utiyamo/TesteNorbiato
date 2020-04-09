export function increment(map) {
    return {
        type: "INCREMENT",
        payload: map
    }
}

const update = (object) => {
    return{
        type: "UPDATE",
        payload: object
    }
}

export default {
    increment,
    update
}