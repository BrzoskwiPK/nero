import { createContext, useContext, useState, useEffect } from 'react'
import { getCurrentUser } from '../lib/appwrite'
import { IUser, IAppwriteError, IGlobalContext, IGlobalProvider } from '@/types/types'

const emptyUser = {
  $collectionId: '',
  $createdAt: '',
  $databaseId: '',
  $id: '',
  $permissions: [],
  $updatedAt: '',
  accountId: '',
  avatar: '',
  email: '',
  username: '',
}

const GlobalContext = createContext<IGlobalContext>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: emptyUser,
  setUser: () => {},
  isLoading: true,
})

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }: IGlobalProvider) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<IUser>(emptyUser)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getCurrentUser()
      .then(res => {
        if (res) {
          setIsLoggedIn(true)
          setUser(res as IUser)
        } else {
          setIsLoggedIn(false)
          setUser(emptyUser)
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
