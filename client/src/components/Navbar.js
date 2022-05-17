import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap'

import AOS from "aos";
import "aos/dist/aos.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../App.scss';
import { NavLink } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import ResetPassword from './ResetPassword';
import ForgetPassword from './forgetPassword';
import { useState } from 'react';
import { ThemeContext } from './themeContext';
import { useDispatch } from "react-redux";

import { Logout } from "../redux/actions/authActions";
import  Search   from  '../pages/Search'
import InterfaceLivreur from '../pages/InterfaceLivreur'
import NotFound from '../pages/NotFound'
import NoAccess from '../pages/NoAccess'

import Admin from '../pages/Admin';
import Home from '../pages/Home';
import AdminRouter from './AdminRouter';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForceRedirect from './ForceRedirect';
import PrivateRouterClient from './PrivateRouterClient';
import PrivateRouterLivreur from './PrivateRouterLivreur';
import MyProfile from '../pages/MyProfile';
import SendEamil from './SendEmail'
import Suivi from '../pages/Suivi';
import Ajouter from './Ajouter';







export default function Navbar({ user }) {

  
  AOS.init();
  const [darkMode, setDarkMode] = useState(ThemeContext);

  const dispatch = useDispatch()
  const LogoutHanlder = () => {
    dispatch(Logout())
  }


  return (
    <div className={darkMode}>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top -mt-2   capitalize">
        <div className="container-fluid dark:bg-[#212533] bg-[#fff]    md:-mb-4  p-1 ">
          <h1 className="navbar-brand" >Delivery</h1>

          <span className="navbar-toggler bg-warning " type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <i className="bi bi-three-dots-vertical "></i>
          </span>

          <div className="collapse navbar-collapse  translate-x-14 md:transform-none " id="navbar" >


            <ul className="navbar-nav me-auto  mb-2 mb-lg-0 dark:text-white  "  >

              <li className="nav-item  " >
                <NavLink exact="true" className="    nav-link md:hover:scale-125  " to="/">Home</NavLink>

              </li>




              {user.role === "ADMIN" ? (
                <li className="nav-item">
                  <NavLink className="nav-link active md:hover:scale-125" aria-current="page" to="/admin">
                    Admin
                  </NavLink>
                </li>
              ) : (
                ""
              )}
              {user.role === "LIVREUR" ? (
                <>
                 <li className="nav-item">
                  <NavLink className="nav-link active md:hover:scale-125" aria-current="page" to="/addprofile">
                    Profile
                  </NavLink>
                </li>
               
                <li className="nav-item">
                  <NavLink className="nav-link active md:hover:scale-125" aria-current="page" to="/myprofile">
                    Myprofile
                  </NavLink>
                </li>
               
                </>
               
              ) : (
                ""
              )}
              {user.role === "CLIENT" ? (
                <>
                <li className="nav-item">
                  <NavLink className=" md:hover:scale-125 nav-link active" aria-current="page" to="/interfaceclient">
                    interfaceClient
                  </NavLink>
                </li>
               
                </>
                
              ) : (
                ""
              )}
              {
                !user.isConnected ? (
                  <>


                    <li className="nav-item  " >
                      <NavLink exact="true" className=" md:hover:scale-125 nav-link   " to="/login">login</NavLink>
                    </li>
                    <li className="nav-item  " >
                      <NavLink exact="true" className=" md:hover:scale-125  nav-link   " to="/register">register</NavLink>
                    </li>

                  </>
                ) : (
                
                    <NavLink className="btn btn-primary ml-80  w-20" to="/" onClick={LogoutHanlder}>
                      Logout
                    </NavLink>
                 
                )
              }

            </ul>












            <div className='mr-20'>
              {darkMode === 'dark' ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setDarkMode(darkMode === 'dark' ? 'light' : 'dark')
                  }}
                  className="text-gray-500 dark:text-gray-400  shadow-none p-2 focus:outline-none text-lg rounded-full outline-none ring-transparent cursor-pointer"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    ></path>
                  </svg>
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setDarkMode(darkMode === 'dark' ? 'light' : 'dark')
                  }}
                  className="text-gray-500 dark:text-gray-400  focus:outline-none shadow-none p-2 text-lg rounded-full outline-none ring-transparent cursor-pointer"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    ></path>
                  </svg>
                </button>
              )}
            </div>


          </div>

        </div>
      </nav>


      <Routes >
        <Route path='/' exact element={<Home />} />
    
        <Route path='/login' exact element={<ForceRedirect user={user}>
          <Login  />
        </ForceRedirect>
        } />
        <Route path='/register' exact element={<ForceRedirect user={user}><Register /></ForceRedirect>} />

        <Route path='/interfaceClient' exact element={
          <PrivateRouterClient user={user}>
            <Search />
          </PrivateRouterClient>


        } />
         
       
       
        <Route path='*' exact element={<NotFound />} />
        <Route path='/noacc' exact element={<NoAccess />} />
        <Route path='/suivi' exact element={<Suivi />} />
        <Route path='/ajouter' exact element={<Ajouter/>} />

        <Route path='/addprofile' exact element={
          <PrivateRouterLivreur user={user}>
            <InterfaceLivreur />
          </PrivateRouterLivreur>
        } />
         
        
         <Route path='/myprofile' exact element={
          <PrivateRouterLivreur user={user}>
            <MyProfile />
          </PrivateRouterLivreur>
        } /> 
     
<Route path="/confirm/:confirmationCode" element={<SendEamil user={user}/>} />

<Route path="/forget" element={<ForgetPassword/>} exact />
<Route path="/reset/:token" element={<ResetPassword/>} exact />


        <Route path='/admin' exact element={
          <AdminRouter user={user}>
            <Admin />
          </AdminRouter>
        } />


      </Routes>



    </div>
  )
}


