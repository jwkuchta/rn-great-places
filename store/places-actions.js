export const ADD_PLACE = 'ADD_PLACE'

export const addPlace = (placeData) => {
    return { type: ADD_PLACE, payload: placeData }
}