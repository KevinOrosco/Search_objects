"use client"

import { useState, useEffect } from "react"
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image } from "react-native"
import { StatusBar } from "expo-status-bar"
import { useGame } from "../context/GameContext"
import { SafeAreaView } from "react-native-safe-area-context"

type RankingItem = {
  id: string
  username: string
  score: number
  rank?: number
}

export default function RankingScreen({ navigation }: any) {
  const [rankings, setRankings] = useState<RankingItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { totalScore } = useGame()

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Datos mock de otros jugadores
        const mockOthers: RankingItem[] = [
          { id: "1", username: "SuperBuscador", score: 1250 },
          { id: "2", username: "Aventurera99", score: 980 },
          { id: "3", username: "ElDetective", score: 875 },
          { id: "4", username: "Explorador", score: 720 },
          { id: "5", username: "CazaObjetos", score: 650 },
          { id: "6", username: "LupaMaestra", score: 590 },
          { id: "7", username: "BuscadorPro", score: 540 },
          { id: "8", username: "ObjetivoClaro", score: 480 },
          { id: "9", username: "MisionCumplida", score: 420 },
          { id: "10", username: "CampeónBúsqueda", score: 380 },
        ]

        const currentPlayer: RankingItem = {
          id: "0",
          username: "Tú",
          score: totalScore,
        }

        // Combinar, ordenar y asignar rank dinámico
        const allPlayers = [currentPlayer, ...mockOthers]
          .sort((a, b) => b.score - a.score)
          .map((item, index) => ({
            ...item,
            rank: index + 1,
          }))

        setRankings(allPlayers)
      } catch (error) {
        console.error("Error fetching rankings:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRankings()
  }, [totalScore])

  const handleGoBack = () => {
    navigation.goBack()
  }

  const renderRankingItem = ({ item }: { item: RankingItem }) => (
    <View
      style={[
        styles.rankingItem,
        item.rank === 1 ? styles.firstPlace : null,
        item.rank === 2 ? styles.secondPlace : null,
        item.rank === 3 ? styles.thirdPlace : null,
        item.username === "Tú" ? { borderWidth: 2, borderColor: "#3498db" } : null,
      ]}
    >
      <View style={styles.rankContainer}>
        <Text style={styles.rankText}>{item.rank}</Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.username}>{item.username}</Text>
      </View>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>{item.score}</Text>
        <Text style={styles.scoreLabel}>pts</Text>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Atrás</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ranking Global</Text>
        <View style={{ width: 50 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.trophyContainer}>
          <Image source={{ uri: "https://via.placeholder.com/100" }} style={styles.trophyImage} />
          <Text style={styles.trophyText}>Tabla de Clasificación</Text>
        </View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Cargando ranking...</Text>
          </View>
        ) : (
          <FlatList
            data={rankings}
            renderItem={renderRankingItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.rankingList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  // (los mismos estilos que ya tenías)
  container: { flex: 1, backgroundColor: "#F5F7FA" },
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
  backButton: { padding: 4 },
  backButtonText: {
    color: "#3498db",
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  trophyContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  trophyImage: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  trophyText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#7f8c8d",
  },
  rankingList: {
    paddingBottom: 20,
  },
  rankingItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  firstPlace: {
    backgroundColor: "#FFF9C4",
    borderWidth: 1,
    borderColor: "#FBC02D",
  },
  secondPlace: {
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#BDBDBD",
  },
  thirdPlace: {
    backgroundColor: "#FFCCBC",
    borderWidth: 1,
    borderColor: "#E64A19",
  },
  rankContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  rankText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  userInfo: { flex: 1 },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  scoreContainer: {
    alignItems: "flex-end",
  },
  scoreText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3498db",
  },
  scoreLabel: {
    fontSize: 12,
    color: "#7f8c8d",
  },
})
