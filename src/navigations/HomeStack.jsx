import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native'
import Home from '../screens/Home';
import HomeDetails from '../screens/HomeDetails';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{headerShown: false }} />
      <Stack.Screen name="HomeDetails" component={HomeDetails} options={{headerShown: false }} />
    </Stack.Navigator>
  )
}

export default HomeStack

const styles = StyleSheet.create({})