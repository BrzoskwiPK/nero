import { ScrollView, Image, Text, View } from 'react-native'
import React, { FC } from 'react'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Images } from '@/constants/Index'
import CustomButton from '@/app/components/CustomButton'

const Index: FC = () => {
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className='w-full flex justify-center items-center h-full px-4'>
          <Image source={Images.logo} className='w-[130px] h-[84px]' resizeMode='contain' />
          <Image
            source={Images.cards}
            className='max-w-[380px] w-full h-[300px]'
            resizeMode='contain'
          />
          <View className='relative mt-5'>
            <Text className='text-3xl text-white font-bold text-center'>
              Discover Endless Possibilities with <Text className='text-secondary-200'>Nero</Text>
            </Text>

            <Image
              source={Images.path}
              className='w-[136px] h-[15px] absolute bottom-36 -right-2'
              resizeMode='contain'
            />

            <Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>
              Where creativity meets innovation: embark on a journey of limitless exploration with
              Nero
            </Text>

            <CustomButton
              title='Sign In'
              handlePress={() => router.push('/sign-in')}
              containerStyles='mt-7'
            />
          </View>
        </View>
      </ScrollView>

      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  )
}

export default Index
