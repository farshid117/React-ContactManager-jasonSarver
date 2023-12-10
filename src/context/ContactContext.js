import {createContext} from "react"

const ContactContext = createContext({
    loading : false ,
    setLoading : () =>{} ,

    contacts : [] ,
    setContacts : () => {} ,
    
    searchParams:{},

   // errors : [] ,
  //  setErrors : () => {} ,
    groups : [] ,

    createContact: () => {},
    deleteContact: () => {},
    updateContact: () => {},

    onContactSearch: () => {},
    onSubmitSearch: () => {},
})
export default ContactContext ;