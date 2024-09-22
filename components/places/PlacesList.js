import React from 'react'
import { FlatList } from 'react-native'
import PlaceItem from './PlaceItem'

function PlacesList({ places }) {
  if(!places || places.length === 0){
    
  }


  return (
    <FlatList
      data={places}
      keyExtractor={( item ) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} />}
    />
  )
}

export default PlacesList