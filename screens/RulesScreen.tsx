import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from "react-native"
import { StatusBar } from "expo-status-bar"
import { SafeAreaView } from "react-native-safe-area-context"

export default function RulesScreen({ navigation }: any) {
  const handleStartGame = () => {
    navigation.navigate("Juego")
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reglas del Juego</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Image source={{ uri: "https://via.placeholder.com/150" }} style={styles.icon} />

        <Text style={styles.title}>¿Cómo se juega?</Text>

        <View style={styles.ruleContainer}>
          <View style={styles.ruleNumber}>
            <Text style={styles.ruleNumberText}>1</Text>
          </View>
          <View style={styles.ruleContent}>
            <Text style={styles.ruleTitle}>Objetivo</Text>
            <Text style={styles.ruleDescription}>
              Encuentra todos los objetos de la lista utilizando la cámara de tu dispositivo.
            </Text>
          </View>
        </View>

        <View style={styles.ruleContainer}>
          <View style={styles.ruleNumber}>
            <Text style={styles.ruleNumberText}>2</Text>
          </View>
          <View style={styles.ruleContent}>
            <Text style={styles.ruleTitle}>Toma Fotos</Text>
            <Text style={styles.ruleDescription}>
              Usa la cámara para capturar los objetos que te pedimos encontrar.
            </Text>
          </View>
        </View>

        <View style={styles.ruleContainer}>
          <View style={styles.ruleNumber}>
            <Text style={styles.ruleNumberText}>3</Text>
          </View>
          <View style={styles.ruleContent}>
            <Text style={styles.ruleTitle}>Detección</Text>
            <Text style={styles.ruleDescription}>
              Nuestra IA analizará la imagen y detectará automáticamente los objetos.
            </Text>
          </View>
        </View>

        <View style={styles.ruleContainer}>
          <View style={styles.ruleNumber}>
            <Text style={styles.ruleNumberText}>4</Text>
          </View>
          <View style={styles.ruleContent}>
            <Text style={styles.ruleTitle}>Progreso</Text>
            <Text style={styles.ruleDescription}>
              Los objetos encontrados se tacharán de la lista. ¡Encuentra todos para ganar!
            </Text>
          </View>
        </View>

        <View style={styles.ruleContainer}>
          <View style={styles.ruleNumber}>
            <Text style={styles.ruleNumberText}>5</Text>
          </View>
          <View style={styles.ruleContent}>
            <Text style={styles.ruleTitle}>Puntuación</Text>
            <Text style={styles.ruleDescription}>
              Gana puntos por cada objeto encontrado. ¡Compite por el mejor puntaje!
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleStartGame}>
          <Text style={styles.buttonText}>¡Comenzar Aventura!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#ECF0F1",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
    alignItems: "center",
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 30,
    textAlign: "center",
  },
  ruleContainer: {
    flexDirection: "row",
    marginBottom: 20,
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  ruleNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  ruleNumberText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  ruleContent: {
    flex: 1,
  },
  ruleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
  },
  ruleDescription: {
    fontSize: 16,
    color: "#7f8c8d",
    lineHeight: 22,
  },
  footer: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#ECF0F1",
  },
  button: {
    backgroundColor: "#3498db",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
})
