import { useLocation } from "react-router-dom";

import {SearchContact} from "./";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className='navbar navbar-expand-md navbar-light bg-light shadow-lg '>
      <div className='container-md'>
        <div className='row justify-content-between gy-3 align-items-center'>
          <div className='col-12 col-md-8'>
                  <img
                    src={require("../assets/img/logo2.png")}
                    className='img-fluid'
                    alt='logo'
                    style={{width:100, height:50, marginLeft:20, display:"inline-block"}}
                  />
                  <span className='' style={{ color: "#000" }}>
                    سامانه صدور آنلاین{" "}
                    <span
                      className=' '
                      style={{
                        marginRight: "",
                        color: "red",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}>
                      بیمه‌نامه
                    </span>
                  </span>
               
          </div>

          {location.pathname === "/contacts" ? (
              <div className='col-12 col-md-4'>
                <SearchContact />
              </div>
            ) : null
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
