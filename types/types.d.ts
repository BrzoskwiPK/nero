import { type Models } from 'react-native-appwrite'

export interface IGlobalContext {
  isLoggedIn: boolean
  setIsLoggedIn: Dispatch<React.SetStateAction<boolean>>
  user: Models.User<DefaultPreferences> | undefined
  setUser: Dispatch<React.SetStateAction<Models.User<DefaultPreferences> | undefined>>
  isLoading: boolean
}

export interface DefaultPreferences extends Models.Preferences {}

export interface IGlobalProvider {
  children: ReactNode
}

export interface IAppwriteError extends Error {
  message: string
}

export interface ICreator {
  username: string
  avatar: string
}

export interface IPost extends Models.Document {
  title: string
  thumbnail: string
  video: string
  creator: ICreator
}
