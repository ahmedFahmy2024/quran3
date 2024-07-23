import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LastRead from '../components/LastRead'
import AllSurah from '../components/AllSurah'
import { StatusBar } from "expo-status-bar";
import { useLocalization } from "../context/LocalizationContext";

const Tafseer = () => {
  const { t } = useLocalization();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.lastRead}>
        <Text style={styles.text}>{t("Last Read")}</Text>
        <LastRead />
      </View>

      <View style={styles.allsurah}>
        <Text style={[styles.text, { marginBottom: 10 }]}>{t("All Surah")}</Text>
        <AllSurah />
      </View>

    </SafeAreaView>
  )
}

export default Tafseer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  lastRead: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  allsurah: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
    lineHeight: 24,
  }
})