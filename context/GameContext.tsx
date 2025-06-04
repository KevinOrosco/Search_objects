"use client"

import type React from "react"
import { createContext, useState, useContext } from "react"

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

const defaultObjects: ObjectToFind[] = [
  { id: "1", name: "Teclado", found: false },
  { id: "2", name: "Taza", found: false },
  { id: "3", name: "Lápiz", found: false },
]

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
  const [totalScore, setTotalScore] = useState(0) // nuevo acumulador
  const [objectsToFind, setObjectsToFind] = useState<ObjectToFind[]>(defaultObjects)

  const resetGame = () => {
    setScore(0)
    setObjectsToFind(defaultObjects.map((obj) => ({ ...obj, found: false })))
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
      setScore((prevScore) => prevScore + 300)
      setTotalScore((prevTotal) => prevTotal + 300)
    } else {
      setScore((prevScore) => prevScore + 100)
      setTotalScore((prevTotal) => prevTotal + 100)
    }

    return updatedObjects
  })
}



  const calculateScore = () => {
    return score
  }

  const allObjectsFound = () => {
    return objectsToFind.every((obj) => obj.found)
  }

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