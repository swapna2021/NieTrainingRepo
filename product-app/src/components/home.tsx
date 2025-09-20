import { Link } from "react-router-dom"

function Home(){
    return(
        <div>
            <Link  to="/signin" type="button" className="btn btn-outline-primary">SignIn</Link>
            &nbsp; &nbsp;&nbsp;
            <Link to="/signup" type="button" className="btn btn-outline-success">SignUp</Link>
        </div>
    )
}
export default Home