import React, { useState } from 'react';
import axios from 'axios';

const P = () => {
    const [newUser, setNewUser] = useState(
        {
          
            birthdate: '',
            photo: '',
        }
    );
const [AUTH ,setNewAuthor]= useState()
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', newUser.photo);
        formData.append('birthdate', newUser.birthdate);
       
        axios.post('http://localhost:5000/api/up', formData)
             .then(res => {
                console.log(res);
             })
             .catch(err => {
                console.log(err);
             });
    }

    const handleChange = (e) => {
        setNewAuthor({...newUser, [e.target.name]: e.target.value});
    }

    const handlePhoto = (e) => {
        setNewAuthor({...newUser, photo: e.target.files[0]});
    }

    return (
        <form onSubmit={handleSubmit} className="mt-14" encType='multipart/form-data'>
            <input 
                type="file" 
                accept=".png, .jpg, .jpeg"
                name="photo"
                onChange={handlePhoto}
            />


            <input 
                type="date"
                name="birthdate"
                value={newUser.date}
                onChange={handleChange}
            />

            <input 
                type="submit"
            />
        </form>
    );
}

export default P;