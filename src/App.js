import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useSearchParams,
} from "react-router-dom";

import _ from "lodash";
import { confirmAlert } from "react-confirm-alert";
import produce from "immer";
import { ToastContainer, toast } from "react-toastify";

import {
  Navbar,
  Contacts,
  AddContact,
  ViewContact,
  EditContact,
} from "./components";
import ContactContext from "./context/ContactContext";
import {
  getAllContacts,
  getAllGroups,
  createContact,
  deleteContact,
  getContact,
} from "./services/contactService";
import {
  CURRENTLINE,
  FOREGROUND,
  PURPLE,
  YELLOW,
  COMMENT,
} from "./helpers/color";

import "./App.css";

//todo: start App.js
const App = () => {
  //todo: Make States
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({});
  
  //✍️ preparing useNavigate()
  const navigate = useNavigate();
  //todo: Maunt LifeCycle Hook & Connect To Server to get Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups(); //distructure

        setContacts(contactsData);
        setGroups(groupsData);

        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  //todo: Make createContactForm Fucntion
  const createContactForm = async (values) => {
    /* event.preventDefault() */ //for yup in the Formik automatic be perventdefault
    try {
      /* await contactSchema.validate(contact , {abortEarly:false}) */ // for Yup

      setLoading((prevloading) => !prevloading);
      const { status, data } = await createContact(values); // valuse for formik
      if (status === 201) {
        //status for Create always is 201
        // use from immer
        setContacts(
          // change contacts state due to re-render
          produce((draft) => {
            draft.push(data);
          })
        );

        setLoading((prevloading) => !prevloading);
        navigate("/contacts"); //navigate change route without re-render

        toast.success("مخاطب جدید ایجاد گردید", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      console.log(err.message);
      /* console.log(err.inner)  // array of objects
            console.log(err.inner[0].path)
            console.log(err.inner[0].message)  */
      /* setErrors(err.inner) */

      setLoading(false);
    }
  };
  //todo: Make confirmDelete By react-confirm-alert package
  const reactConfirmAlert = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
              dir='rtl'
              style={{
                backgroundColor: CURRENTLINE,
                border: `1px solid ${PURPLE}`,
                borderRadius: "1em",
              }}
              className='p-4'
            >
                <h3 style={{ color: YELLOW }} className='text-center'>
                   پاک کردن مخاطب
                </h3>
                <p style={{ color: FOREGROUND }}>
                   مطمئنی میخواهی {`${contactFullname} `}را پاک کنی ؟
                </p>
                <button
                  onClick={() => {
                    removeContact(contactId);
                    onClose();
                  }}
                  className='btn me-2'
                  style={{ backgroundColor: PURPLE, color: "#fff" }}>
                  مطمئن هستم
                </button>
                <bottom
                  onClick={onClose}
                  className='btn'
                  style={{ backgroundColor: COMMENT, color: "#fff" }}>
                  انصراف
                </bottom>
          </div>
        );
      },
    });
  };

  //todo: Make removeContact Function that invoke by confirmDelete fucntion
  const removeContact = async (contactId) => {
    try {
      setLoading(true);
      const thisContact = await getContact(contactId);
      console.log("thisContact: ", thisContact);
      const response = await deleteContact(contactId);
      if (response) {
        const { data: contactsData } = await getAllContacts();
        setContacts(contactsData); //ّFor re-Rendering
        setLoading(false);

        toast.warn(`${thisContact.data.fullname} حذف گردید`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };
  //todo: Make handelEvent Function --> onContactSearch & debounce of lodash
  const onContactSearch = _.debounce((event) => {
    let filter = event.target.value;
    if (filter) {
      setSearchParams({ filter: filter });
    } else {
      setSearchParams({});
    }
  }, 1000);

  //todo: return JSX
  return (
    <ContactContext.Provider
      value={{
        loading: loading, //ES6
        setLoading,
        contacts,
        setContacts,
        groups,
        searchParams,
        //errors,
        //setErrors ,

        deleteContact: reactConfirmAlert,
        createContact: createContactForm,
        onContactSearch,
      }}>
      <div className='App'>
        <ToastContainer rtl={true} />
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate to='/contacts' />} /> {/*move to <contact /> without re-rendering  */}
          <Route path='/contacts' element={<Contacts />} />
          <Route path='/contacts/add' element={<AddContact />} />
          <Route path='/contacts/:contactId' element={<ViewContact />} />
          <Route path='/contacts/edit/:contactId' element={<EditContact />} />
        </Routes>
      </div>
    </ContactContext.Provider>
  );
};

export default App;
