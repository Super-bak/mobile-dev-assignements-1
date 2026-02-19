import { View } from "react-native";
// import Avatar from "./lab2/exercice1";
// import Tag from "./lab2/exercice2";
// import StatCard from './lab2/exercice3';
// import Recipe from './lab2/exercice4';
// export default function Index() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Avatar 
//       source="https://picsum.photos/seed/picsum/200/300"
//       size={200}>

//       </Avatar>

//       <Tag text="test" variant="primary" onPress={true}>
//       </Tag>
//       <Recipe></Recipe>


//       <StatCard change="+" icon={"✅" } value={12} label="test again">

//       </StatCard>
//     </View>
//   );
// }
// import WeatherCard from "./lab3/exercice1";
// export default function Index() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >


//            <WeatherCard></WeatherCard>

//     </View>

//   );
// }


import TicTacToe from "./tictactoe/index";
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    > 
      <TicTacToe></TicTacToe>
    </View>
  );
}