import { useContext } from "react";
import { Link } from "react-router-dom";

//NOTE import  from "./contacts/Contact";
import { Spinner, Contact } from "./";
import ContactContext from "./../context/ContactContext";

import "./Contacts.css"

const Contacts = () => {
  const { contacts, loading, deleteContact, searchParams } = useContext(ContactContext);

  return (
    <>
      <h3 className='text-center' style={{ marginTop: 100 }}>سیستم مدیریت مخاطبین</h3>
      <h6 className="text-center text-danger mt-3">با قابلیت جستجو😎</h6>
      <section id='contactsHeader'>
        <div className='container'>
          <div className='row'>
            <div className='col-12 d-flex justify-content-center justify-content-lg-start mt-2 mt-lg-3'>
              <p className='h3'>
                {loading ? (
                  <button
                    type='button'
                    className='btn rounded-1 d-flex'
                    style={{ background: "red", color: "whitesmoke" }}
                    disabled>
                    در حال بارگیری
                    <span
                      className='spinner-border spinner-border ms-3'
                      role='status'
                    />
                  </button>
                ) : (
                  <Link
                    to='/contacts/add'
                    className='btn rounded-2'
                    style={{ background: "red", color: "whitesmoke", display: "flex", alignItems: "center" }}
                  >
                    ساخت شخص جدید
                    <span
                      className='fas fa-plus-circle  mx-2'
                      style={{ color: "white", fontSize: 20 }}
                    />
                  </Link>
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Spinner />
      ) : (
        <section id='persons' className='w-100 mt-3'>
          <div className='container'>
            <div className="row justify-content-evenly g-3">
              {/* todo put{} becouse we want to return some js */}
              {
                contacts
                  .filter((contact) => {
                    let filter = searchParams.get("filter");
                    if (!filter) return true;
                    return contact.fullname
                      .toLowerCase()
                      .includes(filter.toLowerCase()); //return array
                  })
                  .map((contact) => (
                    <Contact
                      key={contact.id}
                      {...contact}
                      deleteContact={deleteContact}
                    />
                  ))
              }
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default Contacts;
