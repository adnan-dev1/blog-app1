import React, { useEffect, useState } from 'react'
import styles from './SinglePost.module.css';
import { Link, useLocation } from 'react-router-dom';
import http from '../services/httpService';
import LoadingSpinner from './common/LoadingSpinner';
import Joi from 'joi-browser';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { showToast } from '../services/showToastNotify';

const apiUrl = process.env.REACT_APP_API_ENDPOINT + '/api';
const PF = process.env.REACT_APP_API_ENDPOINT;

const SinglePost = ({ user }) => {
    const [post, setPost] = useState({
        categories: []
    });
    const [cats, setCats] = useState([]);
    const [postCat, setPostCat] = useState([]);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [file, setFile] = useState(null);
    const [updateMode, setUpdateMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const path = useLocation().pathname.split('/')[2];

    const schema = Joi.object({
        title: Joi.string().min(5).max(20).required().label("Post title"),
        desc: Joi.string().max(1500).required().label("Post description")
    });

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await http.get(apiUrl + `/post/${path}`);
                setPost(res.data);
                setTitle(res.data.title);
                setDesc(res.data.desc);
                setPostCat(res.data.categories);
            } catch (error) {
                window.location.replace('/not-found');
            }
        };

        const fetchCats = async () => {
            const res = await http.get(apiUrl + '/category');
            setCats(res.data);
        }

        fetchPost();
        fetchCats();
    }, [path]);

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
            const res = await http.put(apiUrl + `/post/${post._id}`, newPost);
            setUpdateMode(false);
            setPost(res.data);
            toast.success('Post has been updated.');
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

    const handleDelete = async () => {
        await http.delete(apiUrl + `/post/${post._id}`);
        sessionStorage.setItem('postDeleted', 'Your post has been deleted.');
        window.location.replace('/');
    };

    showToast('success');
    return (
        <div className={styles.writeContainer}>
            <img className={styles.writeImg} src={file ? URL.createObjectURL(file) : PF + post.photo} alt="" />
            <form onSubmit={handleSubmit} className={styles.writeForm}>
                <div className={styles.formGroup}>
                    {updateMode && (
                        <>
                            <label htmlFor='inputFile' className={styles.writeFormAddIcon}>
                                <i className="fa-solid fa-circle-plus"></i>
                            </label>
                            <input onChange={(e) => setFile(e.target.files[0])} id='inputFile' className={styles.writeFormInputFile} type="file" />
                        </>

                    )}

                    {updateMode ? <input value={title} onChange={(e) => setTitle(e.target.value)} className={styles.writeFormInputTitle} placeholder='Title ....' type="text" /> : <h1 className={styles.writeFormTitle}>{title}</h1>}

                    {(!updateMode && user?.username === post.username) && <div className={styles.writeFormIcons}>
                        <i onClick={() => setUpdateMode(true)} className={`fa-solid fa-pen-to-square ${styles.writeFormEditIcon}`}></i>
                        <i onClick={() => handleDelete()} className={`fa-solid fa-trash-can ${styles.writeFormDeleteIcon}`}></i>
                    </div>}
                </div>

                <div className={styles.formGroupSubInfo}>
                    <Link className={styles.link} to={`/?username=${post.username}`}>
                        <span className={styles.formPostAuthor} >Author: {post.username}</span>
                    </Link>
                    <span className={styles.formPostDate} >{new Date(post.createdAt).toDateString()}</span>
                </div>

                <div className={styles.formGroup}>
                    {updateMode ? <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder='Tell Us Your Story ...' className={styles.writeFormTextarea} rows="15"></textarea> : <p className={styles.writeFormDesc}>{desc}</p>}
                </div>

                <div className={styles.formCatsGroup}>
                    {updateMode ? (
                        <>
                            <span className={styles.catTitle}>Set Your Post Categories: </span>
                            <div className={styles.catsContainer}>
                                {cats.map((cat) => {
                                    return (
                                        <div key={cat._id} className={styles.catContainer}>
                                            <input name={cat.name} onChange={handleChecked} id={cat._id} defaultChecked={post.categories.indexOf(cat.name) !== -1} className={styles.catInput} type="checkbox" />
                                            <label htmlFor={cat._id} className={styles.catLabel} >{cat.name}</label>
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                    ) : (
                        <>
                            <span className={styles.catTitle}>Post Categories: </span>
                            <div className={styles.catsContainer}>
                                {post.categories.length ?
                                    post.categories.map((cat) => {
                                        return (
                                            <span key={cat} className={styles.catText}>{cat}</span>
                                        )
                                    }) :
                                    <span className={styles.catText}>There Are No Categories For This Post.</span>
                                }
                            </div>
                        </>
                    )}

                </div>

                {updateMode && (isLoading ? <LoadingSpinner locationClass='loadSpinner' /> : <button className={styles.writeFormSubmit} type='submit'>Update</button>)}
            </form>
        </div>
    )
}

export default SinglePost