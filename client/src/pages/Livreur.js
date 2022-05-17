import React, { useState } from 'react';
import axios from 'axios';
import Inputs from '../components/Inputs';
import { useSelector } from 'react-redux';

const Livreur = () => {
    const [AUth,setNewAuthor]=useState()
    const [form, setform] = useState(
        {
            _id: '', user: '', avatar: '', tel: '', cin: '', adress_actuel: '',
            matricule_voiture: '', type_voiture: '', poids: '',
         
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', form.photo);
        formData.append('birthdate', form.birthdate);
        formData.append('name', form.name);

        axios.post('http://localhost:5000/api/add', formData)
             .then(res => {
                console.log(res);
             })
             .catch(err => {
                console.log(err);
             });
    }
    const errors = useSelector(state => state.errors)
    const onChangeHandler = (e) => {
        setNewAuthor({...form, [e.target.name]: e.target.value});
    }

    const handlePhoto = (e) => {
        setNewAuthor({...form, photo: e.target.files[0]});
    }

    return (
        <form onSubmit={handleSubmit} className='mt-20' encType='multipart/form-data'>
            <input 
                type="file" 
                accept=".png, .jpg, .jpeg"
                name="avatar"
                onChange={handlePhoto}
            />

         
<Inputs name="tel" placeholder="Telephone" type="text" onChangeHandler={onChangeHandler} errors={errors.tel} value={form && form.tel ? form.tel : ""} />
              <Inputs name="cin" placeholder="cin" type="number" onChangeHandler={onChangeHandler} errors={errors.cin} value={form && form.cin ? form.cin : ""} />
              <Inputs name="adress_actuel" placeholder="adress_actuel" type="text" onChangeHandler={onChangeHandler} errors={errors.adress_actuel} value={form && form.adress_actuel ? form.adress_actuel : ""} />
              <Inputs name="matricule_voiture" placeholder="matricule_voiture" type="text" onChangeHandler={onChangeHandler} errors={errors.matricule_voiture} value={form && form.matricule_voiture ? form.matricule_voiture : ""} />
              <Inputs name="type_voiture" placeholder="type_voiture" type="text" onChangeHandler={onChangeHandler} errors={errors.type_voiture} value={form && form.type_voiture ? form.type_voiture : ""} />
              <Inputs name="poids" placeholder="poids" type="text" onChangeHandler={onChangeHandler} errors={errors.poids} value={form && form.poids ? form.poids : ""} />



            <input 
                type="submit"
            />
        </form>
    );
}

export default Livreur;