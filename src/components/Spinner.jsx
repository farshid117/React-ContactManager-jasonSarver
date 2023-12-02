import spinnerGift  from "../assets/Spinner.gif"

const Spinner = () => {
    return ( 
        <>
             <div className="d-flex align-items-center justify-content-center mt-5">
                <img src={spinnerGift} alt="loading...!" 
                     className=""
                     style={{width : 200}}
                />
            </div> 

           {/*  <div className="d-flex justify-content-center mt-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
            </div>*/}

        </>
     );
}
 
export default Spinner;