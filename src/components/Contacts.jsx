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
      <h3 className='px-3 text-center' style={{marginTop:100}}>سیستم مدیریت مخاطبین</h3>
      <h6 className="text-center">با قابلیت جستجو</h6>
      <section className='' id='contactsHeader'>
        <div className='container'>
          <div className='row'>
            <div className='col d-flex justify-content-center justify-content-lg-start mt-2 mt-lg-3'>
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
                    style={{ background: "red", color: "whitesmoke", display: "flex", alignItems:"center" }}
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
        <section id='persons ' className='p-3 w-100'>
          <div className='container'>
            <div className='row justify-content-evenly w-100 mx-0 '>
              {/* todo put{} becouse we want to return something */}
              {contacts
                .filter((contact) => {
                  let filter = searchParams.get("filter");
                  if (!filter) return true;
                  return contact.fullname
                    .toLowerCase()
                    .includes(filter.toLowerCase());
                })
                .map((contact, index) => (
                  <Contact
                    key={index}
                    contact={contact}
                    deleteContact={() =>
                      deleteContact(contact.id, contact.fullname)
                    }
                  />
                ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default Contacts;
