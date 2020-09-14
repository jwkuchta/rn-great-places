import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import Colors from '../constants/Colors'

const MapScreen = props => {

    const initialLocation = props.navigation.getParam('initialLocation')
    const readonly = props.navigation.getParam('readonly')

    // if data is passes on as readonly state will be initiated with it
    const [ selectedLocation, setSelectedLocation ] = useState(initialLocation)

    // this region object requires the following args and they have to be names as seen below
    const mapRegion = {
        latitude: initialLocation.lat || 37.78,
        longitude: initialLocation.long || -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }

    const selectLocationHandler = (event) => {
        // if data passed as readonly from the details screen, no option to set the marker
        if (readonly) {
            setSelectedLocation(initialLocation) 
        }
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            long: event.nativeEvent.coordinate.longitude
        })
    }

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            // add an alert later
            return
        }
        props.navigation.navigate('NewPlace', {
            pickedLocation: selectedLocation
        })
    }, [selectedLocation])

    useEffect(() => {
        props.navigation.setParams({
            savePickedLocation: savePickedLocationHandler
        })
    }, [savePickedLocationHandler])

    let markerCoordinates

    if (selectedLocation) {
        console.log('selected location on map screen: ', selectedLocation)
        markerCoordinates = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.long
        }
    }

    return (
        <MapView
        style={styles.map}
        region={mapRegion} 
        onPress={selectLocationHandler}
        >
            {markerCoordinates && <Marker title="picked location" coordinate={markerCoordinates}></Marker>}
        </MapView>
    )
}

MapScreen.navigationOptions = navData => {
    const saveFn = navData.navigation.getParam('savePickedLocation')
    const readonly = navData.navigation.getParam('readonly')
    const saveButton = (
        <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
            <Text style={styles.headerButtonText}>Save</Text>
        </TouchableOpacity>
    )
    return {
        headerRight: () => {
            if (!readonly) {
                return saveButton
            }
            return null
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    map: {
        flex: 1
    },
    headerButton: {
        marginHorizontal: 20
    },
    headerButtonText: {
        fontSize: 16, 
        color: Platform.OS === 'android' ? 'white' : Colors.primary
    }
})

export default MapScreen