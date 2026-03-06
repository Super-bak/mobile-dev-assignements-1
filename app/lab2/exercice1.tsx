import { Image } from 'react-native';

interface DataType {
  source: string;
  size?: number;}

export default function Avatar({ source, size = 50 }: DataType) {
  
  return <Image 
  style={{
    borderRadius : 100,
    height: size,
    width: size,
    borderColor: 'black',
    borderWidth: 1,
  }}
  source={{uri:source}}
  >
  </Image>;
}