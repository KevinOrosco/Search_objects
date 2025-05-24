"use client"
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Image } from "react-native"
import { useGame } from "../context/GameContext"
import { StatusBar } from "expo-status-bar"
import { useAuth } from "../context/AuthContext"

export default function SummaryScreen({ navigation }: any) {
  const { score, resetGame } = useGame()
  const { user } = useAuth()

  const handlePlayAgain = () => {
    resetGame()
    navigation.replace("Game")
  }

  const handleGoHome = () => {
    navigation.replace("Home")
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.content}>
        <Image source={{ uri: "https://via.placeholder.com/200" }} style={styles.trophyImage} />

        <Text style={styles.congratsText}>¡Felicidades!</Text>
        <Text style={styles.completedText}>Has completado la misión</Text>

        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>Puntuación</Text>
          <Text style={styles.scoreValue}>{score}</Text>
          <Text style={styles.playerName}>{user?.username || "Aventurero"}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Objetos</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>100%</Text>
            <Text style={styles.statLabel}>Precisión</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>A+</Text>
            <Text style={styles.statLabel}>Rango</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handlePlayAgain}>
            <Text style={styles.primaryButtonText}>Jugar de Nuevo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={handleGoHome}>
            <Text style={styles.secondaryButtonText}>Volver al Inicio</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  trophyImage: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  congratsText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
  },
  completedText: {
    fontSize: 20,
    color: "#7f8c8d",
    marginBottom: 30,
  },
  scoreContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    width: "100%",
    maxWidth: 300,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 30,
  },
  scoreLabel: {
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#3498db",
    marginBottom: 8,
  },
  playerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 300,
    marginBottom: 40,
  },
  statItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  buttonContainer: {
    width: "100%",
    maxWidth: 300,
  },
  primaryButton: {
    backgroundColor: "#3498db",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  primaryButtonText: {
    color: "#FFFFFF",
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
