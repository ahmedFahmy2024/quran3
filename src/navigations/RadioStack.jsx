import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import RadioChannels from "../components/RadioChannels";
import { useLocalization } from "../context/LocalizationContext";

const RadioStack = () => {
  const [radioList, setRadioList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useLocalization();

  useEffect(() => {
    getRadioChannels();
  }, []);

  const getRadioChannels = async () => {
    try {
      const response = await axios.get("https://mp3quran.net/api/v3/radios");
      // console.log(response.data.radios);
      setRadioList(response.data.radios);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.initial}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <SafeAreaView>
      <Text style={styles.text}>{t("Radio")}</Text>
      <FlatList
        data={radioList}
        renderItem={({ item }) => <RadioChannels item={item} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />
    </SafeAreaView>
  );
};

export default RadioStack;

const styles = StyleSheet.create({
  initial: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3F4765",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
