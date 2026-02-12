import { StyleSheet, Text, View } from 'react-native';


const styles = StyleSheet.create({

    city:{
    fontSize: 30,
    },
    card:{
    backgroundColor: 'lightblue',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    margin: 10,
    alignItems: 'center',
    borderColor: 'darkblue',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 5,

    },
    temp:{
    fontSize: 60,
    },
    conditionRow:{
    flexDirection: 'row',
    alignItems: 'center',
    },
    icon:{
    width: 50,
    height: 50,
    },
    description:{
    fontSize: 20,
    marginLeft: 10,
    },
    highLowRow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    },
    high:{
    fontSize: 18,
    },
    low:{
    fontSize: 18,
    },



})



export default function WeatherCard(){

    return (<View style={styles.card}>
  <Text style={styles.city}>City Name</Text>
  <Text style={styles.temp}>72°</Text>
  <View style={styles.conditionRow}>
    {/* <Image source={...} style={styles.icon} /> */}
    <Text style={styles.description}>Sunny</Text>
  </View>
  <View style={styles.highLowRow}>
    <Text style={styles.high}>H: 78°</Text>
    <Text style={styles.low}>L: 65°</Text>
  </View>
</View>);
}