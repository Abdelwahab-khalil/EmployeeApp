// importer les packages

import React,{useState} from 'react';
import { StyleSheet, View,Modal,Alert,KeyboardAvoidingView} from 'react-native';
import {TextInput,Button} from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

// Creer un employee
const CreateEmployee = ({navigation,route})=>{
    
    const getDetails = (type)=>{
       if(route.params){
          switch(type){
              case "name":
                  return route.params.name
              case "phone":
                 return route.params.phone
              case "email":
                return route.params.email
              case "salary":
                  return route.params.salary  
              case "picture":
                  return  route.params.picture
              case "position":
                return  route.params.position  
              case "city":
                return  route.params.city 
          }
       }
       return ""
    }
    
    // avoir les donnees saisies 
    const [name,setName] = useState(getDetails("name"))
    const [phone,setPhone] = useState(getDetails("phone"))
    const [email,setEmail] = useState(getDetails("email"))
    const [salary,setSalary] = useState(getDetails("salary"))
    const [picture,setPicture] = useState(getDetails("picture"))
    const [position,setPosition] = useState(getDetails("position"))
    const [city,setCity] = useState(getDetails("city"))
    const [modal,setModal] = useState(false)
    const [enableshift,setenableShift] = useState(false)

    // envoyee les donnees vers le serveur
    const submitData = ()=>{
          fetch("https://employee-inpt.herokuapp.com/send-data",{
              method:"post",
              headers:{
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                
                  name,
                  email,
                  phone,
                  salary,
                  picture,
                  position,
                  city
              })
          })
          .then(res=>res.json())
          .then(data=>{
              Alert.alert(`L'employer ${data.name} est bien enregistrer Merci !`)
              navigation.navigate("Home")
          })
          .catch(err=>{
            Alert.alert("Erreur")
        })
    }

    // Modifier les donnes
    const updateDetails = ()=>{
        fetch("https://employee-inpt.herokuapp.com/update",{
            method:"post",
            headers:{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                id:route.params._id,
                name,
                email,
                phone,
                salary,
                picture,
                position,
                city
            })
        })
        .then(res=>res.json())
        .then(data=>{
            Alert.alert(`${data.name} est bien Modifier`)
            navigation.navigate("Home")
        })
        .catch(err=>{
          Alert.alert("Erreur")
      })
    }

    // acceder aux images dans le mobile 
   const pickFromGallery = async ()=>{
       // demander la permission pour acceder aux images
      const {granted} =  await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if(granted){
           let data =  await ImagePicker.launchImageLibraryAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect:[1,1],
                quality:0.5
            })
            if(!data.cancelled){
                let newfile = { 
                  uri:data.uri,
                  type:`test/${data.uri.split(".")[1]}`,
                  name:`test.${data.uri.split(".")[1]}` 
                  
              }
                handleUpload(newfile)
            }
      }else{
         Alert.alert("Vous n'avez pas donne la permission")
      }
   }

   // Acceder a la camera du mobile pour prendre une photo de profil
   const pickFromCamera = async ()=>{
       // demander la permission
      const {granted} =  await Permissions.askAsync(Permissions.CAMERA)
      if(granted){
           let data =  await ImagePicker.launchCameraAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect:[1,1],
                quality:0.5
            })
          if(!data.cancelled){
              let newfile = { 
                uri:data.uri,
                type:`test/${data.uri.split(".")[1]}`,
                name:`test.${data.uri.split(".")[1]}` 

            }
              handleUpload(newfile)
          }
      }else{
         Alert.alert("Vous n'avez pas donne la permission")
      }
   }

   // importer l'image et l'enregistrer dans le cloud "cloudinary.com"
   const handleUpload = (image)=>{
        const data = new FormData()
        data.append('file',image)
        data.append('upload_preset','employeeApp')
        data.append("cloud_name","aseds-inpt-2020")

        fetch("https://api.cloudinary.com/v1_1/aseds-inpt-2020/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json()).
        then(data=>{
            setPicture(data.url)
            setModal(false)
        }).catch(err=>{
            Alert.alert("Erreur")
        })
   }
   

    return(
        // Acceder au clavier pour remplir le formulaire
     <KeyboardAvoidingView behavior="position" style={styles.root} enabled={enableshift}>
        <View >
            <TextInput
                label='Nom et Prenom'
                style={styles.inputStyle}
                value={name}
                onFocus={()=>setenableShift(false)}
                theme={theme}
                mode="outlined"
                onChangeText={text => setName(text)}
            />
            <TextInput
                label='Email'
                style={styles.inputStyle}
                value={email}
                theme={theme}
                onFocus={()=>setenableShift(false)}
                mode="outlined"
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                label='Mobile'
                style={styles.inputStyle}
                value={phone}
                theme={theme}
                onFocus={()=>setenableShift(false)}
                keyboardType="number-pad"
                mode="outlined"
                onChangeText={text =>setPhone(text)}
            />
             
            <TextInput
                label='Salaire'
                style={styles.inputStyle}
                value={salary}
                theme={theme}
                onFocus={()=>setenableShift(true)}
                mode="outlined"
                onChangeText={text =>setSalary(text)}
            />
            <TextInput
                label='Poste'
                style={styles.inputStyle}
                value={position}
                theme={theme}
                onFocus={()=>setenableShift(true)}
                mode="outlined"
                onChangeText={text =>setPosition(text)}
            />
            <TextInput
                label='Ville'
                style={styles.inputStyle}
                value={city}
                theme={theme}
                onFocus={()=>setenableShift(true)}
                mode="outlined"
                onChangeText={text =>setCity(text)}
            />
             <Button 
             style={styles.inputStyle}
             icon={picture==""?"upload":"check"}
              mode="contained" 
              theme={theme}
              onPress={() => setModal(true)}>
                    Ajouter Image
             </Button>
             {route.params?
             <Button 
             style={styles.inputStyle}
             icon="content-save"
              mode="contained" 
              theme={theme}
              onPress={() => updateDetails()}>
                   Modifier details
             </Button>
             : 
             <Button 
             style={styles.inputStyle}
             icon="content-save"
              mode="contained" 
              theme={theme}
              onPress={() => submitData()}>
                   Enregistrer
             </Button>
             }
     
             
             <Modal // Le composant modal est un moyen de présenter du contenu au-dessus d'une vue englobante
             animationType="slide"
             transparent={true}
             visible={modal}
             onRequestClose={()=>{
                 setModal(false)
             }}
             >
              <View style={styles.modalView}>
                  <View style={styles.modalButtonView}>
                        <Button icon="camera"
                         theme={theme}
                        mode="contained"
                         onPress={() => pickFromCamera()}>
                                camera
                        </Button>
                        <Button 
                        icon="image-area"
                         mode="contained"
                         theme={theme}
                          onPress={() => pickFromGallery()}>
                                gallery
                        </Button>
                  </View>
                <Button 
                 theme={theme}
                onPress={() => setModal(false)}>
                        Annuler
                </Button>
              </View>
             </Modal>
         
      </View>
      </KeyboardAvoidingView>
     
 
    )
}

const theme = {
    colors:{
        primary:"#006aff"
    }
}
const styles=StyleSheet.create({
    root:{
       flex:1,
    },
    inputStyle:{
        margin:5
    },
    modalView:{
        position:"absolute",
        bottom:2,
        width:"100%",
        backgroundColor:"white"

    },
    modalButtonView:{
        flexDirection:"row",
        justifyContent:"space-around",
        padding:10
    }
})

export default CreateEmployee