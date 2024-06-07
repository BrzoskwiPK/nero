import { IAppwriteError } from '@/types/types'
import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { Models } from 'react-native-appwrite'

const useData = (fn: { (): Promise<Models.Document[]> }) => {
  const [data, setData] = useState<Models.Document[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    setIsLoading(true)

    try {
      const response = await fn()

      setData(response)
    } catch (error: any) {
      const appwriteError = error as IAppwriteError
      Alert.alert('Error', appwriteError.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const refetchData = () => fetchData()

  return { data, isLoading, refetchData }
}

export default useData
