export const ADD_PLACE = 'ADD_PLACE'
import * as FileSystem from 'expo-file-system'
import { insertPlace } from '../helpers/db'

export const addPlace = (title, image) => {
  return async dispatch => {
    const fileName = image.split('/').pop()
    const newPath = FileSystem.documentDirectory + fileName

    try {
      await FileSystem.moveAsync({ from: image, to: newPath })
      const dbResult = await insertPlace(title, newPath, 'Dummy address', 15.6, 11.3)
      console.log(dbResult)
    } catch (error) {
      console.log(error)
      throw error
    }
    dispatch({ type: ADD_PLACE, payload: { id: dbResult.insertId, title: title, image: newPath } })
  }
}

