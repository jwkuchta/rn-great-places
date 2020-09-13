import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { GOOGLE_STATIC_API_KEY as apiKey }from '../constants/api_key'

const MapPreview = props => {

    let imagePreviewUrl

    if (props.location) {
        imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.long}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:C%7C${props.location.lat},${props.location.long}&key=${apiKey}`
    }

    return (
        <View style={{...styles.mapPreview, ...props.style}}>
            {props.location 
            ? 
            <Image 
            style={styles.mapImage} 
            source={{ uri: imagePreviewUrl }}/> 
            : 
            props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    mapPreview: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapImage: {
        width: '100%',
        height: '100%'
    }
})

export default MapPreview