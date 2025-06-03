"use client"
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from "react-native"
import { useUser } from "../context/UserContext"
import { useGame } from "../context/GameContext"
import { StatusBar } from "expo-status-bar"
import { SafeAreaView } from "react-native-safe-area-context"


export default function HomeScreen({ navigation }: any) {
  const { username } = useUser()
  const { resetGame } = useGame()

  const handleStartGame = () => {
    resetGame()
    navigation.navigate("Rules")
  }

  const handleViewRanking = () => {
    navigation.navigate("Ranking")
  }

  const handleViewProfile = () => {
    navigation.navigate("Profile")
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Buscador de Objetos</Text>
        <TouchableOpacity onPress={handleViewProfile} style={styles.profileButton}>
          <View style={styles.profileIcon}>
            <Text style={styles.profileInitial}>{username.charAt(0) || "U"}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ImageBackground
      source={require("../assets/pinguino.png")} // Fondo
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.content}>

        <Text style={styles.welcomeText}>¡Hola, {username || "Aventurero"}!</Text>
        <Text style={styles.tagline}>¿Listo para una nueva misión de búsqueda?</Text>
      
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleStartGame}>
            <Text style={styles.primaryButtonText}>Iniciar Búsqueda</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={handleViewRanking}>
            <Text style={styles.secondaryButtonText}>Ranking</Text>
          </TouchableOpacity>
          
        </View>
      </View>
      </ImageBackground>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#ECF0F1",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  profileButton: {
    padding: 4,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
  flex: 1,
  width: "100%",
  height: "100%",
  },
  profileInitial: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  characterImage: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
    textAlign: "center",
  },
  tagline: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 40,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    maxWidth: 300,
    marginTop: 400,
  },
  primaryButton: {
    backgroundColor: "#e67e22",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
    elevation: 5,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3498db",
  },
  secondaryButtonText: {
    color: "#3498db",
    fontSize: 18,
    fontWeight: "bold",
  },
})
