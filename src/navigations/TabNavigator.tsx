import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/tabs/Home'
import Articles from '../screens/tabs/Articles'
import SavedPlants from '../screens/tabs/SavedPlants'
import Profile from '../screens/tabs/Profile'
import { StyleSheet, Text } from 'react-native'
import { FeIcon, myColors, myFonts } from '../utils'

export default function TabNavigator() {

  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarHideOnKeyboard: true,
      tabBarStyle: {
        height: 60
      },
      tabBarActiveTintColor: myColors.primary,
      tabBarLabel: ({ color }) => {
        var name = route.name
        var label = name == 'SavedPlants' ? 'Saved' : name
        return <Text style={[asdasd.label, { color: color }]}>{label}</Text>
      },
      tabBarIcon: ({ color, size }) => {
        var iconName = ''
        var name = route.name

        if (name == 'Home') {
          iconName = 'home'
        } else if (name == 'Articles') {
          iconName = 'book-open'
        } else if (name == 'SavedPlants') {
          iconName = 'bookmark'
        } else if (name == 'Profile') {
          iconName = 'user'
        }

        return <FeIcon name={iconName} size={size} color={color} />
      }
    })}>
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Articles' component={Articles} />
      <Tab.Screen name='SavedPlants' component={SavedPlants} />
      <Tab.Screen name='Profile' component={Profile} />
    </Tab.Navigator>
  )
}

const asdasd = StyleSheet.create({
  label: {
    fontFamily: myFonts.dmsans,
    fontSize: 12,
    marginTop : 2
  }
})