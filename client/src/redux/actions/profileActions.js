import axios from 'axios'
import { ERRORS, SET_PROFILE, SET_PROFILES, DELETE_PROFILE } from '../types';

export const AddProfile = (formData,setShow,setMessage,config)=>dispatch=>{
    axios
      .post("/api/add", formData,config)
      .then(res => {
        setShow(true)
        setMessage("Profile added with success")
     
        dispatch({
            type: ERRORS,
            payload: {}
        })
       // setTimeout(() => {
       //     setShow(false)
       // }, 4000);
      })
      .catch(err => {
          dispatch({
              type: ERRORS,
              payload: err.response.data
          })
      });
}//// headers: {   "Content-type": "application/json"}
///One Profile
export const GetProfile = ()=>dispatch=>{
    axios
      .get("/api/profile")
      .then(res => {
          dispatch({
              type: SET_PROFILE,
              payload: res.data
          })
      })
      .catch(err => {
          dispatch({
              type: ERRORS,
              payload: err.response.data
          })
      });
}
///all Profiles
export const GetAllProfiles = ()=>dispatch=>{
    axios
      .get("/api/allprofiles")
      .then(res => {
          dispatch({
              type: SET_PROFILES,
              payload: res.data
          })
      })
      .catch(err => {
          dispatch({
              type: ERRORS,
              payload: err.response.data
          })
      });
}

export const DeleteProfile = (id)=>dispatch=>{
   if(window.confirm("are you sure to delete this user?")){
    axios
    .delete(`/api/profiles/${id}`)
    .then(res => {
        dispatch({
            type: DELETE_PROFILE,
            payload: id
        })
    })
    .catch(err => {
        dispatch({
            type: ERRORS,
            payload: err.response.data
        })
    });
   }
}