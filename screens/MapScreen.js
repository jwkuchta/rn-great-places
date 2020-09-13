import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

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

export default MapScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    map: {
        flex: 1
    }
})