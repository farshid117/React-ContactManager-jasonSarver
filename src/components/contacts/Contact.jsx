import { Link } from "react-router-dom";

import { MYBLUE,ORANGE,CYAN,RED,BACKGROUND } from "../../helpers/color";

const Contact = ({contact,deleteContact}) => {
    return ( 
        
                <div className="col-11 col-sm-9 col-md-5 d-flex flex-column flex-lg-row  align-items-center justify-content-around rounded-3 p-4 g-4" style={{background:MYBLUE}} >
                
                    <div className="row col-12 col-lg-4  " >
                        <img src={contact.photo} alt="تصویر شخص" className="d-block img-fluid w-100 h-100 p-0" style={{border:`1px solid ${BACKGROUND}`}} />
                    </div>
                    
                    <div className="row col-12  col-lg-7  m-3">
                        <ul className="list-group list-group-flush rounded-3 p-0">
                            <li className="list-group-item list-group-item-action " style={{fontSize:13}}>نام و نام خانوادگی : <span className="fw-bold">{contact.fullname}</span></li>
                            <li className="list-group-item list-group-item-action " style={{fontSize:13}}>موبایل : <span className="fw-bold">{contact.mobile}</span></li>
                            <li className="list-group-item list-group-item-action " style={{fontSize:13}}>ایمیل : <span className="fw-bold">{contact.email}</span></li>
                        </ul>
                    
                    </div>

                    <div className="row col-12 col-lg-1  flex-lg-column  aligin-items-center justify-content-center"  >

                        <Link to={`/contacts/${contact.id}`} className="btn m-1 px-3 d-inline-flex align-items-center justify-content-center w-25 " style={{background:ORANGE}}><i className="fas fa-eye" style={{color:BACKGROUND, fontSize:20}}></i></Link>    
                        <Link to={`/contacts/edit/${contact.id}`} className="btn m-1 px-3 d-inline-flex align-items-center justify-content-center w-25 " style={{background:CYAN}}><i className="fas fa-pen" style={{color:BACKGROUND, fontSize:20}}></i></Link>    
                        <button onClick={deleteContact} className="btn m-1 px-3 d-inline-flex align-items-center justify-content-center w-25 " style={{background:RED}}><i className="fas fa-trash" style={{color:BACKGROUND, fontSize:20}}></i></button>    
                      
                    </div>

                     
                </div>
               
            

   
     );
}
 
export default Contact;