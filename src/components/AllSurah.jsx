import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import Surah from "./Surah";

const AllSurah = () => {
  const [listOfSurah, setListOfsurah] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <View>
      <FlatList
        data={listOfSurah}
        keyExtractor={(item) => item.number.toString()}
        renderItem={({ item }) => <Surah item={item} />}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: "#f1f1f6", marginVertical: 10 }} />}
        contentContainerStyle={{ paddingBottom: 380 }}
      />
    </View>
  );
};

export default AllSurah;
