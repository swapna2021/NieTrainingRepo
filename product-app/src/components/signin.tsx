import {  useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Forgot from "./forgot"

function SignIn(){

    const [email,setEmail]=useState('') 
    const [password,setPassword]=useState('')
    const [role,setRole]=useState('user')
    const navigate=useNavigate();


    const handleSubmit=(e:React.FormEvent)=>{
        e.preventDefault();
        console.log(email);
        console.log(role)
        if(role==="admin" && email==='admin@gmail.com' && password==='admin'){
            alert("Login Success")
            navigate('/admindashboard')

        }else if(role==="user" && email==="swapna@gmail.com" && password==="swapna"){
            alert("Login Success")
            navigate('/userdashboard')
        }
        else{      
            alert("Login Failed")
        }

    }
    return(
        <div>

<div className="card" style={{width: "18rem;"}}>
  <div className="card-body">
    <h5 className="card-title">SignIn Form</h5>
    
<form onSubmit={handleSubmit}>
    
  <div className="form-group row">
    <label htmlFor="email" 
    className="col-sm-3 col-form-label">Email</label>
    <div className="col-sm-9">
      <input type="text"  
      className="form-control" 
      id="email" 
      name="email"
      onChange={(e)=>setEmail(e.target.value)}
      placeholder="email@email.com"/>
    </div>
  </div>
  <br></br>
  <br></br>
  <div className="form-group row">
    <label htmlFor="inputPassword" 
    className="col-sm-3 col-form-label">Password</label>
    <div className="col-sm-9">
      <input type="password" 
      className="form-control" 
      id="inputPassword" 
      onChange={(e)=>setPassword(e.target.value)}
      placeholder="Password"/>
    </div>
  </div>
  <br></br>
  <br></br>
  <div>

    <div className="form-group ">
    <label htmlFor="inputRole" >Role</label>
      &nbsp; &nbsp;&nbsp;
      <input type="radio" 
      className="form-check-input" 
      id="inputRole" 
      value="user"
      name="role"
      onChange={(e)=>setRole(e.target.value)}
     />
    <label>User</label>
      &nbsp; &nbsp;&nbsp;
      <input type="radio" 
      className="form-check-input" 
      id="inputRole" 
      value="admin"
      name="role"
      onChange={(e)=>setRole(e.target.value)}
     />
        <label className="form-check-label">Admin</label>
    </div>
 
  
  

    <br></br>
    <br></br>
    <button type="submit" className="btn btn-primary">SignIn</button>
  </div>
</form>

   <Link to="/forgot" >Forgot Password?</Link>
   
  </div>
</div>           
</div>
    )
}
export default SignIn