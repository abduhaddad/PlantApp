import React from 'react'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'
import AppNavigator from './src/navigations/AppNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { LogBox } from 'react-native'

LogBox.ignoreAllLogs(true)
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  )
}
