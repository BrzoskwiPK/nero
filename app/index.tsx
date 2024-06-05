import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Index = () => {
  return (
    <View>
      <Text className='bg-red-500 text-white'>SIEMA</Text>
      <Link href='/profile'>Go to Profile</Link>
    </View>
  )
}

export default Index

const styles = StyleSheet.create({})
