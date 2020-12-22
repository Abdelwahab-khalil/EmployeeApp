
// importation des packages 

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// importer les componenets
import Home  from './screens/Home'
import CreateEmployee from './screens/CreateEmployee'
import Profile from './screens/Profile';

// importer les methode de navigation 
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'

// importer les packages de redux
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {reducer} from './reducers/reducer'

// importer la methode Banner de AdMob
import {AdMobBanner} from 'expo-ads-admob'

// Creer le store redux
// Stor est un objet qui stocke l'état actuel d'une application Redux
const store  = createStore(reducer)

// Creer la methode de navigation Stack
const Stack = createStackNavigator();

// Header de l'application
const myOptions = {
  title:"Employees Au Maroc",
  headerTintColor:"white",
  headerStyle:{
    backgroundColor:"#006aff"
  }
}


// le body de l'application
function App() {
  return (
    // la vue principale de l'application
    // declarer les pages de l'application
    
    <View style={styles.container}>

      <Stack.Navigator>
        <Stack.Screen 
         name="Home" 
         component={Home}
         options={myOptions} />
        <Stack.Screen 
         name="Create"
         component={CreateEmployee}
         options={{...myOptions,title:"Create Employee"}} 
         />
        <Stack.Screen
         name="Profile"
         component={Profile}
         options={{...myOptions,title:"Profile"}} 
          />
     </Stack.Navigator>

     <AdMobBanner
          bannerSize="banner"
          adUnitID="ca-app-pub-1585971995856942/5197877825"
      />
  
    </View>

  );
}


export default ()=>{
  return (
    // rend le Stor Redux disponible pour tous les composants imbriqués 
    <Provider store={store}> 
    <NavigationContainer>
      
      <App />
    </NavigationContainer>
    </Provider>
  )
}


// creer les styles 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
});
