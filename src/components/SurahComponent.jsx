import {
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import React from "react";

const { width, height } = Dimensions.get("window");

const SurahComponent = ({ surahImages }) => {

  return (
    <FlatList
      data={surahImages}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Image
          source={item.image}
          style={[styles.images, { width: width, height: height - 150 }]}
          resizeMode="contain"
        />
      )}
      horizontal={true}
      // inverted={true}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      snapToInterval={width}
      snapToAlignment="center"
      decelerationRate="fast"
      bounces={false}
      disableIntervalMomentum
      onScroll={false}
      scrollEventThrottle={16}
      removeClippedSubviews
      scrollEnabled
      showsVerticalScrollIndicator={false}

    />
  );
};

export default SurahComponent;

const styles = StyleSheet.create({
  images: {
  }
});
