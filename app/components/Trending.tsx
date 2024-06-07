import { FlatList, ViewToken } from 'react-native'
import { FC, useState } from 'react'
import TrendingItem from './TrendingItem'
import { IPost } from '@/types/types'

interface TrendingProps {
  posts: IPost[]
}

interface ViewableItemsChangedProps {
  viewableItems: ViewToken<IPost>[]
}

const Trending: FC<TrendingProps> = ({ posts }: TrendingProps) => {
  const [activeItem, setActiveItem] = useState(posts[1])

  const viewableItemsChanged = ({ viewableItems }: ViewableItemsChangedProps) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].item)
    }
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={item => item.$id}
      renderItem={({ item }) => <TrendingItem activeItem={activeItem} item={item} />}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170, y: 0 }}
      horizontal
    />
  )
}

export default Trending
