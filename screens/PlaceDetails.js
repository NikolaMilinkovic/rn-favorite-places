import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import OutlinedButton from '../components/ui/OutlinedButton'
import { Colors } from '../constants/colors'
import { fetchPlaceDetails } from '../util/database'
import { getAddress } from '../util/location'

function PlaceDetails({ navigation, route }) {
  const selectedPlaceId = route.params.placeId
  const [place, setPlace] = useState();

  useEffect(() => {
    async function getDetails(){
      const place = await fetchPlaceDetails(selectedPlaceId);
      setPlace(place);
      navigation.setOptions({
        title: place.title,
      });
    }
    getDetails();
  }, [selectedPlaceId])

  function showOnMapHandler(){
    navigation.navigate('Map', {
      initialLat: place.lat,
      initialLng: place.lng,
    });
  }
  if(!place){
    return <View style={styles.fallback}><Text style={styles.fallbackText}>No data found for this place..</Text></View>
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: place.imageUri }}/>
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
          <OutlinedButton icon='map' onPress={showOnMapHandler}>View on map</OutlinedButton>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fallbackText: {
    color: Colors.primary50,
    fontSize: 16,
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%'
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }
})

export default PlaceDetails