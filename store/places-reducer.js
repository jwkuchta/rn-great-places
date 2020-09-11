const initState = {
    places: [],

}

export default (state = initState, action) => {
    switch (action.type) {
        case 'something':
            return state
        default:
            return state
    }
}