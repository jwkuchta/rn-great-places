import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'

const MapScreen = props => {

    // this region object requires the following args and they have to be names as seen below
    const mapRegion = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }

    return (
        <MapView
        style={styles.map}
        region={mapRegion} 
        />
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