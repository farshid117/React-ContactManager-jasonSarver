import { Link } from "react-router-dom";

import { MYBLUE, ORANGE, CYAN, RED, BACKGROUND } from "../../helpers/color";

const Contact = ({ id, fullname, photo, mobile, email, deleteContact }) => {
    return (


        <div className="col-11 col-lg-5 rounded-3 p-3" style={{ background: MYBLUE }} >
            <div className="row justify-content-center align-items-center g-1">
                <div className="col-12 col-md-4 " >
                    <img src={photo} alt="تصویر شخص" className="img-fluid w-100" style={{ border: `2px solid ${BACKGROUND}` }} />
                </div>

                <div className="col-12 col-md-7 my-2 ">
                    <ul className="list-group list-group-flush rounded-3 ">
                        <li className="list-group-item list-group-item-action " style={{ fontSize: 13 }}>نام و نام خانوادگی : <span className="fw-bold">{fullname}</span></li>
                        <li className="list-group-item list-group-item-action " style={{ fontSize: 13 }}>موبایل : <span className="fw-bold">{mobile}</span></li>
                        <li className="list-group-item list-group-item-action " style={{ fontSize: 13 }}>ایمیل : <span className="fw-bold">{email}</span></li>
                    </ul>
                </div>

                <div className="col-12 col-md-1 d-flex justify-content-center justify-content-md-start flex-md-column"  >

                    <Link to={`/contacts/${id}`} className="btn m-1 px-3 d-inline-flex align-items-center justify-content-center w-25 " style={{ background: ORANGE }}><i className="fas fa-eye" style={{ color: BACKGROUND, fontSize: 20 }}></i></Link>
                    <Link to={`/contacts/edit/${id}`} className="btn m-1 px-3 d-inline-flex align-items-center justify-content-center w-25 " style={{ background: CYAN }}><i className="fas fa-pen" style={{ color: BACKGROUND, fontSize: 20 }}></i></Link>
                    <button onClick={() => deleteContact(id, fullname)} className="btn m-1 px-3 d-inline-flex align-items-center justify-content-center w-25 " style={{ background: RED }}><i className="fas fa-trash" style={{ color: BACKGROUND, fontSize: 20 }}></i></button>

                </div>

            </div>
        </div>

    );
}

export default Contact;