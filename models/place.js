import uuid from 'react-native-uuid';

export class Place{
  constructor(title, imageUri, location, id){
    this.title = title,
    this.imageUri = imageUri,
    this.address = location.address,
    this.location = {lat: location.lat, lng: location.lng}  // { lat: 0,234 lng: 11,231 }
    this.id = id;
  }
}