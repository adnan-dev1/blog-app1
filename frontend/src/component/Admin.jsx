import Joi from 'joi-browser';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import styles from './Admin.module.css'
import LoadingSpinner from './common/LoadingSpinner';
import 'react-toastify/dist/ReactToastify.css';
import http from '../services/httpService';
import Table from './common/Table';
import { showToast } from '../services/showToastNotify';

const apiUrl = process.env.REACT_APP_API_ENDPOINT + '/api';

const Admin = () => {
    const [cats, setCats] = useState([]);
    const [cat, setCat] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);

    const schema = Joi.object({
        name: Joi.string().min(3).max(15).required().label("Category Name")
    });

    useEffect(() => {
        const fetchCats = async () => {
            const res = await http.get(apiUrl + '/category');
            setCats(res.data);
        };
        const fetchUsers = async () => {
            const res = await http.get(apiUrl + '/user');
            setUsers(res.data);
        };
        const fetchPosts = async () => {
            const res = await http.get(apiUrl + '/post');
            setPosts(res.data);
        };
        fetchCats();
        fetchUsers();
        fetchPosts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const { error } = schema.validate({
            name: cat,
        });

        if (error) {
            toast.error(error.details[0].message);
            setIsLoading(false);
            return;
        }

        const category = {
            name: cat,
        };

        try {
            await http.post(apiUrl + '/category', category);
            window.location.replace('/admin');
        } catch (error) {

        }
        setIsLoading(false);
    };

    const handleCatDelete = async (catID) => {
        await http.delete(apiUrl + `/category/${catID}`);
        sessionStorage.setItem('categoryDeleted', 'Category has been deleted.');
        window.location.replace('/admin');
    };

    const handleUserDelete = async (userID) => {
        await http.delete(apiUrl + `/user/${userID}`);
        sessionStorage.setItem('userDeleted', 'User has been deleted.');
        window.location.replace('/admin');
    };

    const handlePostDelete = async (postID) => {
        await http.delete(apiUrl + `/post/${postID}`);
        sessionStorage.setItem('postDeleted', 'Post has been deleted.');
        window.location.replace('/admin');
    };

    showToast('info');
    return (
        <div className={styles.adminContainer}>
            <h1 className={styles.lined}>Category</h1>
            <div className={styles.adminCatContainer}>
                <div className={styles.createCatContainer}>
                    <span className={styles.catTitle}>Create Category: </span>
                    <form className={styles.createCatForm} onSubmit={handleSubmit}>
                        <input onChange={(e) => setCat(e.target.value)} className={styles.createCatFormInput} type='text' placeholder={`Enter Category Name ....`} />
                        {isLoading ? <LoadingSpinner /> : <button className={styles.createCatFormSubmit} type='submit'>Create</button>}
                    </form>
                </div>
                <div className={styles.deleteCatContainer}>
                    <span className={styles.catTitle}>Categories Created: </span>
                    <div className={styles.adminTableDataContainer}>
                        {cats.length !== 0 ?
                            <Table headers={["Category Name"]} keyContents={["name"]} data={cats} deleteHandler={handleCatDelete} />
                            :
                            <span className={styles.noData}>No Categories Found In The Database.</span>
                        }
                    </div>
                </div>
            </div>

            <h1 className={styles.lined}>Users</h1>

            <div className={styles.adminTableDataContainer}>
                {users.length !== 0 ?
                    <Table headers={["Username", "Email"]} keyContents={["username", "email"]} data={users} deleteHandler={handleUserDelete} />
                    :
                    <span className={styles.noData}>No Users Found In The Database.</span>
                }
            </div>

            <h1 className={styles.lined}>Posts</h1>

            <div className={styles.adminTableDataContainer}>
                {posts.length !== 0 ?
                    <Table headers={["Post Title", "Author"]} keyContents={["title", "username"]} data={posts} deleteHandler={handlePostDelete} />
                    :
                    <span className={styles.noData}>No Posts Found In The Database.</span>
                }
            </div>
        </div>
    )
}

export default Admin