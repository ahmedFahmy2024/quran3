import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BookmarkProvider } from "./src/context/BookmarkProvider";
import { PageBookmarkProvider } from "./src/context/PageBookmarProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
} from "react-native";
import { useState, useEffect } from "react";

import HomeStack from "./src/navigations/HomeStack";
import Onboard from "./src/onboard/Onboard";
import TafseerStack from "./src/navigations/TafseerStack";
import RadioStack from "./src/navigations/RadioStack";
import ProfileStack from "./src/navigations/ProfileStack";
import Bookmarks from "./src/screens/Bookmarks";
import { FontAwesome } from "@expo/vector-icons";
import { LocalizationProvider } from "./src/context/LocalizationContext";
import { RefreshProvider } from "./src/context/LastReadSurah";

const Tab = createBottomTabNavigator();

const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [viewOnboarding, setViewOnboarding] = useState(false);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem("onboarding");
      if (value !== null) {
        setViewOnboarding(true);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

  const handleOnboardingComplete = () => {
    setViewOnboarding(true);
  };

  const tabsOptions = {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarHideOnKeyboard: true,
    tabBarStyle: {
      position: "absolute",
      bottom: 25,
      left: 20,
      right: 20,
      elevation: 0,
      backgroundColor: "#fff",
      borderRadius: 15,
      height: 90,
      ...styles.shadow,
    },
  };

  return (
    <LocalizationProvider>
      <PageBookmarkProvider>
        <BookmarkProvider>
          <RefreshProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <NavigationContainer>
                {loading ? (
                  <Loading />
                ) : viewOnboarding ? (
                  <Tab.Navigator
                    initialRouteName="Homestack"
                    screenOptions={tabsOptions}
                  >
                    <Tab.Screen
                      name="Homestack"
                      component={HomeStack}
                      options={{
                        tabBarIcon: ({ focused }) => (
                          <View
                            style={{
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Image
                              style={[
                                styles.icon,
                                { tintColor: focused ? "#7F5DF0" : "#C4D6EF" },
                              ]}
                              source={require("./src/assets/icons/Icon - Home.png")}
                              resizeMode="contain"
                            />
                          </View>
                        ),
                      }}
                    />
                    <Tab.Screen
                      name="Tafseerstack"
                      component={TafseerStack}
                      options={{
                        tabBarIcon: ({ focused }) => (
                          <View
                            style={{
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Image
                              style={[
                                styles.icon,
                                { tintColor: focused ? "#7F5DF0" : "#C4D6EF" },
                              ]}
                              source={require("./src/assets/icons/quran.png")}
                              resizeMode="contain"
                            />
                          </View>
                        ),
                      }}
                    />
                    <Tab.Screen
                      name="Radio"
                      component={RadioStack}
                      options={{
                        tabBarIcon: ({ focused }) => (
                          <View
                            style={{
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Image
                              style={[
                                styles.icon,
                                { tintColor: focused ? "#7F5DF0" : "#C4D6EF" },
                              ]}
                              source={require("./src/assets/icons/radio2.png")}
                              resizeMode="contain"
                            />
                          </View>
                        ),
                      }}
                    />
                    <Tab.Screen
                      name="Bookmarks"
                      component={Bookmarks}
                      options={{
                        tabBarIcon: ({ focused }) => (
                          <View
                            style={{
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <FontAwesome
                              name="bookmark"
                              size={24}
                              style={{ color: focused ? "#7F5DF0" : "#C4D6EF" }}
                            />
                          </View>
                        ),
                      }}
                    />
                    <Tab.Screen
                      name="profile"
                      component={ProfileStack}
                      options={{
                        tabBarIcon: ({ focused }) => (
                          <View
                            style={{
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Image
                              style={[
                                styles.icon,
                                { tintColor: focused ? "#7F5DF0" : "#C4D6EF" },
                              ]}
                              source={require("./src/assets/icons/profile.png")}
                              resizeMode="contain"
                            />
                          </View>
                        ),
                      }}
                    />
                  </Tab.Navigator>
                ) : (
                  <Onboard onComplete={handleOnboardingComplete} />
                )}
              </NavigationContainer>
            </GestureHandlerRootView>
          </RefreshProvider>
        </BookmarkProvider>
      </PageBookmarkProvider>
    </LocalizationProvider>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  icon: {
    width: 25,
    height: 25,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
