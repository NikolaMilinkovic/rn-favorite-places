import uuid from 'react-native-uuid';

class Place{
  constructor(title, imageUri, address, location){
    this.title = title,
    this.imageUri = imageUri,
    this.address = address,
    this.location = location  // { lat: 0,234 lng: 11,231 }
    this.id = uuid.v4()
  }
}