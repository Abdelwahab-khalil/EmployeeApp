// Reducer est une fonction qui modifie le state de l'application en fonction d'une action.

const initState = {
    data:[],
    loading:true
}

export const reducer = (state = initState,action)=>{
    if(action.type=="ADD_DATA"){
         return {
             ...state, // ...state  avec ES6 permet de créer une copie d'un objet.
             data:action.payload
         }
    }
    if(action.type=="SET_LOADING"){
        return {
            ...state,
            loading:action.payload
        }
    }
    
    return state
}


