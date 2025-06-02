"use client"
import { createContext, useContext } from "react"

type User = {
  id: string
  username: string
  email: string
}

const defaultUser: User = {
  id: "test-user",
  username: "Aventurero",
  email: "aventurero@example.com",
}

const UserContext = createContext<User>(defaultUser)

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  return <UserContext.Provider value={defaultUser}>{children}</UserContext.Provider>
}
