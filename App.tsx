import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { UserProvider } from "./context/UserContext"
import { GameProvider } from "./context/GameContext"
import { SafeAreaProvider } from "react-native-safe-area-context"

import GameScreen from "./screens/GameScreen"
import JuegoScreen from "./screens/JuegoScreen"
import HomeScreen from "./screens/HomeScreen"
import RulesScreen from "./screens/RulesScreen"
import SummaryScreen from "./screens/SummaryScreen"
import ProfileScreen from "./screens/ProfileScreen"
import RankingScreen from "./screens/RankingScreen"

type RootStackParamList = { 
  Game: undefined
  Home: undefined
  Rules: undefined
  Juego: undefined
  Camera: undefined
  Summary: undefined
  Profile: undefined
  Ranking: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <SafeAreaProvider>
    <UserProvider>
      <GameProvider>
        <NavigationContainer>
          <Stack.Navigator id = {undefined} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Rules" component={RulesScreen} />
            <Stack.Screen name="Juego" component={JuegoScreen} />
            <Stack.Screen name="Camera" component={GameScreen} />
            <Stack.Screen name="Summary" component={SummaryScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Ranking" component={RankingScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </GameProvider>
    </UserProvider>
    </SafeAreaProvider>
  )
}
