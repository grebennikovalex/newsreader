import React, { useContext } from 'react'
import { View, FlatList, ActivityIndicator } from 'react-native'
import { ListContext } from './context'
import { StatusBar } from 'expo-status-bar'
import Channel from './channel'
import Header from './header'
import { styles, PRIMARY_COLOR } from './styles'


const All = () => {

    const { list } = useContext(ListContext)
    const { setSelected } = useContext(ListContext)
  
    return(
        <View style={styles.container}>
            <StatusBar style='auto'/>
            <View style={styles.headerContainer}>
                <Header screen={'All Channels'} length={list.length} />
            </View>
           
            {list.length ?
            <FlatList 
                showsVerticalScrollIndicator={false}
                data={list}
                keyExtractor = {item => item.id}
                renderItem = {({item}) => (<Channel channel={item} changeUpState={item => setSelected(item.id)}/>)}
                />
            :
            <ActivityIndicator
                animating={true}
                size = 'small'
                color = {PRIMARY_COLOR}
                style = {styles.actIndi}/> }
            
        </View>
    )
}

export default All