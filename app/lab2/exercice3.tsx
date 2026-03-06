import { StyleSheet, Text, View } from 'react-native';


interface statcard{
    value: number,
    label:string,
    icon: any,
    change:"+"|"-",
}



const styles = StyleSheet.create({
  value: {
    fontSize: 50,
  },
  label:{
    fontSize: 25,

  },
  view: {
    alignItems: "center"
  }
});


function StatCard({ value, label, icon, change }: statcard) {
  return <View style={styles.view}>
    <Text style={styles.value}>{change}{value} </Text>
    <Text style={styles.label}> {label}</Text>
    <Text> {icon}</Text>

  </View>
}


export default StatCard;