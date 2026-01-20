import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function ProfileCard() {
  const user = {
    name: "DAUSTIAN",
    avatar: "https://i.pravatar.cc/150?img=12",
    bio: "Mobile developer | React Native enthusiast",
    followers: 1234,
    following: 567
  };
  
  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={user.avatar ? { uri: user.avatar } : undefined}
      />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.bio}>{user.bio}</Text>
      <Text>{user.followers}/{user.following}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    color: "#333",
  },
  avatar:{
    borderRadius: 100,
    width:150,
    height:150,
    marginBottom:20,
  },
  name:{
    fontWeight: "bold",
    fontSize: 24
    
  },

  bio:{
    color: "gray",
    fontSize: 14
  },
  button:{
    backgroundColor: "blue",
    height: 50,
    width: 200,
    borderRadius: 25,
  }
});

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ProfileCard />
      <TouchableOpacity style={styles.button}>
        <Text style={{ color: "white", textAlign: "center", lineHeight: 50, fontWeight: "bold" }}>Follow</Text>
      </TouchableOpacity>
    </View>
  );
}
