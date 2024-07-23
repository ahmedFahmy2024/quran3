import { FlatList, View, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import Box from "./Box";

const Verses = ({ ayats, data }) => {

  return (
    <View style={styles.container}>
      <FlashList
        estimatedItemSize={200}
        data={ayats}
        keyExtractor={(item) => item.number.toString()}
        renderItem={({ item }) => <Box item={item} data={data}/>}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 450 }}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              backgroundColor: "#f1f1f6",
              marginVertical: 20,
              marginHorizontal: 20,
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Verses;
