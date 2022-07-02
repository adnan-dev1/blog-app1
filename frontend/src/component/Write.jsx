import React, { useEffect, useState } from 'react'
import styles from './Write.module.css';
import http from '../services/httpService';
import LoadingSpinner from './common/LoadingSpinner';
import Joi from 'joi-browser';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const apiUrl = process.env.REACT_APP_API_ENDPOINT + '/api';
const PF = process.env.REACT_APP_API_ENDPOINT;

const Write = () => {
    const [cats, setCats] = useState([]);
    const [postCat, setPostCat] = useState([]);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const schema = Joi.object({
        title: Joi.string().min(5).max(20).required().label("Post title"),
        desc: Joi.string().max(1500).required().label("Post description")
    });

    useEffect(() => {
        const fetchCats = async () => {
            const res = await http.get(apiUrl + '/category');
            setCats(res.data);
        }
        fetchCats();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        const { error } = schema.validate({
            title: title,
            desc: desc
        });

        if (error) {
            toast.error(error.details[0].message);
            setIsLoading(false);
            return;
        }

        if (postCat.length > 3) {
            toast.error("You can't add more than 3 categories for one post.");
            setIsLoading(false);
            return;
        }

        const newPost = {
            title: title,
            desc: desc,
            categories: postCat
        };

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append('photo', 'post');
            data.append("file", file);
            newPost.photo = `/public/postImages/${filename}`;
            await http.post(apiUrl + '/images', data);
        }

        try {
            const res = await http.post(apiUrl + '/post', newPost);
            sessionStorage.setItem('created', 'Post has been created.');
            window.location.replace(`/post/${res.data._id}`);
        } catch (error) {

        }
        setIsLoading(false);
    };

    const handleChecked = (e) => {
        let newCats = postCat;
        if (e.target.checked) {
            newCats.push(e.target.name);
        } else {
            newCats = newCats.filter((cat) => cat !== e.target.name);
        }
        setPostCat(newCats);
    };

    return (
        <div className={styles.writeContainer}>
            <img className={styles.writeImg} src={file ? URL.createObjectURL(file) : PF + '/public/postImages/defaultImage.jpg'} alt="" />
            <form onSubmit={handleSubmit} className={styles.writeForm}>
                <div className={styles.formGroup}>
                    <label htmlFor='inputFile' className={styles.writeFormAddIcon}>
                        <i className="fa-solid fa-circle-plus"></i>
                    </label>
                    <input onChange={(e) => setFile(e.target.files[0])} id='inputFile' className={styles.writeFormInputFile} type="file" />
                    <input onChange={(e) => setTitle(e.target.value)} className={styles.writeFormInputTitle} placeholder='Title ....' type="text" />
                </div>

                <div className={styles.formGroup}>
                    <textarea onChange={(e) => setDesc(e.target.value)} placeholder='Tell Us Your Story ...' className={styles.writeFormTextarea} rows="15"></textarea>
                </div>

                <div className={styles.formCatsGroup}>
                    <span className={styles.catTitle}>Set Your Post Categories: </span>
                    <div className={styles.catsContainer}>
                        {cats.map((cat) => {
                            return (
                                <div key={cat._id} className={styles.catContainer}>
                                    <input name={cat.name} onChange={handleChecked} id={cat._id} className={styles.catInput} type="checkbox" />
                                    <label htmlFor={cat._id} className={styles.catLabel} >{cat.name}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {isLoading ? <LoadingSpinner locationClass='loadSpinner' /> : <button className={styles.writeFormSubmit} type='submit'>Publish</button>}
            </form>
        </div>
    )
}

export default Write