import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { convertNumberToArabic } from "../helpers/ArabicNumber";
import { useLocalization } from "../context/LocalizationContext";

const SurahPage = ({ item }) => {
  const navigation = useNavigation();
  const { locale } = useLocalization();

  return (
    <TouchableOpacity
      style={[styles.surahcontainer]}
      onPress={() => navigation.navigate("HomeDetails", { surah: item })}
    >
      <View>
        <Text style={styles.name}>{item.name}</Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <View style={styles.textcotainer}>
          <Text style={styles.surah}>{item.englishName}</Text>
          <Text style={styles.type}>{item.revelationType}</Text>
        </View>
        <ImageBackground
          source={require("../assets/icons/Juz.png")}
          resizeMode="cover"
          style={styles.image}
        >
          <Text style={styles.num}>
            {locale === "ar"
              ? convertNumberToArabic(item.numberOfAyahs)
              : item.numberOfAyahs}
          </Text>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default SurahPage;

const styles = StyleSheet.create({
  surahcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  image: {
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  textcotainer: {
    height: 40,
  },
  num: {
    color: "#BEBDD9",
    fontSize: 12,
    lineHeight: 20,
  },
  surah: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
  },
  type: {
    fontSize: 14,
    lineHeight: 16,
    color: "#8D8BB2",
  },
  name: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "500",
  },
});
