import { useRouter } from 'expo-router';
import { Button, View } from 'react-native';

export default function Navbar() {
  const router = useRouter();





  return <View 
  style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  
    <Button title="Go to accelerometer" onPress={() => router.push('/lab6/accelerometer')} />
    <Button title="Go to battery" onPress={() => router.push('/lab6/battery')} />
    <Button title="Go to gps" onPress={() => router.push('/lab6/gps')} />
    <Button title="Go to vibration" onPress={() => router.push('/lab6/vibration')} />
    <Button title="Go to biometrics" onPress={() => router.push('/lab6/biometrics')} />
    <Button title="Go to camera" onPress={() => router.push('/lab6/camera')} />

  </View>
  
  
  
  ;}