import React from 'react'
import { View, Text, Button, StyleSheet, Image, Alert } from 'react-native'
import Colors from '../constants/colors'
import * as ImgPicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

const ImagePicker = props => {

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA)
        if (result.status !== 'granted') {
            Alert.alert(
                'You need to allow camera to use this app', 
                [{ text: 'ok' }]
            )
            return false
        }
        return true
    } 

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions()
        if (!hasPermission) {
            return 
        }
        ImgPicker.launchCameraAsync() // opens up the device camera
    }

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                <Text>No image picked yet</Text>
                <Image style={styles.image} />
            </View>
            <Button 
            title="Take Image" 
            color={Colors.primary}
            onPress={takeImageHandler} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center'
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1, 
        borderColor: '#ccc'
    },
    image: {
        width: '100%',
        height: '100%'
    }
})

export default ImagePicker