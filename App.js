import React from 'react'
import { LogBox } from 'react-native'
import { AppLoading } from 'expo'
import { useFonts } from 'expo-font'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import ListContextProvider from './context'
import All from './all'
import Favorites from './favorites'
import TabBar from './tabbar'

LogBox.ignoreAllLogs()

const backTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff'
  },
}

const Tab = createBottomTabNavigator()

export default function App() {

  let [fontsLoaded] = useFonts({'Rokkitt': require('./assets/Rokkitt-Bold.ttf')})

  if(fontsLoaded) {
  return (
      <ListContextProvider>
        <NavigationContainer theme={backTheme}> 
        <Tab.Navigator 
              headerMode='screen'
              initialRouteName='Favorites'
              tabBarOptions={{ keyboardHidesTabBar: true }}
              tabBar={props => <TabBar {...props} />}> 
            <Tab.Screen name='All' component={All} />
            <Tab.Screen name='Favorites' component={Favorites} />
        </Tab.Navigator>
      </NavigationContainer>
      </ListContextProvider>
    )
  } else return <AppLoading />
 
}


