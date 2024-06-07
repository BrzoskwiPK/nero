import { FlatList, Text, View } from 'react-native'
import { FC, useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { searchPosts } from '@/lib/appwrite'
import { IPost } from '@/types/types'
import useData from '@/lib/useData'
import VideoCard from '../components/VideoCard'
import SearchInput from '../components/SearchInput'
import EmptyState from '../components/EmptyState'

const Search: FC = () => {
  const { query } = useLocalSearchParams()
  const { data: posts, refetchData } = useData(() => searchPosts(query as string))

  useEffect(() => {
    refetchData()
  }, [query])

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={(posts as IPost[]) ?? []}
        keyExtractor={item => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator}
          />
        )}
        ListHeaderComponent={() => (
          <View className='my-6 px-4 space-y-6'>
            <View className='justify-between items-start mb-6'>
              <View className='flex-row'>
                <Text className='font-pmedium text-sm text-gray-100'>Search Results:</Text>
                <Text className='text-xl ml-2 font-psemibold text-white -mt-1'>{query}</Text>
              </View>

              <View className='mt-10 mb-8 flex-1'>
                <SearchInput initialQuery={query as string} />
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title='No Videos Found' subtitle='No videos found for this search query' />
        )}
      />
    </SafeAreaView>
  )
}

export default Search
