import { Image, ScrollView, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/app/components/FormField'
import CustomButton from '@/app/components/CustomButton'
import { Link } from 'expo-router'
import Images from '@/constants/Images'

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitForm = () => {}

  return (
    <SafeAreaView className='bg-primary h-full justify-center py-12'>
      <ScrollView>
        <View className='w-full justify-center h-full px-4 my-6'>
          <Image source={Images.logo} resizeMode='contain' className='w-[115px] h-[35px]' />

          <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>
            Register to Nero
          </Text>

          <FormField
            title='Username'
            value={form.username}
            handleChangeText={e => setForm({ ...form, username: e })}
            otherStyles='mt-10'
          />

          <FormField
            title='Email'
            value={form.email}
            handleChangeText={e => setForm({ ...form, email: e })}
            otherStyles='mt-7'
            keyboardType='email-address'
          />

          <FormField
            title='Password'
            value={form.password}
            handleChangeText={e => setForm({ ...form, password: e })}
            otherStyles='mt-7'
          />

          <CustomButton
            title='Sign Up'
            handlePress={submitForm}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />

          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>Have an account already?</Text>
            <Link href='/sign-in' className='text-lg font-psemibold text-secondary'>
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
