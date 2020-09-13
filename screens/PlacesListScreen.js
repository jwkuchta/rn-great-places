import React, { useEffect } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'
import PlaceItem from '../components/PlaceItem'
import Colors from '../constants/Colors'
import { loadPlaces } from '../store/places-actions'

const PlacesListScreen = props => {

    const places = useSelector(state => state.places.places)
    console.log(places)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadPlaces())
    }, [dispatch])

    return (
        <FlatList
        renderItem={itemData => (
          <PlaceItem
                onSelect={() => props.navigation.navigate(
                    'PlaceDetail', 
                    {
                        placeTitle: itemData.item.title, 
                        placeId: itemData.item.id
                    }
                )} 
                image={itemData.item.image}
                image={itemData.item.imageUri}
                title={itemData.item.title}
                // address={itemData.item.address}
                address={itemData.item.address}
                />
        )
        }
        keyExtractor={item => item.id}
        data={places} 
        />
    )
}

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

export default PlacesListScreen

