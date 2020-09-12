export const ADD_PLACE = 'ADD_PLACE'
export const SET_PLACES = 'SET_PLACES'
import * as FileSystem from 'expo-file-system'
import { insertPlace, fetchPlaces } from '../helpers/db'

export const addPlace = (title, image) => {
  return async dispatch => {
    const fileName = image.split('/').pop()
    const newPath = FileSystem.documentDirectory + fileName

    try {
      await FileSystem.moveAsync({ from: image, to: newPath })
      const dbResult = await insertPlace(title, newPath, 'Dummy address', 15.6, 11.3)
      console.log(dbResult)
      dispatch({ 
        type: ADD_PLACE, 
        payload: { 
          id: dbResult.insertId, 
          title: title, 
          image: newPath 
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

