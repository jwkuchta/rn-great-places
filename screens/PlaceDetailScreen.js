import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import MapPreview from '../components/MapPreview'
import { useSelector } from 'react-redux'
import Colors from '../constants/Colors'

const PlaceDetailScreen = props => {

    const placeId = props.navigation.getParam('placeId')
    const places = useSelector(state => state.places.places)
    const selectedPlace = places.find(p => p.id === placeId)
    const selectedLocation = { 
        lat: selectedPlace.lat, 
        long: selectedPlace.long 
    }
    // props.navigation.setParams({ title: selectedPlace.title })

    const showMapHandler = () => {
        props.navigation.navigate('Map', {
            // we need to use these two args in the map screen
            readonly: true,
            initialLocation: selectedLocation
        })
    }

    return (
        <ScrollView>
            <Image source={{ uri: selectedPlace.imageUri}} style={styles.image}/>
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}><Text styles={styles.address}>{selectedPlace.address}</Text></View>
                <MapPreview 
                style={styles.mapPreview}
                location={selectedLocation}
                onPress={showMapHandler}
                />
            </View>
        </ScrollView>
    )
}

PlaceDetailScreen.navigationOptions = navData => {
    const title = navData.navigation.getParam('title')
    const id = navData.navigation.getParam('placeId')

    return {
        headerTitle: title
    }
}

const styles = StyleSheet.create({
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%',
        backgroundColor: '#ccc'
    },
    locationContainer: {
        marginVertical: 20,
        marginHorizontal: 20,
        width: '90%',
        maxWidth: 350,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 10
    },
    addressContainer: {
        padding: 20
    },
    address: {
        color: Colors.primary,
        textAlign: 'center'
    },
    mapPreview: {
        width: '100%',
        maxWidth: 350,
        height: 300,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    }
})

export default PlaceDetailScreen
