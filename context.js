import React, { useState, useEffect, createContext, useRef } from 'react'
import { API_KEY } from './config'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const ListContext = createContext()

const ListContextProvider = props => {

let pageSize = 20 

const [list, setList] = useState([])
const [favorites, setFavorites] = useState([])
const [articles, setArticles] = useState([])
const [page, setPage] = useState(0)
const [query, setQuery] = useState('')
const [results, setResults] = useState(0)
const [refreshing, setRefreshing] = useState(false)
const blockWriteOnMount = useRef(false)
const blockFetchOnMount = useRef(false)


useEffect(() => {

    console.log('Mounted... initial fetch')

    let copyList =[]

    fetch(`https://newsapi.org/v2/sources?language=en`, {

        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'X-Api-Key' : `${API_KEY}`
        }
    })
    .then(response => {
        return response.json()
    })
    .then(data => {
        if(data.status === 'error') {
            if(data.code === 'rateLimited') alert(data.message)
            else alert(data.code)
        } else {
            copyList = data.sources
            setList(copyList)
        }
    })
    .then(() => {
        readSources()
        .then(savedSources => {

            let sourcesArr = savedSources.split(',')
            sourcesArr.splice(sourcesArr.length-1, 1)
            console.log('Get from storage: ', sourcesArr)
            let fav = []
            sourcesArr.map(id => {
                fav.push(copyList.find(source => source.id === id))
                copyList.map(source => source.id === id ? source.selected = true : false)
            })
            setList(copyList)
            fav.map(source => source.selected = true)
            setFavorites(fav)
           
        })
        .then(() => setPage(page => page=1))
        .catch(() => console.log('Get from storage (error): nothing in there...'))
    })

},[])


useEffect(() => {
    if(blockFetchOnMount.current){
        fetchNews()
    } else {
        blockFetchOnMount.current = true
    }

},[page, favorites])

useEffect(() => {
    if(blockWriteOnMount.current){
        setArticles(() => articles.length = 0)
        writeSources()
        setQuery('')
        setPage(page => page=1)
    } else {
        blockWriteOnMount.current = true
    }

},[favorites])


const writeSources = async () => {

    let sources = ''
    favorites.map(item => sources = sources + item.id + ',')

    try {
        await AsyncStorage.setItem('newsSources', sources)
        console.log('Done write: ', sources)
    } catch(e) {
        alert(e)
    }
}

const readSources = async () => {
    try {
        return await AsyncStorage.getItem('newsSources')
    } catch(e) {
        alert(e)
    }
}


const search = () => {
    setArticles(() => articles.length = 0)
    fetchNews() 
}

const fetchNews = () => {

    console.log('fetchNews fired, favorites length: ', favorites.length)
   
    let sources = ''
    favorites.map(item => sources = sources + item.id + ',')
   
    if (favorites.length) {

                let fetchUrl = `https://newsapi.org/v2/everything?language=en&q=${query.replace(/ /g, ' AND ')}&sources=${sources}&pageSize=${pageSize}`

                fetch(fetchUrl + (query ? '' : ('&page=' + page)), {

                    method: 'GET',
                    headers:{
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                        'X-Api-Key' : `${API_KEY}`
                    }
                })
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    if(data.status === 'error') {
                        if(data.code === 'maximumResultsReached') {
                            setPage(page => page=1)
                            console.log(data.code)
                        } else {
                            console.log(data.code)
                        }
                    } else {
                        setRefreshing(false)
                        if(data.totalResults) {
                            setResults(data.totalResults)
                            if(articles.length && page > 1) {
                                setArticles(() => articles.concat(data.articles))
                            } else {
                                setArticles(data.articles)
                            }
                        } else {
                            setQuery('')
                            setPage(page => page=1)
                        }
                    }
                })
            } else {
                setArticles(() => articles.length = 0)
            }
}

const setSelected = id => {

    console.log('Select fired: ', id)

    setList(list => {
        return list.map(source => { 
            if(source.id === id) {
                source.selected = source.selected ? false : true 
            } 
            return source
        })
    })

    setFavorites(list.filter(source => source.selected))
    setPage(page => page=1)
}

return (
    <ListContext.Provider 
        value={{

            list, 
            favorites,
            articles,
            page,
            query,
            results,
            refreshing,
            setRefreshing,
            search,
            setQuery,
            setPage,
            setSelected,
            writeSources,
            fetchNews
                   
        }}>
        {props.children}
    </ListContext.Provider>
 )
}

export default ListContextProvider