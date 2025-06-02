"use client"

import { useState, useEffect, useRef } from "react"
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native"
import { CameraView, useCameraPermissions } from "expo-camera"
import * as FileSystem from "expo-file-system"
import { useGame } from "../context/GameContext"
import { StatusBar } from "expo-status-bar"
import { detectObjects } from "../utils/huggingface"
import { SafeAreaView } from "react-native-safe-area-context"

export default function GameScreen({ navigation }: any) {
  const [permission, requestPermission] = useCameraPermissions()
  const [isCapturing, setIsCapturing] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [type] = useState<"back" | "front">("back")
  const cameraRef = useRef<CameraView | null>(null)
  const { objectsToFind, markObjectAsFound, allObjectsFound } = useGame()

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission()
    }
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
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    })
    
    const detectedLabels = await detectObjects(base64)

    // Marcar los objetos detectados
    detectedLabels.forEach((label: string) => {
      const matched = objectsToFind.find(
        (obj) => obj.name.toLowerCase() === label.toLowerCase() && !obj.found
      )
      if (matched) {
        markObjectAsFound(matched.id)
      }
      navigation.navigate("Juego")
    })

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


  if (!permission) {
    return (
      <View style={styles.centeredContainer}>
        <Text>Solicitando permiso de cámara...</Text>
      </View>
    )
  }

  if (!permission.granted) {
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
  <CameraView
    ref={cameraRef}
    style={StyleSheet.absoluteFill}
    facing={type}
  />

  <View style={styles.overlay}>
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Busca los objetos</Text>
    </View>

    <View style={styles.objectListContainer}>
      <ScrollView>
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
  position: "relative", // necesario para superponer
},
  overlay: {
  ...StyleSheet.absoluteFillObject,
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
  position: "absolute",
  top: 60,
  left: 10,
  backgroundColor: "rgba(255, 248, 220, 0.8)", // color tipo pergamino transparente
  borderRadius: 12,
  paddingHorizontal: 10,
  paddingVertical: 10,
  maxHeight: 300,
  width: 150,
  borderWidth: 1,
  borderColor: "#c2a76d",
},
  objectItem: {
    backgroundColor: "#f5e9c7", // un color pergamino
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // para Android
    borderWidth: 1,
    borderColor: "#c2a76d", // borde tipo cuero o mapa viejo
  },
  objectName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#5d3c14", // marrón oscuro tipo tinta
    fontFamily: "serif", // opcional si querés un estilo manuscrito clásico
  },
  objectFound: {
    textDecorationLine: "line-through",
    color: "#a5a5a5",
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
