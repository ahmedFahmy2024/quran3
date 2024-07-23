import { ImageBackground, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import ProgressBar from "react-native-progress/Bar";
import { convertNumberToArabic } from "../helpers/ArabicNumber";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRefresh } from "../context/LastReadSurah";
import { useLocalization } from "../context/LocalizationContext";

const LastRead = () => {
  const [LastReadAyah, setLastReadAyah] = useState(null);
  const [progress, setProgress] = useState(0);
  const { refresh } = useRefresh();
  const { t } = useLocalization();

  const getLastReadAyah = async () => {
    try {
      const lastReadAyahString = await AsyncStorage.getItem("lastReadAyah");
      if (lastReadAyahString) {
        const lastReadAyah = JSON.parse(lastReadAyahString); // Convert the string back to an object
        setLastReadAyah(lastReadAyah);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLastReadAyah(); // Retrieve last read ayah from storage
  }, [refresh]);

  // Load last read ayah on component mount
  useEffect(() => {
    if (LastReadAyah) {
      const percentage = LastReadAyah.numberInSurah / LastReadAyah.numOfAyah;
      if (!isNaN(percentage) && percentage >= 0 && percentage <= 1) {
        setProgress(percentage); // Update progress state with calculated percentage if valid
      } else {
        setProgress(0); // Set to 0 or handle appropriately if percentage is invalid
      }
    }
  }, [LastReadAyah]);

  if (LastReadAyah === null) {
    return <Text>{t("No last read ayah found")}</Text>; // Display a loading indicator while fetching data
  }

  // console.log('LastReadAyah', LastReadAyah);

  return (
    <View style={styles.lastreadcontainer}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          justifyContent: "center",
        }}
      >
        <ImageBackground
          source={require("../assets/icons/Juz.png")}
          resizeMode="cover"
          style={styles.image}
        >
          <Text style={styles.num}>
            {LastReadAyah
              ? convertNumberToArabic(LastReadAyah?.juz)
              : convertNumberToArabic(30)}
          </Text>
        </ImageBackground>
        <Text style={styles.surah}>
          {LastReadAyah ? LastReadAyah?.suarhName : "سورة"}{" "}
          {LastReadAyah
            ? convertNumberToArabic(LastReadAyah?.numberInSurah)
            : convertNumberToArabic(1)}
        </Text>
      </View>

      <View style={styles.progresscontainer}>
        <Text style={styles.progresstext}>{Math.round(progress * 100)}%</Text>
        <ProgressBar
          progress={progress}
          width={null}
          color="#6961F8"
          height={12}
          borderRadius={50}
          unfilledColor="#EAE9FF"
          borderWidth={0}
        />
      </View>
    </View>
  );
};

export default LastRead;

const styles = StyleSheet.create({
  lastreadcontainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: "#314F7C",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  time: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    backgroundColor: "#EAE9FF",
    borderRadius: 50,
    marginBottom: 10,
    width: 150,
  },
  text: {
    fontSize: 14,
    lineHeight: 16,
    color: "#6961F8",
  },
  image: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  num: {
    color: "#BEBDD9",
    fontSize: 13.33,
    lineHeight: 20,
  },
  surah: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
  },
  progresstext: {
    fontSize: 12,
    textAlign: "right",
    color: "#6961F8",
    fontWeight: "bold",
    lineHeight: 16,
    marginBottom: 5,
  },
});
