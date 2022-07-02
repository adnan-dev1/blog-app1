import React, { useState } from 'react'
import styles from './Setting.module.css';
import http from '../services/httpService';
import LoadingSpinner from './common/LoadingSpinner';
import Joi from 'joi-browser';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const apiUrl = process.env.REACT_APP_API_ENDPOINT + '/api';
const PF = process.env.REACT_APP_API_ENDPOINT;

const Setting = ({ user }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [file, setFile] = useState(null);
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
            placeholder: user.username,
            handler: handleUsername
        },
        {
            labelName: 'Email',
            inputType: 'email',
            placeholder: user.email,
            handler: handleEmail
        },
        {
            labelName: 'Password',
            inputType: 'password',
            placeholder: 'Enter Your New Password ...',
            handler: handlePassword
        },
    ];

    const handleDelete = async () => {
        await http.delete(apiUrl + `/user/me`);
        sessionStorage.setItem('profileDeleted', 'Your Account has been deleted.');
        localStorage.removeItem('token');
        window.location.replace('/');
    };

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

        const newUser = {
            username: username,
            email: email,
            password: password
        };

        newUser.profilePic = user.profilePic;

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append('photo', '');
            data.append("file", file);
            newUser.profilePic = `/public/profileImages/${filename}`;
            await http.post(apiUrl + '/images', data);
        }

        try {
            const res = await http.put(apiUrl + '/user/me', newUser);
            sessionStorage.setItem('profileUpdated', 'Profile Updated Successfully');
            localStorage.setItem('token', res.data);
            window.location.replace('/');
        } catch (error) {
        }
        setIsLoading(false);
    };

    return (
        <div className={styles.settingContainer}>
            <div className={styles.settingTitleContainer}>
                <span className={styles.settingUpdateTitle}>Update Your Profile</span>
                <span onClick={handleDelete} className={styles.settingDeleteAccount}>Delete Your Account</span>
            </div>
            <form onSubmit={handleSubmit} className={styles.settingForm}>
                <div className={styles.settingFormGroupImage}>
                    <img className={styles.settingProfileImg} src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="" />
                    <label className={styles.settingFormFile} htmlFor="inputFile">
                        <i className="fa-solid fa-circle-user"></i>
                    </label>
                    <input onChange={(e) => setFile(e.target.files[0])} className={styles.settingFormFileInput} type="file" id='inputFile' />
                </div>

                <div className={styles.settingFormGroupInput}>
                    {formData.map((form) => {
                        return (<React.Fragment key={form.labelName}>
                            <label className={styles.settingFormLabelText} >{form.labelName} </label>
                            <input onChange={form.handler} className={styles.settingFormInput} type={form.inputType} placeholder={`${form.placeholder}`} />
                        </React.Fragment>

                        )
                    })}
                </div>

                {isLoading ? <LoadingSpinner /> : <button className={styles.settingFormSubmit} type='submit'>Update</button>}
            </form>
        </div>
    )
}

export default Setting