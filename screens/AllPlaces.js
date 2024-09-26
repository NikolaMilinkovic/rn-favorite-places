import React, { useEffect, useState } from 'react'
import PlacesList from '../components/places/PlacesList'
import { useIsFocused } from '@react-navigation/native'
import { fetchPlaces } from '../util/database';

function AllPlaces({route}) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    
    async function loadPlaces(){
      if(isFocused){
        const places = await fetchPlaces();
        setLoadedPlaces(places);
      }
    }

    loadPlaces();
  }, [isFocused])

  return (
     <PlacesList places={loadedPlaces}/>
  )
}

export default AllPlaces