import { StyleSheet, View, Animated, useWindowDimensions } from "react-native";
import React from 'react'

const Paginator = ({ data, scrollX }) => {
    const { width } = useWindowDimensions();

    return (
        <View style={styles.container}>
            {data.map((_, i) => {

                const inputRange = [
                    (data.length - 2 - i) * width,  // Ending point for the dot's visibility
                    (data.length - 2 - i + 0.5) * width, // Full visibility when the image is centered
                    (data.length - 1 - i + 1) * width  // Starting point for the dot's visibility
                ];

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10, 20, 10],
                    extrapolate: "clamp",
                });

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: "clamp",
                });

                return <Animated.View style={[styles.dot, { width: dotWidth, opacity }]} key={i.toString()} />;
            })}
        </View>
    )
}

export default Paginator

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 64,
    },
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: "#493d8a",
        marginHorizontal: 8,
    },
})