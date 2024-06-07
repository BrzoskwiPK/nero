import { FC } from 'react'
import { View, Image, Text } from 'react-native'
import { ImageSourcePropType } from 'react-native'

interface TabIconProps {
  icon: ImageSourcePropType
  color: string
  name: string
  focused: boolean
}

const TabIcon: FC<TabIconProps> = ({ icon, color, name, focused }: TabIconProps) => {
  return (
    <View className='items-center justify-center gap-2'>
      <Image source={icon} resizeMode='contain' tintColor={color} className='w-6 h-6' />

      <Text
        className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
        style={{ color: color }}>
        {name}
      </Text>
    </View>
  )
}

export default TabIcon
