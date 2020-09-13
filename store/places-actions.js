export const ADD_PLACE = 'ADD_PLACE'
export const SET_PLACES = 'SET_PLACES'
import * as FileSystem from 'expo-file-system'
import { insertPlace, fetchPlaces } from '../helpers/db'
import { GOOGLE_STATIC_API_KEY as apiKey } from '../constants/api_key'


export const addPlace = (title, image, location) => {
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.long}&key=${apiKey}`

  return async dispatch => {
    // translate lat/long to a readable address with Google Maps Geocoding Api request
    const response = await fetch(geocodeUrl)
    if (!response.ok) {
      throw new Error('Something went wrong with the response!')
    }
    const data = await response.json()
    if (!data.results) {
      throw new Error('Something went from with the response results!')
    }
    const address = data.results[0].formatted_address
    const fileName = image.split('/').pop()
    const newPath = FileSystem.documentDirectory + fileName
    try {
      await FileSystem.moveAsync({ from: image, to: newPath })
      const dbResult = await insertPlace(
        title, 
        newPath, 
        address,
        location.lat, 
        location.long
      )
      console.log(dbResult)
      dispatch({ 
        type: ADD_PLACE, 
        payload: { 
          id: dbResult.insertId, 
          title: title, 
          image: newPath, 
          address: address,
          coords: {
            lat: location.lat,
            long: location.long
          }
        } 
      })
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export const loadPlaces = () => {
  return async dispatch => {
    try {
      const placesFromDb = await fetchPlaces()
      console.log('places from DB in the action: ', placesFromDb)
      dispatch({ type: SET_PLACES, payload: placesFromDb.rows._array })
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

