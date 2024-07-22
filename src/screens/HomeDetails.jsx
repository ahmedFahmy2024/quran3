import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import SurahComponent from "../components/SurahComponent";
import imageimages from "../assets/index";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import axios from "axios";
import { useState, useEffect } from "react";
import { usePageBookmark } from "../context/PageBookmarProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useLocalization } from "../context/LocalizationContext";

const HomeDetails = ({ route }) => {
  const { locale } = useLocalization();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { surah } = route.params;
  const navigation = useNavigation();

  const storeLastReadSurah = async (surah) => {
    try {
      const surahString = JSON.stringify(surah);
      await AsyncStorage.setItem('lastReadSurah', surahString);
    } catch (error) {
      console.log(error);
    }
  };

  const [voice, setVoice] = useState("");
  const [sound, setSound] = useState(); // State to hold the sound object
  const [isPlaying, setIsPlaying] = useState(false);

  const { pageBookmarks, addpageBookmark, removepageBookmark } = usePageBookmark();

    // Toggle bookmark
    const toggleBookmark = () => {
      const isBookmarked = pageBookmarks.some(
        (bookmark) =>
          bookmark.number === surah.number
      );
      if (isBookmarked) {
        removepageBookmark(surah);
      } else {
        addpageBookmark(surah);
      }
    };

  // Filter images for the specific surah number
  const surahImages = imageimages.filter(
    (image) =>
      image.num === surah.number || image.num2 === surah.number || image.num3 === surah.number
  );

  useEffect(() => {
    getAllAudio(surah.number);
  }, []);

  const getAllAudio = async ( surah ) => {
    try {
      const resposnse = await axios.get(`https://api.quran.com/api/v4/chapter_recitations/7/${surah}`);
      setVoice(resposnse.data.audio_file.audio_url);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

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

    if (!voice) {
      return;
    }

    const { sound: newSound } = await Audio.Sound.createAsync({
      uri: voice,
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
  };

  // =================== store last surah you read ===================
  useEffect(() => {
    storeLastReadSurah(surah);
  }, [surah]);

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
      <View style={styles.header}>

        <View style={styles.icons}>
          <TouchableOpacity>
            <Ionicons
              onPress={onPlayPause}
              disabled={!voice}
              name={isPlaying ? "pause-outline" : "play-outline"}
              size={24}
              color={voice ? "#6961F8" : "gray"}
              style={locale === "ar" && styles.arabicIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleBookmark}>
            <Ionicons
              name={pageBookmarks.some(bookmark => bookmark.number === surah.number) ? 'bookmark' : 'bookmark-outline'}
              size={24}
              color="#6961F8"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.icon}
            source={require("../assets/icons/arrow-left.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
        
      </View>

      <SurahComponent surahImages={surahImages} />
    </SafeAreaView>
  );
};

export default HomeDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: 10,
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
  icons: {
    flexDirection: "row",
    gap: 15,
  },
  arabicIcon: {
    transform: [{ rotate: "180deg" }],
  },
});
