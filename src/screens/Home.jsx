import { Image, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import HomeSurah from "../components/HomeSurah";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useLocalization } from "../context/LocalizationContext";
import { useIsFocused } from '@react-navigation/native';

const Home = () => {
  const { locale, t } = useLocalization();
  const [listOfSurah, setListOfsurah] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastReadSurah, setLastReadSurah] = useState({});
  const isFocused = useIsFocused();

  const getLastReadSurah = async () => {
    try {
      const lastReadSurahString = await AsyncStorage.getItem("lastReadSurah");
      if (lastReadSurahString !== null) {
        const lastReadSurah = JSON.parse(lastReadSurahString); // Convert the string back to an object
        setLastReadSurah(lastReadSurah);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLastReadSurah();
  }, [isFocused]);

  useEffect(() => {
    getAllSurah();
  }, []);

  const getAllSurah = async () => {
    try {
      const AllSurah = await axios.get("https://api.alquran.cloud/v1/surah");
      setListOfsurah(AllSurah.data.data);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <LinearGradient
        colors={["#8882FC", "#6961F8"]}
        style={styles.backgrounds}
      >
        <View>
          <View style={styles.row}>
            <Image
              source={require("../assets/icons/mushafVector.png")}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.text}>{t("Last Read")}</Text>
          </View>
          <Text style={styles.surah}>
            {locale === "ar" ? lastReadSurah.name : lastReadSurah.englishName}
          </Text>
          <Text style={styles.ayah}>
            {locale === "en"
              ? lastReadSurah.revelationType
              : lastReadSurah.revelationType === "Meccan"
              ? "مكية"
              : "مدنية"}
          </Text>
        </View>

        <View>
          <Image
            source={require("../assets/icons/new123.png")}
            style={styles.mainImg}
            resizeMode="contain"
          />
        </View>
      </LinearGradient>

      <View style={styles.allsurah}>
        <Text style={[styles.allsurahtext, { marginBottom: 10 }]}>
          {t("All Surah")}
        </Text>
        <HomeSurah listOfSurah={listOfSurah} />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  backgrounds: {
    marginVertical: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  image: {},
  text: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  surah: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  ayah: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  mainImg: {
    position: "absolute",
    right: -20,
    bottom: -15,
  },
  allsurah: {
    paddingHorizontal: 20,
  },
  allsurahtext: {
    fontWeight: "bold",
    fontSize: 18,
    lineHeight: 24,
  },
});
