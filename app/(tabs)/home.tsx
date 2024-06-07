import { Image, View, Text, FlatList, RefreshControl, Alert } from 'react-native'
import { FC, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getAllPosts, getLatestPosts } from '@/lib/appwrite'
import Images from '@/constants/Images'
import SearchInput from '../components/SearchInput'
import Trending from '../components/Trending'
import EmptyState from '../components/EmptyState'
import useData from '@/lib/useData'
import VideoCard from '../components/VideoCard'
import { useGlobalContext } from '@/context/GlobalProvider'
import { IPost } from '@/types/types'

const Home: FC = () => {
  const [refreshing, setRefreshing] = useState(false)
  const { data: posts, refetchData } = useData(getAllPosts)
  const { data: latestPosts } = useData(getLatestPosts)
  const { user, setUser, setIsLoggedIn } = useGlobalContext()

  const onRefresh = async () => {
    setRefreshing(true)

    await refetchData()

    setRefreshing(false)
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={(posts as IPost[]) || []}
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
            <View className='justify-between items-start flex-row mb-6'>
              <View className='items-center justify-center flex-row gap-2'>
                <Text className='font-pmedium text-sm text-gray-100'>Welcome back,</Text>
                <Text className='text-2xl font-psemibold text-white'>{user?.username}</Text>
              </View>

              <View className='mt-1.5'>
                <Image source={Images.logoSmall} className='w-9 h-10' resizeMode='contain' />
              </View>
            </View>

            <SearchInput initialQuery='' />

            <View className='w-full flex-1 pt-5 pb-8'>
              <Text className='text-gray-100 text-lg font-pregular mb-3'>Latest Videos</Text>

              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title='No Videos Found' subtitle='Upload the first video' />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  )
}

export default Home
