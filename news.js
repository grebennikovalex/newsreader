import React, { memo } from 'react'
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import { styles, PRIMARY_COLOR } from './styles'
import { h, w } from './config'
import * as WebBrowser from 'expo-web-browser'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const News = ({ article }) => {
       
    return (
        <View style={styles.newsCell}>
            
            <Text style={styles.h2}>
                {article.source.name}
            </Text>
            <ImageBackground  source={{uri: article.urlToImage}} style={styles.newsImage}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => WebBrowser.openBrowserAsync(article.url)} style={styles.openNewsBtn}>
                        <FontAwesomeIcon icon={faArrowRight} size={24} color={PRIMARY_COLOR}/>
                    </TouchableOpacity>
                    <View style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: w*.02}}>
                        {article.author && article.author.length < 35 ? <Text style={styles.pWhite}>{article.author}</Text> : null}
                        <Text style={{color: '#ffff'}}>
                            { article.description.length > 100 ? article.description.substr(0, 100) + '...' : article.description }
                            </Text>
                    </View>
            </ImageBackground>
       </View>
    )
}

export default memo(News)
