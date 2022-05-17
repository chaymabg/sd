import axios from "axios";
import React, { useEffect, useState } from "react";


import { useDispatch, useSelector } from "react-redux";

import { GetProfile } from "../redux/actions/profileActions";

var id;

const MyProfile = () => {


  //const {fullname, password, confirm_password, err, success} = data
  let profile = useSelector((state) => state.profiles.profile);
  const { _id, user, avatar, tel, cin, adress_actuel, matricule_voiture, type_voiture, poids } = profile;
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {


    await dispatch(GetProfile());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const [code, setCode] = useState('')
  


   function active  ( ) {
    if (code === '') {
      console.log('il faut saisir un code ') ;
      
    } else { 
       id =  navigator.geolocation.watchPosition( function  (position ) {
        
        axios.post("/api/localisation",{
          loaded: true,
          crd: {
            lat: position.coords.latitude,
            long: position.coords.longitude,
          },
          code:code }
          )
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
        console.log("Latitude is :", position.coords.latitude)
        console.log("Longitude is :", position.coords.longitude)
        
      })
    
     
       
       
       
         
       
      }
  
    return (id)
 }
  function desactive() {
    return navigator.geolocation.clearWatch(id);
  }

  return (

    <div className=" dark:bg-[#212533] dark:text-gray-400 h-[150vh] p-2 mt-4">
      {Object.keys(profile).length === 0 ? (
        ""
      ) : (
        <div className=" justify-content-evenly mt-4">

          <div className=" md:ml-16 mt-14">
            <div className="d-flex">
              <i className="bi bi-person-fill  text-3xl "></i> <h2>My Profile </h2>
            </div>

            <div className=" shadow-2xl p-2 mb-5 ml-0 w-[110%] md:w-[80%]    rounded" style={{ backgroundColor: "white" }} >





              <div className="gird grid-cols-1 gap-y-20 md:grid md:grid-cols-2  ">



                <div className="col-lg-8 ml-5">
                  <div className="card mb-8">
                    <div className="card-body text-center">
                      <img className=" " src={avatar ? avatar : user.avatar} alt="" />

                      <h5 className="my-3">{user.fullname}</h5>
                      <p className="text-muted mb-1">{user.role}</p>
                      <p className="text-muted mb-4">{adress_actuel}</p>
                      <div className="d-flex justify-content-center mb-2">

                        <button type="button" className="btn btn-outline-primary ms-1">update</button>

                      </div>

                    </div>
                  </div>
                </div>
                <div className="col-lg-14 -ml-10 ">
                  <div className="card mb-4">
                    <div className="card-body">
                      <div className="row ">
                        <div className="col-sm-4 ">
                          <p className="mb-0">Full Name</p>
                        </div>
                        <div className="col-sm-8">
                          <p className="text-muted mb-0">{user.fullname}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-4">
                          <p className="mb-0">Email</p>
                        </div>
                        <div className="col-sm-8">
                          <p className="text-muted mb-0">{user.email}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-4">
                          <p className="mb-0">Phone</p>
                        </div>
                        <div className="col-sm-8">
                          <p className="text-muted mb-0">{tel}</p>
                        </div>
                      </div>
                      <hr />

                      <div className="row">
                        <div className="col-sm-4">
                          <p className="mb-0">cin</p>
                        </div>
                        <div className="col-sm-8">
                          <p className="text-muted mb-0">{cin}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-4">
                          <p className="mb-0">Address</p>
                        </div>
                        <div className="col-sm-8">
                          <p className="text-muted mb-0">{adress_actuel}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-4">
                          <p className="mb-0">Phone</p>
                        </div>
                        <div className="col-sm-8">
                          <p className="text-muted mb-0">{matricule_voiture}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-4">
                          <p className="mb-0">type_voiture</p>
                        </div>
                        <div className="col-sm-8">
                          <p className="text-muted mb-0">{type_voiture}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-4">
                          <p className="mb-0">poids</p>
                        </div>

                        <div className="col-sm-8">
                          <p className="text-muted mb-0">{poids}</p>
                          <hr />

                          <label> donneé un code de suivi </label> <hr />
                          <input type='text'
                            name="code"
                  
                            onChange={(e) => setCode(e.target.value)}
                            required
                          />
                          <hr />

                          <button type="button" className="button" onClick={active } > active Gps </button>
                          <button type="button" className="button" onClick={desactive}>déactive </button>
                        </div>



                      </div>

                      <hr />
                    </div>

                  </div>
                </div>



              </div>









            </div>


          </div>

        </div>
      )}



    </div>

  )

}




export default MyProfile;
