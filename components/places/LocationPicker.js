import React from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import OutlinedButton from '../ui/OutlinedButton'
import { Colors } from '../../constants/colors'
import { getCurrentPositionAsync, PermissionStatus, useForegroundPermissions } from 'expo-location'

function LocationPicker() {
  const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

  async function verifyPermissions(){
    if(locationPermissionInformation.status === PermissionStatus.UNDETERMINED){
      const permissionsResponse = await requestPermission();
      return permissionsResponse.granted;
    }
    if(locationPermissionInformation.status = PermissionStatus.DENIED){
      Alert.alert('Insufficient Permissions', 'For this feature a permission to use location is neccessary.');
      return false;
    }
    return true;
  }
  async function getLocationHandler(){
    const hasPermission = await verifyPermissions();
    if(!hasPermission) return;
    const location = await getCurrentPositionAsync();
  }
  function pickOnMapHandler(){

  }

  return (
    <View>
      <View style={styles.mapPreview}>

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
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 44,
  },
})

export default LocationPicker