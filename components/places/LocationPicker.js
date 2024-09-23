import React, { useState } from 'react'
import { StyleSheet, View, Alert, Image, Text } from 'react-native'
import OutlinedButton from '../ui/OutlinedButton'
import { Colors } from '../../constants/colors'
import { getCurrentPositionAsync, PermissionStatus, useForegroundPermissions } from 'expo-location'
import { getMapPreview } from '../../util/location'

function LocationPicker() {
  const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
  const [pickedLocation, setPickedLocation] = useState();

  async function verifyPermissions(){
    if(locationPermissionInformation.status === PermissionStatus.UNDETERMINED){
      const permissionsResponse = await requestPermission();

      return permissionsResponse.granted;
    }
    if(locationPermissionInformation.status === PermissionStatus.DENIED){
      Alert.alert('Insufficient Permissions', 'For this feature a permission to use location is neccessary.');

      return false;
    }
    return true;
  }

  async function getLocationHandler(){
    const hasPermission = await verifyPermissions();
    if(!hasPermission) return;
    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    })
  }
  function pickOnMapHandler(){

  }

  let locationPreview = <Text>No location picked yet.</Text>
  if(pickedLocation){
    locationPreview = (
      <Image
        style={styles.image} 
        source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }} 
      />
    )
  }

  return (
    <View>
      <View style={styles.mapPreview}>
      {locationPreview}
      </View>
      <View style={styles.actions}>
        <OutlinedButton onPress={getLocationHandler} icon='location'>Locate User</OutlinedButton>
        <OutlinedButton onPress={pickOnMapHandler} icon='map'>Pick on Map</OutlinedButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mapPreview: {
    flex: 1,
    width: '100%',
    height: 300,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 44,
  },
  image: {
    width: '100%',
    height: '100%',
  }
})

export default LocationPicker