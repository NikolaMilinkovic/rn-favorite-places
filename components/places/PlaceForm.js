import React, { useCallback, useState } from 'react'
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native'
import { Colors } from '../../constants/colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../ui/Button';
import { getAddress } from '../../util/location';
import { Place } from '../../models/place';

function PlaceForm({onCreatePlace}) {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [pickedLocation, setPickedLocation] = useState();
  const [selectedImage, setSelectedImage] = useState();
  function changeTitleHandler(enteredText){
    setEnteredTitle(enteredText);
  }
  function savePlaceHandler(){
    const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
    onCreatePlace(placeData);
  }
  function takeImageHandler(imageUri){
    setSelectedImage(imageUri);
  }
  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, [])

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>
          Title
        </Text>
        <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle}/>
        <ImagePicker onTakeImage={takeImageHandler}/>
        <LocationPicker onPickLocation={pickLocationHandler}/>
        <Button onPress={savePlaceHandler}>Add Place</Button>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100
  },
})

export default PlaceForm