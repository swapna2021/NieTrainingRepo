import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import Header from "./components/header";
import Home from "./components/home";
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import UserDashboard from "./components/userdashboard";
import Forgot from "./components/forgot";

import Admindashboard from "./components/admindashboard";
import AddProduct from "./components/addproduct";
import ListProducts from "./components/listproduct";
import EditProduct from "./components/editproduct";
import InfoProduct from "./components/infoproduct";

function App() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <Header />
        </div>

        <div className="row">
          <Routes>
           
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/userdashboard" element={<UserDashboard />} />
            <Route path="/forgot" element={<Forgot />} />

           
            <Route path="/admindashboard" element={<Admindashboard />}>
             <Route index element={<Navigate to="listproducts" replace />} />
              <Route path="listproducts" element={<ListProducts />} />
              <Route path="addproduct" element={<AddProduct />} />
              <Route path="edit/:id" element={<EditProduct />} />
              <Route path="info/:id" element={<InfoProduct />} />
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;