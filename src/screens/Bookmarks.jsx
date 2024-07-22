import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useBookmark } from "../context/BookmarkProvider";
import { usePageBookmark } from "../context/PageBookmarProvider";
import { convertNumberToArabic } from "../helpers/ArabicNumber";
import { StatusBar } from "expo-status-bar";
import { useLocalization } from "../context/LocalizationContext";

const Bookmarks = () => {
  const { bookmarks, clearBookmarks, removeBookmark } = useBookmark();
  const { pageBookmarks, removepageBookmark, clearpageBookmarks } =
    usePageBookmark();
  const { locale, t } = useLocalization();

  const clear = () => {
    clearBookmarks();
    clearpageBookmarks();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView style={styles.scrollView}>
        <Text style={styles.mainText}>{t("Bookmarks")}</Text>
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{t("Page Bookmarks")}</Text>
          </View>

          {pageBookmarks.length > 0 ? (
            pageBookmarks.map((bookmark, index) => (
              <Pressable
                style={[
                  styles.rowContainer,
                  locale === "ar" && styles.arabicRowContainer,
                ]}
                key={index}
              >
                <Text style={styles.page}>{bookmark.revelationType}</Text>

                <View
                  style={[
                    styles.firstRowConatiner,
                    locale === "ar" && styles.arabicFirstRowConatiner,
                  ]}
                >
                  <View>
                    <Text style={styles.name}>
                      {locale === "ar" ? bookmark.name : bookmark.englishName}
                    </Text>
                    <Text style={styles.pagenummain}>
                      {t("Number")}{" "}
                      {locale === "ar"
                        ? convertNumberToArabic(bookmark.number)
                        : bookmark.number}
                      , {t("Number Of Ayahs")}{" "}
                      {locale === "ar"
                        ? convertNumberToArabic(bookmark.numberOfAyahs)
                        : bookmark.numberOfAyahs}
                    </Text>
                  </View>
                  <Ionicons
                    name="bookmark"
                    size={24}
                    color="#6961F8"
                    onPress={() => removepageBookmark(bookmark)}
                  />
                </View>
              </Pressable>
            ))
          ) : (
            <View style={styles.notfound}>
              <Text>{t("No page bookmarks saved")}</Text>
            </View>
          )}
        </View>

        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{t("Ayah Bookmarks")}</Text>
          </View>

          {bookmarks.length > 0 ? (
            bookmarks.map((bookmark, index) => (
              <Pressable
                style={[
                  styles.rowContainer,
                  locale === "ar" && styles.arabicRowContainer,
                ]}
                key={index}
              >
                <Text style={styles.page}>
                  {locale === "ar"
                    ? convertNumberToArabic(bookmark.page)
                    : bookmark.page}
                </Text>

                <View
                  style={[
                    styles.firstRowConatiner,
                    locale === "ar" && styles.arabicFirstRowConatiner,
                  ]}
                >
                  <View>
                    <Text style={styles.name}>
                      {bookmark.surahName} - {t("Ayah")}{" "}
                      {locale === "ar"
                        ? convertNumberToArabic(bookmark.numberInSurah)
                        : bookmark.numberInSurah}
                    </Text>
                    <Text style={styles.details}>
                      {t("Page")}{" "}
                      {locale === "ar"
                        ? convertNumberToArabic(bookmark.page)
                        : bookmark.page}
                      , {t("Juz")}'
                      {locale === "ar"
                        ? convertNumberToArabic(bookmark.juz)
                        : bookmark.juz}
                    </Text>
                  </View>
                  <Ionicons
                    name="bookmark"
                    size={24}
                    color="#6961F8"
                    onPress={() => removeBookmark(bookmark)}
                  />
                </View>
              </Pressable>
            ))
          ) : (
            <View style={styles.notfound}>
              <Text>{t("No Ayah bookmarks saved")}</Text>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.clear} onPress={clear}>
          <Text style={styles.clearText}>{t("Clear Bookmarks")}</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Bookmarks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#F4F6F8",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
  },
  arabicRowContainer: {
    flexDirection: "row-reverse",
  },
  firstRowConatiner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  arabicFirstRowConatiner: {
    flexDirection: "row-reverse",
  },
  name: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
  },
  details: {
    fontSize: 14,
    lineHeight: 16,
    color: "#8D8BB2",
  },
  page: {
    fontSize: 16,
    fontWeight: "500",
  },
  notfound: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  clear: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#6961F8",
    marginBottom: 120,
  },
  clearText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  mainText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3F4765",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  pagenummain: {
    fontSize: 11,
    color: "#8D8BB2",
  },
});
