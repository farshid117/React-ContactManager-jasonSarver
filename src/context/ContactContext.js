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

    deleteContact: () => {},
    updateContact: () => {},
    createContact: () => {},
    onContactSearch: () => {},
    onSubmitSearch: () => {},
})
export default ContactContext ;