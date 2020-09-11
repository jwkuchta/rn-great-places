import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import NewPlaceScreen from '../screens/NewPlaceScreen'
import { Ionicons } from '@expo/vector-icons'
import PlacesListScreen from '../screens/PlacesListScreen'
import PlaceDetailScreen from '../screens/PlaceDetailScreen'
import { createAppContainer } from 'react-navigation'
import MapScreen from '../screens/MapScreen'
import Colors from '../constants/Colors'
import { Platform } from 'react-native'

const PlacesNavigator = createStackNavigator({
    Places: PlacesListScreen,
    PlaceDetail: PlaceDetailScreen,
    NewPlace: NewPlaceScreen,
    Map: MapScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
})

export default createAppContainer(PlacesNavigator)

