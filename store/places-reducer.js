import { ADD_PLACE, SET_PLACES } from "./places-actions"
import Place from '../models/place'

const initState = {
    places: []
}

export default (state = initState, action) => {
    switch (action.type) {
        case SET_PLACES:
            return {
                places: action.payload.map(place => new Place
                    (
                        place.id.toString(),
                        place.title,
                        place.imageUri,
                        place.address,
                        place.lat,
                        place.long
                    )
                )
            }
        case ADD_PLACE:
            const newPlace = new Place(
                action.payload.id.toString(), 
                action.payload.title,
                action.payload.image,
                action.payload.address,
                action.payload.coords.lat,
                action.payload.coords.long
            )
            return {
                places: state.places.concat(newPlace)
            }
        default:
            return state
    }
}





