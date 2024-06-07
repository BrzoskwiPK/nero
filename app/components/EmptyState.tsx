import { View, Image, Text } from 'react-native'
import { FC } from 'react'
import { router } from 'expo-router'
import Images from '@/constants/Images'
import CustomButton from './CustomButton'

interface EmptyStateProps {
  title: string
  subtitle: string
}

const EmptyState: FC<EmptyStateProps> = ({ title, subtitle }: EmptyStateProps) => {
  return (
    <View className='justify-center items-center px-4'>
      <Image source={Images.empty} className='w-[270px] h-[215px]' resizeMode='contain' />

      <Text className='text-xl text-center font-psemibold text-white mt-2'>{title}</Text>
      <Text className='font-pmedium text-sm text-gray-100'>{subtitle}</Text>

      <CustomButton
        title='Create video'
        handlePress={() => router.push('/create')}
        containerStyles='w-full mt-6'
      />
    </View>
  )
}

export default EmptyState
