import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { styles } from './styles'
import { h, w } from './config'


const Channel = ({ channel, changeUpState }) => {
   
    return (
        <TouchableOpacity onPress={() => changeUpState(channel)} style={channel.selected ? styles.channelCardSelected : styles.channelCard}>
            <View style={styles.channelTextContainer}>
                <Text style={channel.selected ? styles.h1Selected : styles.h1}>{channel.name}</Text>
            </View>
            <Text style={{color: channel.selected ? '#fff' : '#000' }}>{channel.description}</Text>
        </TouchableOpacity>
    )
}

export default Channel
