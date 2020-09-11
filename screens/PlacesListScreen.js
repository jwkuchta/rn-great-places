import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const PlacesListScreen = props => {

    return (
        <View style={styles.container}>
            <Text>This is the places list screen</Text>
        </View>
    )
}

export default PlacesListScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

PlacesListScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'All Places',
        headerRight: () => (
            <Ionicons 
                name={Platform.OS === 'android' ? 'md-add' : 'ios-add'} 
                label='Add Place'
                size={23}
                style={{marginRight: 15}}
                color={Platform.OS === 'android' ? 'white' : Colors.primary}
                onPress={() => navData.navigation.navigate('NewPlace')}
            />
        )
    } 
}