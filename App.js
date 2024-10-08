import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/ui/IconButton';
import { Colors } from './constants/colors';
import Map from './screens/Map';
import { useEffect } from 'react';
import { init } from './util/database';
import PlaceDetails from './screens/PlaceDetails';
const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    init();
  })

  function getAddPlaceButton(tintColor, navigation){
    return <IconButton 
            icon='add' 
            color={tintColor} 
            size={24} 
            onPress={() => navigation.navigate('AddPlace')}
          />;
  }


  return (
    <>
      <StatusBar style='dark'/>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: Colors.gray700,
          contentStyle: { backgroundColor: Colors.gray700 }
        }}>
          <Stack.Screen 
            name='AllPlaces' 
            component={AllPlaces} 
            options={({ navigation }) => ({
              title: 'Your Favorite Places',
              headerRight: ({ tintColor }) => getAddPlaceButton(tintColor, navigation)
          })}/>
          <Stack.Screen 
            name='AddPlace' 
            component={AddPlace}
            options={{
              title: 'Add a new Place'
            }}
          />
          <Stack.Screen name="Map" component={Map}/>
          <Stack.Screen name="PlaceDetails" component={PlaceDetails} options={{
            title: 'Loading Place..',
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}


