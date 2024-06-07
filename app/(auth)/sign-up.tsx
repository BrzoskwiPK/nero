import { Alert, Image, ScrollView, Text, View } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'
import { createUser } from '@/lib/appwrite'
import FormField from '@/app/components/FormField'
import CustomButton from '@/app/components/CustomButton'
import Images from '@/constants/Images'
import { IAppwriteError } from '@/types/types'
import { useGlobalContext } from '@/context/GlobalProvider'

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  })
  const { setUser, setIsLoggedIn } = useGlobalContext()

  const submitForm = async () => {
    if (!form.username || !form.email || !form.password)
      Alert.alert('Error', 'Please fill in all the fields')

    setIsSubmitting(true)

    try {
      const result = await createUser(form.email, form.password, form.username)

      setUser(result)
      setIsLoggedIn(true)

      router.replace('/home')
    } catch (error: any) {
      const appwriteError = error as IAppwriteError
      Alert.alert('Error', appwriteError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

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
            <Text className='text-lg text-gray-100 font-pregular'>Already have an account?</Text>

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
