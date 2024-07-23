import { StyleSheet, Text, View, ImageBackground } from "react-native";

const Card = ({ data }) => {

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={require("../assets/icons/Card4.png")}
        resizeMode="contain"
      >
        <Text style={styles.text1}>{data.name}</Text>

        <Text style={styles.text2}>{data.englishName}</Text>

        <View
          style={{ height: 1, width: "100%", backgroundColor: "#ffffff59", marginVertical: 16, width: "60%" }}
        />

        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Text style={styles.text3}>{data.revelationType}</Text>

          <Text style={styles.text3}>{data.numberOfAyahs} Verses</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: "center",
  },
  background: {
    height: 250,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text1: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },
  text2: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 5,
  },
  text3: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
});
