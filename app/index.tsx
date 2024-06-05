import { Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const Index = () => {
  return (
    <View>
      <Text className='bg-red-500 text-white'>SIEMA</Text>
      <StatusBar style='auto' />
      <Link href='/home' className='text-white'>
        Go to Home
      </Link>
    </View>
  )
}

export default Index
