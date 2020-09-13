import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native'
import Colors from '../constants/Colors'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import MapPreview from './MapPreview'

const LocationPicker = props => {

    const [ pickedLocation, setPickedLocation ] = useState()
    const [ fetching, setFetching ] = useState()

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION)
        if (result.status !== 'granted') {
            Alert.alert(
                'You need to allow camera to use this app', 
                [{ text: 'ok' }]
            )
            return false
        }
        return true
    } 

    const getLocationHandler = async () => {
        setFetching(true)
        const hasPermission = await verifyPermissions()
        if (!hasPermission) {
            return
        }
        try {
            const location = await Location.getCurrentPositionAsync({ timeout: 5000 }) // will try for 5 seconds and then stop trying 
            console.log(location) // returns an object with coords
            setPickedLocation({
                lat: location.coords.latitude,
                long: location.coords.longitude
            })
        } catch (error) {
            Alert.alert('Something went wrong', error.message, [{ text: 'OK' }])
        }  
        setFetching(false)
    }

    return (
        <View style={styles.locPicker}>
            <MapPreview style={styles.mapPreview} location={pickedLocation}>
                {fetching 
                ? 
                <ActivityIndicator size='large' color={Colors.primary}/> 
                : 
                <Text>No location chosen yet</Text>
                }
            </MapPreview>
            <Button 
            title="Pick Location" 
            color={Colors.primary}
            onPress={getLocationHandler} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    locPicker: {
        alignItems: 'center',
        marginBottom: 15
    },
    mapPreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        borderWidth: 1, 
        borderColor: '#ccc'
    },
    map: {
        width: '100%',
        height: '100%'
    }
})

export default LocationPicker