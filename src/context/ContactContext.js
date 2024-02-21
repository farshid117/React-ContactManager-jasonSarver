import { createContext } from "react"

const ContactContext = createContext({
  loading: false,
  setLoading: () => { },

  contacts: [],
  setContacts: () => { },

  searchParams: {},

  // errors : [] ,
  //  setErrors : () => {} ,
  groups: [],

  createContact: () => { },
  deleteContact: () => { },
  updateContact: () => { },

  onChangeSearchInput: () => { },
  onSubmitSearch: () => { },
})
export default ContactContext;