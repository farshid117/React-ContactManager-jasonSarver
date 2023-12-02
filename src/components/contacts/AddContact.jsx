import { useContext } from "react";
import { Link } from "react-router-dom";

import ContactContext from "../../context/ContactContext";
import  {Formik,Form,Field,ErrorMessage} from "formik"

import  Spinner  from "../Spinner";
import { COMMENT, GREEN, PURPLE } from "../../helpers/color";
import { contactSchema } from './../../validations/contactvalidation';


const AddContact = () => {
  const {loading, groups, createContact } = useContext(ContactContext)
 

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className='p-3'>
            <div className='container'>
              <div className='row'>
                <div className='col'>
                  <p
                    className='h4 fw-bold text-center'
                    style={{ color: GREEN }}>
                    ساخت مخاطب جدید
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: GREEN }} />
              <div className='row mt-5 position-relative'>
                <div className='col-md-6 col-lg-5 col-xl-4'>
                  <Formik
                    initialValues={{
                      fullname: "",
                      photo: "",
                      mobile: "",
                      email: "",
                      job: " ",
                      group: "",
                    }}
                    validationSchema={contactSchema}
                    onSubmit={(values) => {
                      createContact(values); //CreateContact writen in App.js that we gotten it from ContactContext.js
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
                      <div className='mb-2'>
                        <Field
                          name='group'
                          as='select'
                          className='form-select mb-3'>
                          <option selected>انتخاب گروه</option>

                          {groups.length > 0 &&
                            groups.map((group) => (
                              <option key={group.id} value={group.id}>
                                {group.name}
                              </option>
                            ))}
                        </Field>
                        <ErrorMessage
                          name='group'
                          component='div'
                          className='text-danger d-flex justify-content-start mt-1'
                          style={{ fontSize: 11 }}
                        />
                      </div>
                      <div className='mx-2'>
                        <input
                          type='submit'
                          className='btn'
                          style={{ backgroundColor: PURPLE }}
                          value='ساخت مخاطب'
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
                <div className='col-md-6 col-lg-5 col-xl-4'>
                  <img
                    src={require("../../assets/man-taking-note.png")}
                    height='400px'
                    style={{
                      position: "absolute",
                      zIndex: "-1",
                      top: "-40px",
                      left: 0,
                      opacity: "50%",
                    }}
                    alt='man-taking-note'
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

export default AddContact;
