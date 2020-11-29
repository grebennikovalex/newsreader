import React, { useContext } from 'react'
import { TouchableOpacity, View, Text, Platform } from 'react-native'
import { ListContext } from './context'
import { w, h } from './config'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as heart } from '@fortawesome/free-regular-svg-icons'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { PRIMARY_COLOR, LIGHT_PRIMARY_COLOR as inactiveIcon } from './styles'


let screens =
        [{icon: faNewspaper, name: 'All Channels', color: '#fff', iconColor: PRIMARY_COLOR, ears: true},
        {icon: faHeart, name: 'Favorite Channels', color: 'transparent', iconColor: inactiveIcon, ears: false}]  

export default function TabBar ({ onPress, index, isActive }) {

  const { favorites } = useContext(ListContext)
       
  screens.map(screen => {
        screen.color = 'transparent'
        screen.iconColor = inactiveIcon
        screen.ears = false
            
            })
    
        
            screens[isActive].iconColor = PRIMARY_COLOR
            screens[isActive].color = '#fff'
            screens[isActive].ears = true
      
    
    return ( 
      
        <TouchableOpacity 
          onPress = {onPress}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: h / 12, 
            width: w / 2, 
            backgroundColor: screens[index].color,
            paddingTop: 7,
            
            }}
        >
          {screens[index].ears ?
            <View style = {{
                position: 'absolute',
                left: -20,
                top: 0, 
                width: 20, 
                height: 20, 
                backgroundColor: screens[index].color
                }}></View> : null }

          {screens[index].ears ?
            <View style = {{
                position: 'absolute',
                left: -20,
                top: 0, 
                width: 20, 
                height: 20, 
                borderTopRightRadius: 20, 
                backgroundColor: '#EBEBEB'
                }}></View> : null }

          {screens[index].ears ?
            <View style = {{
                position: 'absolute',
                right: -20,
                top: 0, 
                width: 20, 
                height: 20, 
                backgroundColor: screens[index].color
                }}></View> : null }

          {screens[index].ears ?
            <View style = {{
                position: 'absolute',
                right: -20,
                top: 0, 
                width: 20, 
                height: 20, 
                borderTopLeftRadius: 20, 
                backgroundColor: '#EBEBEB'
               
                }}></View> : null }
          
           
            <View style={{flexDirection: 'row'}}>
              {index === 1 ?
              favorites.map(fav => (
                <View style={{width: w*.02, flexDirection: 'row'}}>
                  <View style={{width: w*.02}}>
                  <FontAwesomeIcon icon={screens[index].icon} transform='shrink-1' color={screens[index].iconColor} size={w*.05}/>
                  </View>
                  <View style={{width: w*.02, right: w*.02}}>
                  <FontAwesomeIcon icon={heart} color='#fff' size={w*.05}/>
                  </View>
                </View>
                
              ))
              :
              <FontAwesomeIcon icon={screens[index].icon} color={screens[index].iconColor} size={w*.05}/>
              }  
            </View>
            <Text style = {{
              color: screens[index].iconColor,
              fontSize: w * .025,
              fontWeight: 'bold',
              paddingTop: 5
            }}>
              {screens[index].name}
            </Text>
       
        </TouchableOpacity>
      
    )
  }

  