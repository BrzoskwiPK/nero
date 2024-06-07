import { createContext, useContext, useState, useEffect } from 'react'
import { getCurrentUser } from '../lib/appwrite'
import { IAppwriteError, IGlobalContext, IGlobalProvider } from '@/types/types'
import { type Models } from 'react-native-appwrite'

const GlobalContext = createContext<IGlobalContext>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: undefined,
  setUser: () => {},
  isLoading: true,
})

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }: IGlobalProvider) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getCurrentUser()
      .then(res => {
        if (res) {
          console.log(res, typeof res)
          setIsLoggedIn(true)
          setUser(res)
        } else {
          setIsLoggedIn(false)
          setUser(undefined)
        }
      })
      .catch((err: any) => {
        const appwriteError = err as IAppwriteError
        console.log('Error', appwriteError.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <GlobalContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, isLoading }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider
