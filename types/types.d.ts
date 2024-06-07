import { type Models } from 'react-native-appwrite'

export interface IGlobalContext {
  isLoggedIn: boolean
  setIsLoggedIn: Dispatch<React.SetStateAction<boolean>>
  user: IUser
  setUser: Dispatch<React.SetStateAction<IUser>>
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

export interface IUser extends Models.Document {
  $collectionId: string
  $createdAt: string
  $databaseId: string
  $id: string
  $permissions: string[]
  $updatedAt: string
  accountId: string
  avatar: string
  email: string
  username: string
}

export interface FormState {
  title: string
  video: ImagePickerAsset | null
  thumbnail: ImagePickerAsset | null
  prompt: string
}

export interface UserId {
  userId: string
}

export type FileState = FormState & UserId
