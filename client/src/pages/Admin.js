import React, { useEffect } from "react";


import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";

import { DeleteProfile,GetAllProfiles} from "../redux/actions/profileActions";
const Admin = () => {

  let profiles = useSelector((state) => state.profiles);
  
  const dispatch = useDispatch();

  const Navigate= useNavigate();

  const DeleteHandler = (id)=>{
    dispatch(DeleteProfile(id))
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {


    await dispatch(GetAllProfiles());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (

    <div className=" dark:bg-[#212533] dark:text-gray-400 p-2 mt-4">
   
    <div className=" justify-content-evenly mt-4">

      <div className=" md:ml-16 mt-14">
      <div> <button className="justify-end text-2xl" onClick={() => Navigate("/ajouter")  } >+</button> </div>
        <div className="d-flex">
          <i className="bi bi-person-fill  text-3xl "></i> <h2>Listes Profiles </h2>
        </div>
       
        <div className="md:flex -ml-10  "  >
      
{

profiles.profiles.map(({ _id, user, avatar, tel, cin, adress_actuel, matricule_voiture, type_voiture, poids } )=>(

    
      
      
        
   
      <div key={_id}  className="col-6 ml-20 md:ml-0  shadow-2xl   ">
      <div className="card m-4 flex ">
      <div className="card ">
        <div className="card-body text-center">
       

        <img className="h-20 w-20 bg-cover  rounded-full "src={ avatar} alt="dd"/>
            
          <button className="btn btn-outline-danger" onClick={()=>DeleteHandler(_id)}>Delete</button>

         
        </div>
      </div>
        <div className="card-body">
          
          <div className="row ">
            <div className="col-sm-4 ">
              <p className="mb-0">Full Name</p>
            </div>
            <div className="col-sm-8">
              <p className="text-muted mb-0 ">{user.fullname}</p>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-sm-4">
              <p className="mb-0">Email</p>
            </div>
            <div className="col-sm-8">
              <p className="text-muted mb-0">{user.email}</p>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-sm-4">
              <p className="mb-0">Phone</p>
            </div>
            <div className="col-sm-8">
              <p className="text-muted mb-0">{tel}</p>
            </div>
          </div>
          <hr/>
         
          <div className="row">
            <div className="col-sm-4">
              <p className="mb-0">cin</p>
            </div>
            <div className="col-sm-8">
              <p className="text-muted mb-0">{cin}</p>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-sm-4">
              <p className="mb-0">Address</p>
            </div>
            <div className="col-sm-8">
              <p className="text-muted mb-0">{adress_actuel}</p>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-sm-4">
              <p className="mb-0">Phone</p>
            </div>
            <div className="col-sm-8">
              <p className="text-muted mb-0">{matricule_voiture}</p>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-sm-4">
              <p className="mb-0">type_voiture</p>
            </div>
            <div className="col-sm-8">
              <p className="text-muted mb-0">{type_voiture}</p>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-sm-4">
              <p className="mb-0">poids</p>
            </div>
            <div className="col-sm-8">
              <p className="text-muted mb-0">{poids}</p>
            </div>
          </div>
          <hr/>
        </div>
        
        </div>
        </div>
     
      
      


       

     


))}


</div>

     
        </div>
    
</div>
    </div>
   
  )
   
}




export default Admin;
