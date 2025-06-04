"use client"

import type React from "react"
import { createContext, useState, useContext } from "react"
import { SYNONYMS_MAP } from "../utils/huggingface" // Importamos el diccionario original

type ObjectToFind = {
  id: string
  name: string
  found: boolean
}

type GameContextType = {
  score: number
  totalScore: number
  objectsToFind: ObjectToFind[]
  resetGame: () => void
  markObjectAsFound: (objectId: string) => void
  calculateScore: () => number
  allObjectsFound: () => boolean
}

// Lista fija de objetos (por si querés usarla en vez de aleatorio)
const defaultObjects: ObjectToFind[] = [
  { id: "1", name: "Teclado", found: false },
  { id: "2", name: "Taza", found: false },
  { id: "3", name: "Lápiz", found: false },
]

// Generador aleatorio de objetos desde el mapa de sinónimos
const generateRandomObjects = (): ObjectToFind[] => {
  const keys = Object.keys(SYNONYMS_MAP)
  const selected = new Set<string>()

  while (selected.size < 3) {
    const randomIndex = Math.floor(Math.random() * keys.length)
    selected.add(keys[randomIndex])
  }

  return Array.from(selected).map((name, index) => ({
    id: (index + 1).toString(),
    name,
    found: false,
  }))
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export const useGame = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error("useGame must be used within a GameProvider")
  }
  return context
}

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [score, setScore] = useState(0)
  const [totalScore, setTotalScore] = useState(0)

  // Usá `generateRandomObjects()` para aleatorio o `defaultObjects` para fijo:
  const [objectsToFind, setObjectsToFind] = useState<ObjectToFind[]>(
    generateRandomObjects() // Cambiá a `defaultObjects` para una lista fija
  )

  const resetGame = () => {
    setScore(0)

    // Igual que arriba: elegí entre random o lista fija
    setObjectsToFind(generateRandomObjects()) // O usá `defaultObjects`
  }

  const markObjectAsFound = (objectId: string) => {
    setObjectsToFind((prevObjects) => {
      const updatedObjects = prevObjects.map((obj) =>
        obj.id === objectId ? { ...obj, found: true } : obj
      )

      const isLastObject = updatedObjects.every((obj) =>
        obj.id === objectId ? true : obj.found
      )

      if (isLastObject) {
        setScore((prev) => prev + 300)
        setTotalScore((prev) => prev + 300)
      } else {
        setScore((prev) => prev + 100)
        setTotalScore((prev) => prev + 100)
      }

      return updatedObjects
    })
  }

  const calculateScore = () => score

  const allObjectsFound = () => objectsToFind.every((obj) => obj.found)

  return (
    <GameContext.Provider
      value={{
        score,
        totalScore,
        objectsToFind,
        resetGame,
        markObjectAsFound,
        calculateScore,
        allObjectsFound,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
