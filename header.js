import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { ListContext } from './context'
import { styles } from './styles'



const Header = ({ screen, number }) => {

    const { results } = useContext(ListContext)

    return (
        <View style={styles.header}>
                <Text style={styles.h1}>
                    {screen}
                </Text>
                {screen === 'Favorite Channels' &&
                <Text style={styles.h3}>
                    {`${results} articles`}
                </Text>}
                {/* <Text style={styles.h1}>
                    {number}
                </Text> */}
        </View>
    )
}

export default Header
