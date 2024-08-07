import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react'

interface AuthContextType {
  currentUser: any
  login: (email: string, password: string) => Promise<any>
  userData: any
  setUserData: Dispatch<SetStateAction<any>>
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData')
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData))
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData))
    }
  }, [userData])

  const login = (email: string, password: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:8080/staff/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Invalid credentials')
          }
          return response.json()
        })
        .then((data) => {
          setCurrentUser(data)
          setUserData(data)
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  const value = {
    currentUser,
    login,
    userData,
    setUserData,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
