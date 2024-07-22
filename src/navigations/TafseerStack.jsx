import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tafseer from '../screens/Tafseer';
import TafseerDetails from '../screens/TafseerDetails';
import Bookmarks from '../screens/Bookmarks';

const Stack = createNativeStackNavigator();

const TafseerStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tafseer" component={Tafseer} options={{headerShown: false }} />
      <Stack.Screen name="TafseerDetails" component={TafseerDetails} options={{headerShown: false }} />
      <Stack.Screen name="Bookmarks" component={Bookmarks} options={{headerShown: false }} />
    </Stack.Navigator>
  )
}

export default TafseerStack