import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";

const RadioChannels = ({ item }) => {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);

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

    if (!item?.url) {
      return;
    }

    setLoading(true); // Set loading state when starting to play audio

    try {
      const { sound: newSound } = await Audio.Sound.createAsync({
        uri: item.url,
      });

      setSound(newSound);
      newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      await newSound.playAsync();
    } catch (error) {
      console.error("Failed to load audio", error);
    } finally {
      setLoading(false); // Turn off loading state after attempting to play audio
    }
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

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{item.name}</Text>

      <TouchableOpacity onPress={loading ? null : onPlayPause}>
        {loading ? (
          <ActivityIndicator size="small" color="#6961F8" />
        ) : (
          <Ionicons
            disabled={!item.url}
            name={isPlaying ? "pause-outline" : "play-outline"}
            size={24}
            color={item.url ? "#6961F8" : "gray"}
            style={{ transform: [{ rotateY: "180deg" }] }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default RadioChannels;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "500",
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
