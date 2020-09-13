import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import Colors from '../constants/Colors'

const MapScreen = props => {

    const [ selectedLocation, setSelectedLocation ] = useState()

    // this region object requires the following args and they have to be names as seen below
    const mapRegion = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }

    const selectLocationHandler = (event) => {
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
        console.log(selectedLocation)
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
    return {
        headerRight: () => (
            <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
                <Text style={styles.headerButtonText}>Save</Text>
            </TouchableOpacity>
        )
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