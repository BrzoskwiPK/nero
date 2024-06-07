import { AVPlaybackStatusSuccess, ResizeMode, Video } from 'expo-av'
import { FC, useState } from 'react'
import { Image, ImageBackground, TouchableOpacity } from 'react-native'
import { zoomIn, zoomOut } from '@/constants/Animations'
import * as Animatable from 'react-native-animatable'
import Icons from '@/constants/Icons'
import { IPost } from '@/types/types'

interface TrendingItemProps {
  activeItem: IPost
  item: IPost
}

const TrendingItem: FC<TrendingItemProps> = ({ activeItem, item }: TrendingItemProps) => {
  const [play, setPlay] = useState(false)
  return (
    <Animatable.View className='mr-5' animation={activeItem.$id === item.$id ? zoomIn : zoomOut}>
      {play ? (
        <Video
          source={{ uri: item.video }}
          className='w-52 h-72 rounded-[35px] mt-3 bg-white/10'
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={status => {
            if ((status as AVPlaybackStatusSuccess).didJustFinish) setPlay(false)
          }}
        />
      ) : (
        <TouchableOpacity
          className='relative justify-center items-center'
          activeOpacity={0.7}
          onPress={() => setPlay(true)}>
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40'
            resizeMode='cover'
          />

          <Image source={Icons.play} className='w-12 h-12 absolute' resizeMode='contain' />
        </TouchableOpacity>
      )}
    </Animatable.View>
  )
}

export default TrendingItem
