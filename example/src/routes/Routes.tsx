import React from 'react'
import HomePage from './HomeScene/HomePage'
import SimplestPage from './SimplestScene/SimplestPage'
import DefinedSize from './DefinedSizeScene/DefinedSizePage'
import { Stack } from './RoutesType'
import COLORS from 'constants/COLORS'

const hideHeaderOption = { headerShown: false }

const headerOption = {
  headerStyle: {
    backgroundColor: COLORS.bg
  },
  headerTitleStyle: {
    color: COLORS.text
  },
  headerShadowVisible: true
}

const Routes = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomePage} options={hideHeaderOption} />
      <Stack.Screen name="Simplest" component={SimplestPage} options={headerOption} />
      <Stack.Screen name="Defined Size" component={DefinedSize} options={headerOption} />
    </Stack.Navigator>
  )
}

export default Routes
