import {
    StyleSheet,
    Text,
    View,
    Image,
    useWindowDimensions,
} from "react-native";
import React from 'react'

const OnboardItem = ({ item }) => {
    const { width } = useWindowDimensions();

    return (
        <View style={[styles.container, { width }]}>
            <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>

            <Image
                source={item.image}
                style={[styles.image, { width, resizeMode: "contain" }]}
            />
        </View>
    )
}

export default OnboardItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        flex: 0.7,
        justifyContent: "center",
    },
    title: {
        fontWeight: "800",
        fontSize: 28,
        marginBottom: 10,
        color: "#493d8a",
        textAlign: "center",
    },
    description: {
        fontWeight: "300",
        color: "#62656b",
        textAlign: "center",
        paddingHorizontal: 64,
        marginBottom: 10,
    },
})