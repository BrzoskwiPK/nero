import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { FC, useState } from 'react'

interface FormFieldProps {
  title: string
  value: string
  placeholder?: string
  otherStyles?: string
  keyboardType?: string
  secureTextEntry?: boolean
  handleChangeText: (e: string) => void
}

import Icons from '@/constants/Icons'

const FormField: FC<FormFieldProps> = ({
  title,
  value,
  placeholder,
  otherStyles,
  handleChangeText,
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>

      <View className='flex-row border-2 border-black-200 rounded-md w-full h-16 px-4 bg-black-100 focus:border-secondary items-center'>
        <TextInput
          className='flex-1 text-white font-psemibold text-base'
          value={value}
          placeholder={placeholder}
          placeholderTextColor='#7b7b8b'
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
        />

        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? Icons.eye : Icons.eyeHide}
              className='w-6 h-6'
              resizeMode='contain'
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField
