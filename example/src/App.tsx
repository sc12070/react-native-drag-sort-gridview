import React from 'react'
import { LogBox } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Routes from './routes/Routes'

LogBox.ignoreLogs(['Warning: ...'])
LogBox.ignoreAllLogs()

const App = () => {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  )
}

export default App
