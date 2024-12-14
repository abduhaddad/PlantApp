import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import SplashScreen from '../screens/SplashScreen'
import TabNavigator from './TabNavigator'
import Login from '../screens/auth/Login'
import Register from '../screens/auth/Register'
import Categories from '../screens/Categories'
import Plants from '../screens/plants/Plants'
import PlantDetail from '../screens/plants/PlantDetail'
import AUPlant from '../screens/plants/AUPlant'

export default function AppNavigator() {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name='SplashScreen' component={SplashScreen} />
      <Stack.Screen name='TabMenu' component={TabNavigator} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Register' component={Register} />
      <Stack.Screen name='Categories' component={Categories} />
      <Stack.Screen name='Plants' component={Plants} />
      <Stack.Screen name='PlantDetail' component={PlantDetail} />
      <Stack.Screen name='AUPlant' component={AUPlant} />
    </Stack.Navigator>
  )
}
