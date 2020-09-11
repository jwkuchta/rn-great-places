import React from 'react'
import PlacesNavigator from './navigation/PlacesNavigator'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { AppLoading } from 'expo'
import placesReducer from './store/places-reducer'

const rootReducer = combineReducers({
  places: placesReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))


export default function App() {
  return (
    <Provider store={store}>
        <PlacesNavigator />
    </Provider>
  )
}


