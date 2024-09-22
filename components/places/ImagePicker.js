import React, { useEffect, useState } from 'react'
import { Button, Image, View, Text, StyleSheet } from 'react-native'
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker'
import { Colors } from '../../constants/colors';

function ImagePicker() {
  const [previewImage, setPreviewImage] = useState('');
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
    console.log(image.assets[0].uri)
    setPreviewImage(image.assets[0])
  }
  
  let imagePreview = <Text>No image taken yet.</Text>
  if(previewImage){
    imagePreview = <Image source={{uri: previewImage.uri}} style={styles.image}/>
  }
  return (
    <View>
      <View style={styles.imagePreview}>
        {imagePreview}
      </View>
      <Button title='Take image' onPress={takeImageHandler}/>
    </View>
  )
}

const styles = StyleSheet.create({
  imagePreview: {
    flex: 1,
    width: '100%',
    height: 300,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4
  },
  image: {
    width: '100%',
    height: '100%',
  }
})

export default ImagePicker