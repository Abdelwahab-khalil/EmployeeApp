//importer les packages

import React,{useEffect} from 'react';
import { StyleSheet, Text, View,Image,FlatList,Alert} from 'react-native';

import {Card,FAB} from 'react-native-paper' 
/* 
Paper est une collection de composants personnalisables et prêts pour la production pour React Native
*/ 
import {useSelector,useDispatch} from 'react-redux'


const Home = ({navigation})=>{

    const dispatch  = useDispatch()  
    // est une méthode de Stor Redux utilisée pour mettre à jour l'état en passant un objet action
    const {data,loading} =  useSelector((state)=>{
        return state
    })

    console.log(data,loading)
   /*
    La methode fetch est utilise pour charger des ressources à partir d'une URL distante
   */
     const fetchData = ()=>{
        fetch("https://employee-inpt.herokuapp.com/")
        .then(res=>res.json())
        .then(results=>{
    
          dispatch({type:"ADD_DATA",payload:results})
          dispatch({type:"SET_LOADING",payload:false})

        }).catch(err=>{
            Alert.alert("Erreur")
        })
     }
    
     useEffect(()=>{
          fetchData()
     },[])
    
    const renderList = ((item)=>{
          return(
              
            <Card style={styles.mycard}
            /*
              Les cardes sont un moyen d'afficher des informations,
               contenant  du contenu et des actions sur un seul sujet.
                Les cartes peuvent contenir des images, des boutons
              */

              
            onPress={()=>navigation.navigate("Profile",{item})}
            // la methode navigation permis de navigue de la page home vers profil
            >
            <View style={styles.cardView}>
                
                 <Image
                style={{width:60,height:60,borderRadius:30}}
                source={{uri:item.picture}}
                
                />
                
                <View style={{marginLeft:10}}>
                    <Text style={styles.text}>{item.name}</Text>   
                     <Text style={styles.text}>{item.position}</Text>      
                </View>
           
            </View>
            
           </Card>
          )
    })
       
      
   
    /*
        React Native fournit le composant FlatList pour créer une liste. 
        FlatList ne rend que les éléments de la liste qui peuvent être affichés à l'écran
        Fab : Un bouton d'action flottant représente l'action principale dans une application.
    */
   return(
       <View style={{flex:1}}>    
       
        <FlatList
              data={data}
              renderItem={({item})=>{
                return renderList(item)
              }}
              keyExtractor={item=>item._id}
              onRefresh={()=>fetchData()}
              refreshing={loading}
              />
        

            <FAB  onPress={()=>navigation.navigate("Create")}
                    style={styles.fab}
                    small={false}
                    icon="plus"
                    theme={{colors:{accent:"#006aff"}}}
        
                />
          
       </View>
     
   ) 
}

const styles = StyleSheet.create({
    mycard:{
        margin:5,
       
    },
    cardView:{
         flexDirection:"row",
         padding:6
    },
    text:{
        fontSize:18,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      },
})

export default Home;