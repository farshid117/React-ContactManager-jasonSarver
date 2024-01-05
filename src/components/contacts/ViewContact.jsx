import { useState, useEffect, useContext } from "react";

import { Link, useParams } from "react-router-dom";

import ContactContext from "../../context/ContactContext";

import { getContact, getGroup, } from "../../services/contactService";
import { Spinner } from "../";
import { CYAN, PURPLE, MYBLUE } from "../../helpers/color";

const ViewContact = () => {
  const { contactId } = useParams()
  const [state, setState] = useState({
    contact: {},
    group: {},

  })
  const { loading, setLoading } = useContext(ContactContext)

  useEffect(() => {
    try {
      const fetchData = async () => {

        setLoading(true)
        const { data: contactData } = await getContact(contactId)
        const { data: groupData } = await getGroup(contactData.group)

        setLoading(false)
        setState({
          ...state,
          contact: contactData,
          group: groupData,
        })

      }
      fetchData()
    } catch (err) {
      console.log(err.message);
      setLoading(false)
    }
  }, [])

  const { contact, group } = state;

  return (
    <>
      <section className="view-contact-intro my-2 pt-2">
        <div className="container">
          <div className="row  text-center">
            <p className="h3 fw-bold" style={{ color: CYAN }}>
              اطلاعات مخاطب
            </p>
          </div>
        </div>
      </section>

      <hr style={{ backgroundColor: CYAN }} />

      {loading ? (
        <Spinner />
      ) : (
        <>
          {Object.keys(contact).length > 0 && (

            <section className="view-contact">
              <div className="container p-2" style={{ borderRadius: "1rem", backgroundColor: MYBLUE, width:"95%" }}>
                <div className="row align-items-center justify-content-center mb-2">
                  <div className="col-md-4 text-center">
                    <img
                      src={contact.photo}
                      alt="person-img"
                      className="img-fluid rounded d-inline-block"
                      style={{ border: `3px solid ${PURPLE}` }}
                    />
                  </div>
                  <div className="col-md-6 offset-md-0">
                    <ul className="list-group my-2">
                      <li className="list-group-item list-group-item-dark">
                        نام و نام خانوادگی :{" "}
                        <span className="fw-bold">{contact.fullname}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        شماره موبایل :{" "}
                        <span className="fw-bold">{contact.mobile}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        ایمیل : <span className="fw-bold">{contact.email}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        شغل : <span className="fw-bold">{contact.job}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        گروه : <span className="fw-bold">{group.name}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row justify-content-center mb-3 mb-md-0">
                  <div className="col-8 col-md-6">
                    <Link
                      to={"/contacts"}
                      className="btn d-block"
                      style={{ backgroundColor: PURPLE }}
                    >
                      برگشت به صفحه اصلی
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default ViewContact;
