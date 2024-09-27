import React, { useCallback, useLayoutEffect, useState } from 'react'
import { StyleSheet, Alert } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import IconButton from '../components/ui/IconButton';

function Map({ navigation, route }) {
  const initialLocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng,
  }

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const region = {
    latitude: initialLocation ? initialLocation.lat : 37,
    longitude: initialLocation ? initialLocation.lng : -122,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  function selectLocationHandler(event){
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    console.log(`Lat: ${lat} | Lng: ${lng}`)
    setSelectedLocation({ lat: lat, lng: lng });
  }
  const savePickedLocationHandler = useCallback(() => {
    if(initialLocation) return;
    if(!selectedLocation){
      Alert.alert('No location picked', 'You have to picka a location by tapping on the mep first!'); 
      return
    }

    navigation.navigate('AddPlace', { 
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if(initialLocation) return;
    navigation.setOptions({
      headerRight: ({ tintColor }) => <IconButton icon='save' size={24} color={tintColor} onPress={savePickedLocationHandler}/>
    })
  }, [navigation, savePickedLocationHandler, initialLocation]);

  return (
    <MapView 
      initialRegion={region} 
      style={styles.map} 
      onPress={selectLocationHandler}
    >
      {selectedLocation && <Marker 
        coordinate={{
          latitude: selectedLocation.lat,
          longitude: selectedLocation.lng,
        }}
        title='Picked location'
      />}
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
})

export default Map