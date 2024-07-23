import { FlatList, StyleSheet, View, Animated } from "react-native";
import { useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import OnboardingItem from "./OnboardItem";
import Paginator from "./Paginator";
import NextButton from "./NextButton";
import slides from '../assets/slides';

const Onboard = ({ onComplete }) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = async () => {
    if (currentIndex === 0) {
      slidesRef.current.scrollToIndex({
        index: currentIndex + 2,
      });
    } else if (currentIndex === 1) {
      slidesRef.current.scrollToIndex({
        index: currentIndex + 1,
      });
     } else if (currentIndex === 2) {
        try {
          await AsyncStorage.setItem("onboarding", "true");
          onComplete();
        } catch (error) {
          console.log(error);
        }
      }
    }

  // Calculate percentage based on currentIndex and total slides
  const percentage = ((currentIndex + 1) / slides.length) * 100;

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>

      <Paginator data={slides} scrollX={scrollX} />
      <NextButton percentage={percentage} scrollTo={scrollTo} />
    </View>
  )
}

export default Onboard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});