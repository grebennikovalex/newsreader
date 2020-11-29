import React from 'react'
import { View } from 'react-native'
import Tab from './tab'
import { styles } from './styles'

export default function TabBar ({ state, navigation }) {
           
    return (

        <View style={styles.tabBarContainer}>

        {state.routes.map((route, index) => {
            return (
                <Tab 
                    key = {index}
                    index = {index}
                    isActive = {state.index}
                    onPress={() => navigation.navigate(route.name)}
                />
                )
            })}
        </View>
    )
}

 