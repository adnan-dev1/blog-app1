import http from '../services/httpService';
import React, { useState } from 'react'
import Form from './common/Form';
import styles from './Login.module.css';
import Joi from 'joi-browser';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { showToast } from '../services/showToastNotify';

const apiUrl = process.env.REACT_APP_API_ENDPOINT + '/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).lowercase().trim(true).required().label("Email address"),
        password: Joi.string().min(8).trim(true).required().label("Password")
    });

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const formData = [
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
            email: email,
            password: password
        });

        if (error) {
            toast.error(error.details[0].message);
            setIsLoading(false);
            return;
        }

        const auth = {
            email: email,
            password: password
        };

        try {
            const res = await http.post(apiUrl + '/auth/login', auth);
            localStorage.setItem('token', res.data);
            window.location.replace('/');
        } catch (error) {

        }
        setIsLoading(false);
    };

    showToast('success');

    return (
        <div className={styles.loginContainer}>
            <span className={styles.loginTitle}>Log in</span>
            <Form isLoading={isLoading} handleSubmit={handleSubmit} formData={formData} buttonName='Login' />
        </div>
    )
}

export default Login