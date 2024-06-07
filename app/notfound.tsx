import { View, Text } from 'react-native'

const NotFound = () => {
  return (
    <View className='flex items-center justify-center h-full'>
      <Text className='text-2xl text-gray-900 font-bold'>Page Not Found</Text>
      <Text className='text-lg text-gray-600'>The page you are looking for does not exist.</Text>
    </View>
  )
}

export default NotFound
