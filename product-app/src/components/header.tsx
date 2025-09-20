import { Link } from "react-router-dom"

function Header() {
  return (
    <div className="row bg-primary fixed-top p-2 d-flex align-items-center">
      
     
      <div className="col-2 text-start">
        <Link to="/home" className="text-dark text-decoration-none d-flex align-items-center">
         
          <svg xmlns="http://www.w3.org/2000/svg" 
               width="28" 
               height="28" 
               fill="none" 
               stroke="currentColor" 
               strokeWidth="2" 
               strokeLinecap="round" 
               strokeLinejoin="round" 
               className="feather feather-home">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span className="ms-2 fw-bold">Home</span>
        </Link>
      </div>

     
      <div className="col text-center">
        <h1 className="m-0">Product Management Application</h1>
      </div>
    </div>
  )
}

export default Header