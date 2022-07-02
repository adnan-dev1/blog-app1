import http from '../services/httpService';
import React, { useState } from 'react'
import Form from './common/Form';
import styles from './Register.module.css';
import Joi from 'joi-browser';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const apiUrl = process.env.REACT_APP_API_ENDPOINT + '/api';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const schema = Joi.object({
        username: Joi.string().min(5).max(10).lowercase().trim(true).required().label("Username"),
        email: Joi.string().email({ tlds: { allow: false } }).lowercase().trim(true).required().label("Email address"),
        password: Joi.string().min(8).trim(true).required().label("Password")
    });

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };


    const formData = [
        {
            labelName: 'Username',
            inputType: 'text',
            handler: handleUsername
        },
        {
            labelName: 'Email',
            inputType: 'email',
            handler: handleEmail
        },
        {
            labelName: 'Password',
            inputType: 'password',
            handler: handlePassword
        },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const { error } = schema.validate({
            username: username,
            email: email,
            password: password
        });

        if (error) {
            toast.error(error.details[0].message);
            setIsLoading(false);
            return;
        }

        const auth = {
            username: username,
            email: email,
            password: password
        };

        try {
            await http.post(apiUrl + '/auth/register', auth);
            sessionStorage.setItem('registered', 'You have been registered successfully');
            window.location.replace('/login');
        } catch (error) {

        }
        setIsLoading(false);

    };

    return (
        <div className={styles.registerContainer}>
            <span className={styles.registerTitle}>Register</span>
            <Form isLoading={isLoading} handleSubmit={handleSubmit} formData={formData} buttonName='Register' />
        </div>
    )
}

export default Register