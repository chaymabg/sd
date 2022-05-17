/* eslint-disable array-callback-return */

import React, { useEffect, useState } from "react";


import { useDispatch, useSelector } from "react-redux";
import Inputs from "../components/Inputs";

import { GetAllProfiles } from "../redux/actions/profileActions";
const Search = () => {

    
  const [filter,setFilter] = useState('')


    let profiles = useSelector((state) => state.profiles);

    const dispatch = useDispatch();
const search=(e)=>{
    setFilter(e.target.value)

}
console.log(filter)
let dataSearch = profiles.profiles.filter((item)=>{
return Object.keys(item).some(key=>
    item[key].toString().toLowerCase().includes(filter.toString().toLocaleLowerCase()))
})

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {


        await dispatch(GetAllProfiles());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (

        <div className=" dark:bg-[#212533] dark:text-gray-400 p-2 mt-4">

            <div className=" justify-content-evenly md:ml-16 mt-4">


                <div className=" md:flex m-7">
                   <div className="flex">
                   <i className="bi bi-person-fill  text-3xl "></i> 
                    <h2>Listes Livreur </h2></div> 
                    <div className=" md:ml-[40%] ">
                    <Inputs type="text"placeholder="Search" name="searchTerm" value={filter}  onChangeHandler={search.bind(this)}/>
                    </div>
                   

                </div>

                <div className="grid grid-cols-2  md:grid md:grid-cols-3 "  >

                    {

                        dataSearch.map(({ _id, user, avatar,  adress_actuel, type_voiture }) => (







                            <div key={_id} className="card m-2 p-1   row shadow-2xl ">

                                
<div className="rounded overflow-hidden shadow-lg">
      <img className=" w-[30%]" src={avatar} alt="Forest"/>
      <div className="">
        <div className="font-bold text-xl mb-2">{user.fullname}   </div>
      
      </div>
      <div className="">
        <span className="inline-block bg-gray-200 rounded-full px-2  text-sm font-semibold text-gray-700 mr-2 mb-2">adress_actuel :{adress_actuel}</span>
        <span className="inline-block bg-gray-200 rounded-full px-2  text-sm font-semibold text-gray-700 mr-2 mb-2">type_voiture :{type_voiture}</span>
        <span className=" btn inline-block bg-gray-200 rounded-full px-2  text-sm font-semibold text-gray-700 mr-2 mb-2" >more informations </span>
      </div>
    </div>
  </div>

                          












                        ))}


                </div>


            </div>

        </div>


    )

}




export default Search;
