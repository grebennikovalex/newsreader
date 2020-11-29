import { StyleSheet } from 'react-native'
import { h, w } from './config'

export const PRIMARY_COLOR = '#34495e'
export const BACK_COLOR = '#ecf0f1'
export const LIGHT_PRIMARY_COLOR = '#b2bec3'

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: w*.01,
      marginTop: h*.03
    },

    channelCard: {
      flex: 1,
      width: w*0.95,
      borderWidth: 1,
      borderRadius: w*.02,
      borderColor: BACK_COLOR, 
      margin: w*.01,
      padding: w*.02
    },

    channelCardSelected: {
      flex: 1,
      width: w*0.95,
      borderWidth: 1,
      borderColor: BACK_COLOR, 
      backgroundColor: PRIMARY_COLOR,
      borderRadius: w*.02,
      margin: w*.01,
      padding: w*.02
    },    

    h1: {
      fontSize: w*.05,
      color: PRIMARY_COLOR,
      fontFamily: 'Rokkitt'
    },

    h1Selected: {
      fontSize: w*.05,
      color: '#fff',
      fontFamily: 'Rokkitt'
    },

    channelTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },

    tabBarContainer: {
      height: h / 12, 
      backgroundColor: '#EBEBEB',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    },

    newsCell: {
      flexDirection: 'column',
      width: w*0.96,
      height: w*.72,
      borderWidth: 1,
      borderRadius: w*.015,
      borderColor: BACK_COLOR, 
      margin: w*.01,
      padding: w*.02
      
    },

    h2: {
      fontSize: w*.044,
      color: PRIMARY_COLOR,
      fontFamily: 'Rokkitt'
    },

    h3: {
      fontSize: w*.035,
      color: PRIMARY_COLOR,
      fontFamily: 'Rokkitt'
    },

    p: {
      fontSize: w*.025,
      color: '#000'
    },

    openNewsBtn: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignSelf: 'flex-end',
      alignItems: 'center',
      paddingRight: w*.03,
      backgroundColor: '#fff',
      height: h*.06,
      width: h*.06,
      borderBottomLeftRadius: w*.05
    },

    header: {
      flex: 1,
      height: h*.06,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: w*.05,
      paddingRight: w*.02,
      backgroundColor: BACK_COLOR
    },


    newsImage: {
      justifyContent: 'space-between',
      width: w*.92,
      height: 260,
    },

    pWhite: {
      fontSize: w*.025,
      color: '#fff'
    },

    btns: {
      alignItems: 'center',
      justifyContent: 'center',
      height: h*.06,
      width: h*.06,
      backgroundColor: PRIMARY_COLOR,
      
    },

    actIndi: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: 200
    
    },

    headerContainer: {
      flexDirection: 'row',
      width: w,
      height: h*.06,
     
    },

    input: {
      flex: 1,
      fontSize: w*.05,
      height: h*.06,
      paddingHorizontal: w*.03,
      
    },

    inputContainer: {
      alignSelf: 'center',
      borderWidth: 1,
      borderColor: PRIMARY_COLOR,
      justifyContent: 'space-between',
      flexDirection: 'row',
      width: w*.92,
      marginVertical: h*.01,
      zIndex: 200,
      
      
    },

    searchBtn: {
      alignItems: 'center',
      justifyContent: 'center',
      height: h*.06,
      width: h*.06,
      
    },

    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: w*0.96,
      height: w*.1,
      borderWidth: 1,
      borderRadius: w*.015,
      borderColor: BACK_COLOR, 
      margin: w*.01,
      padding: w*.02,
      marginBottom: h*.6
    }
  })