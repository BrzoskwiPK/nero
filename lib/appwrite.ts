import { IAppwriteError, IPost } from '@/types/types'
import {
  Account,
  Avatars,
  Storage,
  Client,
  Databases,
  ID,
  Query,
  ImageGravity,
} from 'react-native-appwrite'

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.brzoskwipk.nero',
  projectId: '6661c9530007fd43dcff',
  databaseId: '6661ca0b003668f72f7c',
  userCollectionId: '6661ca18002b071170d3',
  videoCollectionId: '6661ca2900289e0b5a63',
  storageId: '6661cae1001ebba57cc7',
}

const client = new Client()

client.setEndpoint(config.endpoint).setProject(config.projectId).setPlatform(config.platform)

const account = new Account(client)
const storage = new Storage(client)
const avatars = new Avatars(client)
const databases = new Databases(client)

export const createUser = async (email: string, password: string, username: string) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username)

    if (!newAccount) throw Error

    const avatarUrl = avatars.getInitials(username)

    await signIn(email, password)

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    )

    return newUser
  } catch (error: any) {
    const appwriteError = error as IAppwriteError
    throw new Error(appwriteError.message)
  }
}

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password)

    return session
  } catch (error: any) {
    const appwriteError = error as IAppwriteError
    throw new Error(appwriteError.message)
  }
}

export const getAccount = async () => {
  try {
    const currentAccount = await account.get()

    return currentAccount
  } catch (error: any) {
    const appwriteError = error as IAppwriteError
    throw new Error(appwriteError.message)
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await getAccount()

    if (!currentAccount) throw Error('Could not fetch current user')

    const currentUser = await databases.listDocuments(config.databaseId, config.userCollectionId, [
      Query.equal('accountId', currentAccount.$id),
    ])

    if (!currentUser) throw Error

    return currentUser.documents[0]
  } catch (error: any) {
    console.log((error as IAppwriteError).message)
    return null
  }
}

export const signOut = async () => {
  try {
    const session = await account.deleteSession('current')

    return session
  } catch (error: any) {
    const appwireError = error as IAppwriteError
    throw new Error(appwireError.message)
  }
}

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId, [
      Query.orderDesc('$createdAt'),
    ])

    return posts.documents as IPost[]
  } catch (error: any) {
    const appwireError = error as IAppwriteError
    throw new Error(appwireError.message)
  }
}

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId, [
      Query.orderDesc('$createdAt'),
      Query.limit(7),
    ])

    return posts.documents as IPost[]
  } catch (error: any) {
    const appwireError = error as IAppwriteError
    throw new Error(appwireError.message)
  }
}

export const searchPosts = async (query: string) => {
  try {
    const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId, [
      Query.search('title', query),
    ])

    if (!posts) throw new Error('Something went wrong')

    return posts.documents as IPost[]
  } catch (error: any) {
    const appwireError = error as IAppwriteError
    throw new Error(appwireError.message)
  }
}

export const getUserPosts = async (userId: string) => {
  try {
    const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId, [
      Query.equal('creator', userId),
    ])

    return posts.documents as IPost[]
  } catch (error: any) {
    const appwireError = error as IAppwriteError
    throw new Error(appwireError.message)
  }
}

export const uploadFile = async (file: any, type: string) => {
  if (!file) return

  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  }

  try {
    const uploadedFile = await storage.createFile(config.storageId, ID.unique(), asset)

    const fileUrl = await getFilePreview(uploadedFile.$id, type)
    return fileUrl
  } catch (error: any) {
    const appwireError = error as IAppwriteError
    throw new Error(appwireError.message)
  }
}

export const getFilePreview = async (fileId: string, type: string) => {
  let fileUrl

  try {
    if (type === 'video') {
      fileUrl = storage.getFileView(config.storageId, fileId)
    } else if (type === 'image') {
      fileUrl = storage.getFilePreview(config.storageId, fileId, 2000, 2000, ImageGravity.Top, 100)
    } else {
      throw new Error('Invalid file type')
    }

    if (!fileUrl) throw Error

    return fileUrl
  } catch (error: any) {
    const appwireError = error as IAppwriteError
    throw new Error(appwireError.message)
  }
}

export const createVideoPost = async (form: any) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, 'image'),
      uploadFile(form.video, 'video'),
    ])

    const newPost = await databases.createDocument(
      config.databaseId,
      config.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    )

    return newPost
  } catch (error: any) {
    const appwireError = error as IAppwriteError
    throw new Error(appwireError.message)
  }
}
