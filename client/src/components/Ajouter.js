import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Registration } from '../redux/actions/authActions'

export default function Ajouter() {

    const [form, setForm] = useState({})
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const dispatch = useDispatch()
    const errors = useSelector(state => state.errors)

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value

        })

    }


    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(Registration(form, setMessage, setSuccessful))

    }



    return (
        <div>
            <div className="form_wrapper">
                <div className="form_container">

                    <h2>ajouter un livreur </h2>

                    <div className="row clearfix">
                        <div className="">
                            <form onSubmit={onSubmit.bind(this)} >
                                <div className="input_field">
                                    <input type="text" name="votre nom" placeholder="fullname" onChange={onChangeHandler} errors={errors.fullname} required />
                                </div>
                                <div className="input_field">
                                    <input type="email" name="email" placeholder="Email" onChange={onChangeHandler} errors={errors.fullname} required />
                                </div>
                                <div className="input_field">
                                    <input type="password" name="password" placeholder="Password" onChange={onChangeHandler} errors={errors.fullname} required />
                                </div>
                                <div className="input_field">
                                    <input type="password" name="password" placeholder="Re-type Password" onChange={onChangeHandler} errors={errors.fullname} required />
                                </div>

                                <div className="row clearfix">



                                </div>


                                <input className="button" type="submit" value="ajouter" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
