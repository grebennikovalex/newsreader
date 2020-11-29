import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { styles, LIGHT_PRIMARY_COLOR, BACK_COLOR } from './styles'
import { h, w } from './config'


const Dummies = ({ article }) => {
       
    return (
        <View style={styles.newsCell}>
            
            <Text style={styles.h2}>
                {article.source.name}
            </Text>
            <View  style={[styles.newsImage, {backgroundColor: BACK_COLOR, borderRadius: w*.02}]}>
            <ActivityIndicator
                animating={true}
                size='small'
                color={LIGHT_PRIMARY_COLOR}
                style={styles.actIndi}/>
                    <View style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: w*.02,  borderRadius: w*.02}}>
                        <Text style={styles.pWhite}>{'Author'}</Text>
                        <Text style={{color: '#ffff'}}>{'Article...' + article.description}</Text>
                    </View>
            </View>
       </View>
    )
}

export default Dummies
