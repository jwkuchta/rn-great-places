import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const PlaceDetailScreen = props => {

    return (
        <View style={styles.container}>
            <Text>This is the place detail screen</Text>
        </View>
    )
}

export default PlaceDetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
