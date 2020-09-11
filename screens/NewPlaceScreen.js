import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Button, ScrollView, Text } from 'react-native'
import Colors from '../constants/colors'
import { useDispatch } from 'react-redux'
import { addPlace } from '../store/places-actions'
import ImagePicker from '../components/ImagePicker'

const NewPlaceScreen = props => {

    const [ title, setTitle ] = useState('')

    const dispatch = useDispatch()

    const titleChangeHandler = text => {
        setTitle(text)
    }

    const savePlaceHandler = () => {
        dispatch(addPlace(title))
        props.navigation.goBack()
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput 
                style={styles.textInput} 
                onChangeText={titleChangeHandler}
                value={title}
                />
                <ImagePicker />
                <Button 
                title='Save Place' 
                color={Colors.primary}
                onPress={savePlaceHandler}
                />
            </View>
        </ScrollView>
        
    )
}

export default NewPlaceScreen

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

NewPlaceScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Add a New Place'
    }
}