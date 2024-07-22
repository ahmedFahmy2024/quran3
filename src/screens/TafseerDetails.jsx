import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import Verses from "../components/Verses";
import { StatusBar } from "expo-status-bar";

const TafseerDetails = ({ route }) => {
  const { surah } = route.params;

  const navigation = useNavigation();

  const [data, setData] = useState({});
  const [ayats, setAyats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (surah) {
      getSurah(surah);
    }
  }, [surah]);

  const getSurah = async (num) => {
    try {
      const surah = await axios.get(
        `https://api.alquran.cloud/v1/surah/${num}/ar.alafasy`
      );
      const allAyats = await surah.data.data.ayahs;
      const allData = await surah.data.data;
      setData(allData);
      setAyats(allAyats);
    } catch (error) {
      setError(err);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.additional}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.additional}>
        <Text>Error: {error.message}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <TouchableOpacity
        style={styles.iconContainer}
        activeOpacity={0.5}
        onPress={() => navigation.goBack()}
      >
        <Image
          style={styles.icon}
          source={require("../assets/icons/arrow-left.png")}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Card data={data} />

      <Verses ayats={ayats} data={data} />
    </SafeAreaView>
  );
};

export default TafseerDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  iconContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    alignItems: "flex-end",
  },
  icon: {
    width: 20,
    height: 20,
  },
  additional: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
