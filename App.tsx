import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AuthProvider } from "./context/AuthContext"
import { GameProvider } from "./context/GameContext"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import HomeScreen from "./screens/HomeScreen"
import RulesScreen from "./screens/RulesScreen"
import GameScreen from "./screens/GameScreen"
import SummaryScreen from "./screens/SummaryScreen"
import ProfileScreen from "./screens/ProfileScreen"
import RankingScreen from "./screens/RankingScreen"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <AuthProvider>
      <GameProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Rules" component={RulesScreen} />
            <Stack.Screen name="Game" component={GameScreen} />
            <Stack.Screen name="Summary" component={SummaryScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Ranking" component={RankingScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </GameProvider>
    </AuthProvider>
  )
}
