import * as SQLite from 'expo-sqlite';
import { Place } from '../models/place';


async function getDatabase(){
  const database = await SQLite.openDatabaseAsync('places.db');
  return database;
}

export async function init(){
  const database = await getDatabase();
  try{
    await database.execAsync(
      `CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
      )`
    )
    console.log('> Database init has been successfull.');
  } catch (error){
    console.log('> There is an error => ' + error);
    throw new Error('Error initializing the database => ' + error);
  }
}

export async function insertPlace(place){
  const database = await getDatabase();
  try{
    const result = await database.runAsync(
      `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`, 
      [
      place.title,
      place.imageUri,
      place.address,
      place.location.lat,
      place.location.lng
      ]
    );

    console.log('> Inserting into database successfull')
  } catch (error){
    console.log('> There was an error inserting location into database => ' + error);
    throw new Error('Error inserting location into database => ' + error);
  }
}

export async function fetchPlaces(){
  const database = await getDatabase();
  try{
    const allPlaces = await database.getAllAsync('SELECT * FROM places');
    console.log('> Places successfully fetched from database');

    const places = [];
    for (const place of allPlaces) {
      const constructPlace = new Place(
        place.title,
        place.imageUri,
        {
          address: place.address,
          lat: place.lat,
          lng: place.lng
        },
        place.id
      );
      places.push(constructPlace);
    }
    return places

  } catch (error){
    console.log('Error fetching places from database => ' + error);
    throw new Error('Error fetching places from database => ' + error);
  }
}

export async function clearPlaces() {
  const database = await getDatabase();
  try {
    await database.runAsync(`DELETE FROM places`);
    console.log('> All entries deleted successfully.');
  } catch (error) {
    console.log('> Error deleting all entries from the database => ' + error);
    throw new Error('Error deleting all entries from the database => ' + error);
  }
}

export async function fetchPlaceDetails(id){
  const database = await getDatabase();
  try{
    const query = 'SELECT * FROM places WHERE id = ?';
    const place = await database.getFirstAsync(query, [id]);
    console.log(`> Fetching place data via id=${id} was successfull.`)
    console.log(place);

    // const constructPlace = new Place(
    //   place.title,
    //   place.imageUri,
    //   {
    //     address: place.address,
    //     lat: place.lat,
    //     lng: place.lng
    //   },
    //   place.id
    // );

    return place;
  } catch(error) {
    console.log('> Error fetching data for selected place => ' + error);
    throw new Error('Error fetching data for selected place => ' + error)
  }
}