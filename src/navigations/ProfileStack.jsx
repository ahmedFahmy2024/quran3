import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { useLocalization } from "../context/LocalizationContext";

const ProfileStack = () => {
  const { locale, setLocale, t } = useLocalization();

  const handleLocaleChange = async (newLocale) => {
    await setLocale(newLocale);
  };

  // Determine text direction based on selected locale
  const isRTL = locale.startsWith("ar");

    // ======================== Bottom Sheet ========================
  const snapPoints = useMemo(() => ["25%", "50%", "70%"], []);
  const bottomShetRef = useRef(null);

  const handleOpenPress = () => {
    bottomShetRef.current?.expand();
  };

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{t("Profile")}</Text>

      <Pressable style={[styles.row, locale === "en" && styles.rowEn]} onPress={handleOpenPress}>
      
        <View style={[styles.icon]}>
          <Ionicons name="language" size={24} color="#6961F8" />
        </View>
        <Text style={styles.langText}>{t("Language")}</Text>
      </Pressable>

      <BottomSheet
        ref={bottomShetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: "#F4F6F8" }}
        handleIndicatorStyle={{ backgroundColor: "#6961F8" }}
      >
        <View style={styles.bottomSheetBar}>
          <Text style={styles.bottomSheetTextHeader}>{t("Choose the language that suits your application interface")}</Text>

          <View>
            <TouchableOpacity style={[styles.langrow, locale === "en" && styles.langrowEn]} onPress={() => handleLocaleChange("en")}>
              <Image
                source={require("../assets/icons/united-kingdom.png")}
                resizeMode="contain"
                style={{ width: 30, height: 30 }}
              />
              <Text style={[styles.bottomSheetTexttext]}>{t("English")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.langrow, locale === "en" && styles.langrowEn]} onPress={() => handleLocaleChange("ar")}>
              <Image
                source={require("../assets/icons/flag.png")}
                resizeMode="contain"
                style={{ width: 33, height: 33 }}
              />
              <Text style={[styles.bottomSheetTexttext]}>{t("Arabic")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>

    </SafeAreaView>
  );
};

export default ProfileStack;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3F4765",
    paddingVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    gap: 10,
  },
  rowEn: {
    flexDirection: "row-reverse",
  },
  icon: {
    backgroundColor: "#F4F6F8",
    borderRadius: 10,
    padding: 10,
  },
  arabicIcon: {
    marginRight: 0,
    marginLeft: 10,
  },
  langText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#3F4765",
  },
  bottomSheetBar: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  bottomSheetTextHeader: {
    fontSize: 16,
    fontWeight: "500",
    color: "#3F4765",
    textAlign: "center",
    marginBottom: 10,
  },
  bottomSheetTexttext: {
    fontSize: 16,
    fontWeight: "500",
    color: "#3F4765",
  },
  arabicText: {
    marginLeft: 0,
    marginRight: 10,
  },
  langrow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    gap: 10,
  },
  langrowEn: {
    flexDirection: "row-reverse",
  },
});
