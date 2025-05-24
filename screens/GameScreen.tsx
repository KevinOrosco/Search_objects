"use client"

import { useState, useEffect, useRef } from "react"
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native"
import { Camera } from "expo-camera"
import * as FileSystem from "expo-file-system"
import { useGame } from "../context/GameContext"
import { StatusBar } from "expo-status-bar"

export default function GameScreen({ navigation }: any) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [isCapturing, setIsCapturing] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const cameraRef = useRef<Camera | null>(null)
  const { objectsToFind, markObjectAsFound, allObjectsFound } = useGame()

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === "granted")
    })()
  }, [])

  const takePicture = async () => {
    if (cameraRef.current && !isCapturing) {
      setIsCapturing(true)
      try {
        const photo = await cameraRef.current.takePictureAsync()
        await processImage(photo.uri)
      } catch (error) {
        console.error("Error taking picture:", error)
        Alert.alert("Error", "No se pudo tomar la foto. Inténtalo de nuevo.")
      } finally {
        setIsCapturing(false)
      }
    }
  }

  const processImage = async (uri: string) => {
    setIsProcessing(true)
    try {
      // Convert image to base64
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      })

      // In a real app, you would send this to Hugging Face API
      // This is a mock implementation that simulates object detection
      await simulateObjectDetection(base64)

      // Check if all objects are found
      if (allObjectsFound()) {
        navigation.replace("Summary")
      }
    } catch (error) {
      console.error("Error processing image:", error)
      Alert.alert("Error", "No se pudo procesar la imagen. Inténtalo de nuevo.")
    } finally {
      setIsProcessing(false)
    }
  }

  // Mock function to simulate object detection
  const simulateObjectDetection = async (base64: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Randomly mark 1-2 objects as found
    const notFoundObjects = objectsToFind.filter((obj) => !obj.found)
    if (notFoundObjects.length > 0) {
      const randomIndex = Math.floor(Math.random() * notFoundObjects.length)
      markObjectAsFound(notFoundObjects[randomIndex].id)

      // Sometimes mark a second object
      if (notFoundObjects.length > 1 && Math.random() > 0.5) {
        const secondIndex = (randomIndex + 1) % notFoundObjects.length
        markObjectAsFound(notFoundObjects[secondIndex].id)
      }
    }
  }

  if (hasPermission === null) {
    return (
      <View style={styles.centeredContainer}>
        <Text>Solicitando permiso de cámara...</Text>
      </View>
    )
  }

  if (hasPermission === false) {
    return (
      <View style={styles.centeredContainer}>
        <Text>No hay acceso a la cámara</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.cameraContainer}>
        <Camera ref={cameraRef} style={styles.camera} type={type} ratio="16:9">
          <View style={styles.overlay}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Busca los objetos</Text>
            </View>

            <View style={styles.objectListContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.objectList}>
                {objectsToFind.map((object) => (
                  <View key={object.id} style={styles.objectItem}>
                    <Text style={[styles.objectName, object.found && styles.objectFound]}>{object.name}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>

            <View style={styles.captureContainer}>
              {isProcessing ? (
                <View style={styles.processingContainer}>
                  <ActivityIndicator size="large" color="#FFFFFF" />
                  <Text style={styles.processingText}>Analizando imagen...</Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={[styles.captureButton, isCapturing && styles.captureButtonDisabled]}
                  onPress={takePicture}
                  disabled={isCapturing}
                >
                  <View style={styles.captureButtonInner} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Camera>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "space-between",
  },
  header: {
    padding: 20,
    alignItems: "center",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  objectListContainer: {
    padding: 10,
  },
  objectList: {
    maxHeight: 50,
  },
  objectItem: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 5,
    justifyContent: "center",
  },
  objectName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  objectFound: {
    textDecorationLine: "line-through",
    color: "#7f8c8d",
  },
  captureContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonDisabled: {
    opacity: 0.5,
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
  },
  processingContainer: {
    alignItems: "center",
  },
  processingText: {
    color: "#FFFFFF",
    marginTop: 10,
    fontSize: 16,
  },
})
