import { Button } from '@react-navigation/elements';
import * as LocalAuthentication from 'expo-local-authentication';
import { View } from 'react-native';
import Navbar from './navbar';


export default function Biometrics() {


const handlePress = () => {
    LocalAuthentication.authenticateAsync({ 

    }).then((data) => {
        if (data.success) {
            alert("Authenticated successfully!");
        } else {
            alert("Authentication failed.");
        }
    });
}

  return <View 
  style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <Button title="Authenticate" onPress={handlePress}  />
    <Navbar></Navbar>
  </View>
  

  
  ;}