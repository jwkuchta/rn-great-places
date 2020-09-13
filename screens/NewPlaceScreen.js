import React, { useState, useCallback } from 'react'
import { View, TextInput, StyleSheet, Button, ScrollView, Text } from 'react-native'
import Colors from '../constants/Colors'
import { useDispatch } from 'react-redux'
import { addPlace } from '../store/places-actions'
import ImagePicker from '../components/ImagePicker'
import LocationPicker from '../components/LocationPicker'

const NewPlaceScreen = props => {

    const [ title, setTitle ] = useState('')
    const [ image, setImage ] = useState(null)
    const [ location, setLocation ] = useState(null) // this will be the data passed on from picker

    const dispatch = useDispatch()

    const titleChangeHandler = text => {
        setTitle(text)
    }

    const imageTakenHandler = imagePath => {
      setImage(imagePath)
    }

    const savePlaceHandler = () => {
        dispatch(addPlace(title, image, location))
        props.navigation.goBack()
    }

    // wrapping in useCallback to avoid getting this re-created with every re-render cycle
    const locationPickedHandler = useCallback(location => {
        setLocation(location)
    }, [])

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput 
                style={styles.textInput} 
                onChangeText={titleChangeHandler}
                value={title}
                />
                <ImagePicker onImageTaken={imageTakenHandler}/>
                <LocationPicker 
                navigation={props.navigation}
                onLocationPicked={locationPickedHandler}
                />
                <Button 
                title='Save Place' 
                color={Colors.primary}
                onPress={savePlaceHandler}
                />
            </View>
        </ScrollView>   
    )
}

NewPlaceScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Add a New Place'
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 2,
        paddingVertical: 4
    }
})

export default NewPlaceScreen

