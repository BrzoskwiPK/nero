import { FlatList, Image, TouchableOpacity, View } from 'react-native'
import { useGlobalContext } from '@/context/GlobalProvider'
import { getUserPosts, signOut } from '@/lib/appwrite'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import useData from '@/lib/useData'
import VideoCard from '../components/VideoCard'
import EmptyState from '../components/EmptyState'
import Icons from '@/constants/Icons'
import InfoBox from '../components/InfoBox'
import { IPost } from '@/types/types'

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext()
  const { data: posts } = useData(() => getUserPosts(user.$id))

  const handleLogout = async () => {
    await signOut()
    setUser(null)
    setIsLoggedIn(false)

    router.replace('/sign-in')
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
        ListEmptyComponent={() => (
          <EmptyState title='No Videos Found' subtitle='No videos found for this profile' />
        )}
        ListHeaderComponent={() => (
          <View className='w-full flex justify-center items-center mt-6 mb-12 px-4'>
            <TouchableOpacity onPress={handleLogout} className='flex w-full items-end mb-10'>
              <Image source={Icons.logout} resizeMode='contain' className='w-6 h-6' />
            </TouchableOpacity>

            <View className='w-16 h-16 border border-secondary rounded-lg flex justify-center items-center'>
              <Image
                source={{ uri: user?.avatar }}
                className='w-[90%] h-[90%] rounded-lg'
                resizeMode='cover'
              />
            </View>

            <InfoBox title={user?.username} containerStyles='mt-5' titleStyles='text-lg' />

            <View className='mt-5 flex flex-row'>
              <InfoBox
                title={(posts.length || 0).toString()}
                subtitle='Posts'
                titleStyles='text-xl'
                containerStyles='mr-10'
              />
              <InfoBox title='1.2k' subtitle='Followers' titleStyles='text-xl' />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Profile
