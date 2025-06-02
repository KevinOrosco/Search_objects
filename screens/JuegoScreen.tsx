"use client"

import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { useGame } from "../context/GameContext"
import { StatusBar } from "expo-status-bar"
import { SafeAreaView } from "react-native-safe-area-context"

export default function JuegoScreen({ navigation }: any) {
  const { objectsToFind } = useGame()

  const foundCount = objectsToFind.filter((obj) => obj.found).length
  const total = objectsToFind.length

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <Text style={styles.title}>Tu misión de búsqueda</Text>

      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Progreso: {foundCount}/{total}</Text>
      </View>

      <ScrollView style={styles.listContainer}>
        {objectsToFind.map((object) => (
          <View key={object.id} style={styles.objectItem}>
            <Text style={[styles.objectName, object.found && styles.found]}>
              {object.name}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Camera")}>
          <Text style={styles.buttonText}>Tomar Foto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.endButton} onPress={() => navigation.navigate("Summary")}>
          <Text style={styles.buttonText}>Terminar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdf3e7",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    color: "#5d3c14",
  },
  progressContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
  progressText: {
    fontSize: 16,
    color: "#5d3c14",
  },
  listContainer: {
    flex: 1,
    marginVertical: 10,
  },
  objectItem: {
    backgroundColor: "#f5e9c7",
    borderRadius: 10,
    padding: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#c2a76d",
  },
  objectName: {
    fontSize: 16,
    color: "#5d3c14",
  },
  found: {
    textDecorationLine: "line-through",
    color: "#a5a5a5",
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "#c28b45",
    padding: 12,
    borderRadius: 10,
    minWidth: 120,
  },
  endButton: {
    backgroundColor: "#8b3e2f",
    padding: 12,
    borderRadius: 10,
    minWidth: 120,
  },
  buttonText: {
    color: "#fff8e1",
    textAlign: "center",
    fontWeight: "bold",
  },
})
