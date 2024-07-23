import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { Audio } from "expo-av";
import { useBookmark } from "../context/BookmarkProvider";
import { useLocalization } from "../context/LocalizationContext";
import { convertNumberToArabic } from "../helpers/ArabicNumber";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRefresh } from "../context/LastReadSurah";

const Box = ({ item, data }) => {
  const { locale } = useLocalization();
  const [tafseer, setTafseer] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setRefresh } = useRefresh();

  const [sound, setSound] = useState(); // State to hold the sound object
  const [isPlaying, setIsPlaying] = useState(false);

  const { bookmarks, addBookmark, removeBookmark } = useBookmark();

  useEffect(() => {
    if (item && data) {
      getTafseer(data.number, item.numberInSurah);
    }
  }, [item, data]);

  const getTafseer = async (surahNum, ayatNum) => {
    try {
      const response = await axios.get(
        `https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir/ar-tafsir-muyassar/${surahNum}.json`
      );
      const ayahData = response.data.ayahs.find(
        (ayah) => ayah.ayah === ayatNum
      );

      if (ayahData) {
        setTafseer(ayahData.text);
      } else {
        throw new Error("Ayah not found");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const storeLastReadAyah = async (Ayah, suarhName, numOfAyah) => {
    try {
      const ayahString = JSON.stringify({...Ayah, suarhName, numOfAyah});
      await AsyncStorage.setItem('lastReadAyah', ayahString);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  // Toggle bookmark
  const toggleBookmark = () => {
    const isBookmarked = bookmarks.some(
      (bookmark) =>
        bookmark.number === item.number && bookmark.numberInSurah === item.numberInSurah
    );
    if (isBookmarked) {
      removeBookmark(item);
    } else {
      addBookmark(item, data.name, data.number);
    }
    storeLastReadAyah(item, data.name, data.numberOfAyahs);
  };

  //  =================== playing audio ===================
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playTrack = async () => {
    if (sound) {
      await sound.unloadAsync();
    }

    if (!item?.audio) {
      return;
    }

    const { sound: newSound } = await Audio.Sound.createAsync({
      uri: item.audio,
    });

    setSound(newSound);
    newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    await newSound.playAsync();
  };

  const onPlaybackStatusUpdate = (status) => {
    if (!status.isLoaded) {
      return;
    }

    setIsPlaying(status.isPlaying);
  };

  const onPlayPause = async () => {
    if (!sound) {
      await playTrack();
    } else if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    storeLastReadAyah(item, data.name, data.numberOfAyahs);
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
        <Text>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.row, locale === "ar" && styles.arabicRow]}>
        <View style={[styles.image, locale === "ar" && styles.arabicImage]}>
          <Text style={styles.num}>{locale === "ar" ? convertNumberToArabic(item.numberInSurah) : item.numberInSurah}</Text>
        </View>

        <View style={styles.icons}>
          <TouchableOpacity>
            <Ionicons
              onPress={onPlayPause}
              disabled={!item.audio}
              name={isPlaying ? "pause-outline" : "play-outline"}
              size={24}
              color={item.audio ? "#6961F8" : "gray"}
              style={locale === "ar" && styles.arabicIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleBookmark}>
            <Ionicons
              name={bookmarks.some(bookmark => bookmark.number === item.number && bookmark.numberInSurah === item.numberInSurah) ? 'bookmark' : 'bookmark-outline'}
              size={24}
              color="#6961F8"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.textcontainer}>
        <Text style={styles.text}>{item.text}</Text>
        <Text style={styles.tafseer}>{tafseer}</Text>
      </View>
    </View>
  );
};

export default Box;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#1219310d",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  arabicRow: {
    flexDirection: "row-reverse",
  },
  image: {
    width: 27,
    height: 27,
    backgroundColor: "#6961F8",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginRight: 10,
  },
  arabicImage: {
    marginRight: 0,
  },
  num: {
    color: "white",
    fontSize: 14,
  },
  icons: {
    flexDirection: "row",
    gap: 15,
  },
  textcontainer: {
    marginTop: 10,
  },
  text: {
    color: "#240F4F",
    fontSize: 18,
    fontWeight: "bold",
  },
  additional: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tafseer: {
    marginTop: 10,
    color: "#6961F8",
  },
  arabicIcon: {
    transform: [{ rotate: "180deg" }],
  },
});
