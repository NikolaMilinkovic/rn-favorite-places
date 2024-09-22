import React from 'react'
import { Button, View } from 'react-native'
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker'

function ImagePicker() {
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
  async function verifyPermissions(){
    if(cameraPermissionInformation.status === PermissionStatus.UNDETERMINED){
      const permissionsResponse = await requestPermission();

      return permissionsResponse.granted;
    }

    if(cameraPermissionInformation.status === PermissionStatus.DENIED){
      Alert.alert('Insufficient permissions.', 'You need to grant camera permissions to use the app.')
      return false;
    }

    return true;
  }
  async function takeImageHandler(){
    const hasPermission = await verifyPermissions();
    if(!hasPermission) return;
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16,9],
      quality: 0.5
    });
    console.log(image)
  }
  return (
    <View>
      <View>

      </View>
      <Button title='Take image' onPress={takeImageHandler}/>
    </View>
  )
}

export default ImagePicker