import * as Device from 'expo-device';
import { fetchWeatherApi } from "openmeteo";
import { useEffect, useState } from 'react';
import { Dimensions, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView from 'react-native-maps';
import location_data from './location.json';

import * as Location from 'expo-location';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: 400,
    marginTop: 20,
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200
  },

  button:{

    width: 50
  }
});



export default function Locations() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [region, setRegion] = useState({
    latitude: -122.4324,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    async function getCurrentLocation() {
      if (Platform.OS === 'android' && !Device.isDevice) {
        setErrorMsg(
          'dont work on android emulator'
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
    const intervalId = setInterval(getCurrentLocation, 10000);

    return () => clearInterval(intervalId);
  }, []);


  async function searchLocation() {
      console.log(location_data.data.find((location_name) => location_name[0] === input));
      //["Niger", "16", "8"]
      let country =location_data.data.find((location_name) => location_name[0] === input)

      if (country== undefined){
        throw new Error("We dont have a valid country")
      }
      setRegion(
        {
          latitude: Number(country[1]),
          longitude: Number(country[2]),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }
      )

      const params = {
      latitude: Number(country[1]),
      longitude: Number(country[2]),
      hourly: "temperature_2m",
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);
    const response = responses[0];
    const hourly = response.hourly()!;
    const utcOffsetSeconds = response.utcOffsetSeconds();

    const weatherData = {
        hourly: {
          time: Array.from(
            { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() }, 
            (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
          ),
          temperature_2m: hourly.variables(0)!.valuesArray(),
        },
      };
 
      
      
  }


  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={setInput}
          value={input}
        />

         <TouchableOpacity style={styles.button} onPress={searchLocation}>
          <Text>Press Here</Text>
        </TouchableOpacity>

        <MapView style={styles.map}
        region={region}
        
        >
        
      </MapView>

                <Text>Press Here</Text>

    </View>
  );
}
