import { Tabs } from 'expo-router'
import Icons from '@/constants/Icons'
import TabIcon from '../components/TabIcon'

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#FFA001',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: 84,
            paddingTop: 14,
          },
        }}>
        <Tabs.Screen
          name='home'
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={Icons.home} color={color} name='Home' focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name='bookmark'
          options={{
            title: 'Bookmark',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={Icons.bookmark} color={color} name='Bookmark' focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name='create'
          options={{
            title: 'Create',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={Icons.plus} color={color} name='Create' focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name='profile'
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={Icons.profile} color={color} name='Profile' focused={focused} />
            ),
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout
