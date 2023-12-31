import { useEffect, useState, useContext } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {toast} from 'react-toastify'
import produce from "immer";

import ContactContext from "../../context/ContactContext";
import { contactSchema } from "../../validations/contactvalidation";
import { getContact, updateContact } from "../../services/contactService";
import { Spinner } from "../";
import { COMMENT, ORANGE, PURPLE, MYBLUE, CYAN } from "../../helpers/color";

const EditContact = () => {
  const { contactId } = useParams();
  const { setContacts, loading, setLoading, groups } = useContext(ContactContext);

  const navigate = useNavigate();

  const [contact, setContact] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactData } = await getContact(contactId);
        console.log("contactData: ", contactData);

        setLoading(false);
        setContact(contactData);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const submitForm = async (values) => {
    // event.preventDefault();  //💑 👄 ⭐️ ☕️   Formik has preventDefault into itselfs
    try {
      setLoading(true);
      const { data, status } = await updateContact(values, contactId); 
      //✍️ json-srver was updated & data is contact that was returned with _id by json-server

      if (status === 200) {
        setLoading(false);
        
        //✍️ for re-rendering because navigate dose'nt re-rndering
        /* const allContacts = [...contacts]; //todo: Shallow Copy
        const contactIndex = allContacts.findIndex((contact) => contact.id === parseInt(contactId) )
        console.log("contactIndex: ", contactIndex)
        allContacts[contactIndex] = { ...data } // or data because is object

        setContacts(allContacts);  //✍️ re-rendering and updating DOM */

      //todo: Direct change of contacts state with immer
        setContacts(
          produce(draft => {
            const contactIndex = draft.findIndex(contact => contact.id === parseInt(contactId))
            draft[contactIndex] = {...data}
          })
        )

        navigate("/contacts"); //todo:✍️ does not re-rendering
         toast.success(`${contact.fullname} ویرایش گردید`, {
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
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className='mt-3'>
            <div className='container'>
              <div className='row justify-content-center my-2'>
                <div className='col-12 text-center'>
                  <p className='h4 fw-bold' style={{ color: CYAN }}>
                    ویرایش مخاطب
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: ORANGE }} />
              <div
                className='row p-3 p-md-5 align-items-center justify-content-center'
                style={{ backgroundColor: MYBLUE, borderRadius: "1em" }}>
                <div className='col-12 col-md-6'>
                  <Formik
                    initialValues={contact}
                    validationSchema={contactSchema}
                    onSubmit={(values) => {
                      submitForm(values);
                    }}>
                    <Form>
                      <div className='mb-2'>
                        <Field
                          name='fullname'
                          type='text'
                          className='form-control'
                          placeholder='نام و نام خانوادگی'
                        />
                        <ErrorMessage name='fullname'>
                          {(msg) => (
                            <div
                              className='text-danger d-flex justify-content-start mt-1'
                              style={{ fontSize: 11 }}>
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className='mb-2'>
                        <Field
                          name='photo'
                          type='text'
                          className='form-control'
                          placeholder='آدرس تصویر'
                        />
                        <ErrorMessage name='photo'>
                          {(msg) => (
                            <div
                              className='text-danger d-flex justify-content-start mt-1'
                              style={{ fontSize: 11 }}>
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className='mb-2'>
                        <Field
                          name='mobile'
                          type='number'
                          className='form-control'
                          placeholder='شماره موبایل'
                        />
                        <ErrorMessage name='mobile'>
                          {(msg) => (
                            <div
                              className='text-danger d-flex justify-content-start mt-1'
                              style={{ fontSize: 11 }}>
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className='mb-2'>
                        <Field
                          name='email'
                          type='email'
                          className='form-control'
                          placeholder='آدرس ایمیل'
                        />
                        <ErrorMessage name='email'>
                          {(msg) => (
                            <div
                              className='text-danger d-flex justify-content-start mt-1'
                              style={{ fontSize: 11 }}>
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className='mb-2'>
                        <Field
                          name='job'
                          type='text'
                          className='form-control'
                          placeholder='شغل'
                        />
                        <ErrorMessage name='job'>
                          {(msg) => (
                            <div
                              className='text-danger d-flex justify-content-start mt-1'
                              style={{ fontSize: 11 }}>
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className='mb-4'>
                        <Field name='group' as='select' className='form-select'>
                          <option value=''>انتخاب گروه</option>
                          {groups.length > 0 &&
                            groups.map((group) => (
                              <option key={group.id} value={group.id}>
                                {group.name}
                              </option>
                            ))}
                        </Field>
                        <ErrorMessage name='group'>
                          {(msg) => (
                            <div
                              className='text-danger d-flex justify-content-start mt-1'
                              style={{ fontSize: 11 }}>
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className='mb-2 text-center'>
                        <input
                          type='submit'
                          className='btn'
                          style={{ backgroundColor: PURPLE }}
                          value='ویرایش مخاطب'
                        />
                        <Link
                          to={"/contacts"}
                          className='btn mx-2'
                          style={{ backgroundColor: COMMENT }}>
                          انصراف
                        </Link>
                      </div>
                    </Form>
                  </Formik>
                </div>
                <div className='col-8 col-md-4 offset-md-2'>
                  <img
                    src={contact.photo}
                    className='img-fluid rounded'
                    style={{ border: `1px solid ${PURPLE}` }}
                    alt='contact'
                    width={200}
                  />
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default EditContact;
