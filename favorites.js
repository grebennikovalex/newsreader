import React, { useState, useContext, useEffect, useRef } from 'react'
import { View, FlatList, TouchableOpacity, Text } from 'react-native'
import { ListContext } from './context'
import { StatusBar } from 'expo-status-bar'
import { styles, LIGHT_PRIMARY_COLOR, BACK_COLOR } from './styles'
import { h, w, mock } from './config'
import Channel from './channel'
import News from './news'
import Dummies from './dummies'
import Header from './header'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons'
import { faCompressArrowsAlt } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { TextInput } from 'react-native-gesture-handler'



const Favorites = () => {

    const { favorites } = useContext(ListContext)
    const { articles } = useContext(ListContext)
    const { setSelected } = useContext(ListContext)
    const { page } = useContext(ListContext)
    const { setPage } = useContext(ListContext)
    const { query } = useContext(ListContext)
    const { setQuery } = useContext(ListContext)
    const { fetchNews } = useContext(ListContext)
    const { search } = useContext(ListContext)
    const { refreshing } = useContext(ListContext)
    const { setRefreshing } = useContext(ListContext)

    const flatListRef = useRef()
    const blockScrollOnMount = useRef(false)
    
    const [show, setShow] = useState(true)
            
    useEffect(() => setShow(true), [favorites])

    useEffect(() => {
        if(blockScrollOnMount.current){
            if(articles.length && page === 1) flatListRef.current.scrollToIndex({index: 0, animated: true })
        } else {
            blockScrollOnMount.current = true
        }
        
    }, [page])
   
    return(
        <View style={styles.container}>
            <StatusBar style='auto'/>
            <View style={styles.headerContainer}>
                <Header screen={'Favorite Channels'} length={favorites.length} number={page}/>
                <TouchableOpacity style={styles.btns}
                    onPress={() => setShow(show ? false : true)} 
                    disabled={!favorites.length ? true : false}
                    >
                    {show ?
                    <FontAwesomeIcon icon={faExpandArrowsAlt} size={24} color='#fff'/>
                        :
                    <FontAwesomeIcon icon={faCompressArrowsAlt} size={24} color='#fff'/>
                    }
                </TouchableOpacity>
            </View>
           

            {show ?

            <View style={styles.container}>

                
                       
            {favorites.length ?
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    data={favorites}
                    keyExtractor = {item => item.id}
                    renderItem = {({item}) => (<Channel channel={item} changeUpState={item => setSelected(item.id)}/>)}
                    />
                :
                <Text>{'Please, select some channels to display...'}</Text> }
            </View>
            :
            <View style={{flex: 1, alignItems: 'center'}}>

<               View style={styles.inputContainer}>
                    <TextInput
                      autoFocus={false} 
                      style={styles.input}
                      placeholderTextColor = '#a5b1c2'
                      placeholder = 'search for news...'
                      onChangeText={e => setQuery(e)}
                      value = {query}
                      />
                      <TouchableOpacity onPress={() => query ? search() : null} style={[styles.searchBtn, {paddingRight: w*.02}]}>
                            <FontAwesomeIcon icon={faSearch} size={24} color={LIGHT_PRIMARY_COLOR}/>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => {
                          setQuery('')
                          setPage(page => page=1)
                          page===1 && fetchNews()
                        }} style={[styles.searchBtn, {backgroundColor: BACK_COLOR }]}>
                            <FontAwesomeIcon icon={faTimes} size={24} color={LIGHT_PRIMARY_COLOR}/>
                      </TouchableOpacity>
                </View>
            
            {articles.length ?

                <View style={{paddingBottom: h*.1}}>
                    <FlatList 
                        getItemLayout={(data, index) => ({length: w*.72, offset:  w*.72 * index, index})}
                        initialNumToRender={2}
                        refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(query ? false : true)
                            setPage(page => query ? null : page=1)
                            page===1 && fetchNews()
                            }}
                        showsVerticalScrollIndicator={false}
                        data={articles}
                        keyExtractor={item => item.title}
                        renderItem = {({item}) => (<News article={item} />)}
                        ref={flatListRef}
                        ListFooterComponent={(
                        !query &&
                            <TouchableOpacity style={styles.footer} 
                                onPress={() => {
                                    setPage(page => query ? null : (parseInt(page) + 1))
                                    
                                    }}>
                                <Text style={[styles.h2, {color: '#b2bec3'}]}>{'show more...'}</Text>
                                <FontAwesomeIcon icon={faArrowRight} size={24} color={'#b2bec3'}/>
                            </TouchableOpacity> 
                            )}
                        />
                </View>
                :
                <View>
                    <FlatList 
                        getItemLayout={(data, index) => ({length: w*.72, offset:  w*.72 * index, index})}
                        initialNumToRender={2}
                        refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(query ? false : true)
                            setPage(page => query ? null : page=1)
                            page===1 && fetchNews()
                            }}
                        showsVerticalScrollIndicator={false}
                        data={mock}
                        renderItem = {({item}) => (<Dummies article={item} />)}
                    />
                </View>}
            </View>
            }

        </View>
    )
}

export default Favorites