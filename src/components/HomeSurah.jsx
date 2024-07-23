import { FlatList, StyleSheet, View } from "react-native";
import SurahPage from "./SurahPage";

const HomeSurah = ({ listOfSurah }) => {

    return (
      <View>
        <FlatList
          data={listOfSurah}
          keyExtractor={(item) => item.number.toString()}
          renderItem={({ item }) => <SurahPage item={item} />}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: "#f1f1f6", marginVertical: 10 }} />}
          contentContainerStyle={{ paddingBottom: 350 }}
        />
      </View>
    );
  };

export default HomeSurah

const styles = StyleSheet.create({})