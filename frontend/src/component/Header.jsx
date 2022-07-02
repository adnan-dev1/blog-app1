import React, { useState } from 'react'
import styles from './Header.module.css';
import headerBackground from '../images/BlogBackground.jpg';
import { Link } from 'react-router-dom';

const Header = () => {
    const [filter, setFilter] = useState('username');
    const [search, setSearch] = useState('');
    const filters = [
        {
            id: 'username',
            name: 'Author Name',
            checked: true
        },
        {
            id: 'post',
            name: 'Post Title'
        },
        {
            id: 'cat',
            name: 'Category'
        }
    ];

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div className={styles.headerContainer}>
            <img className={styles.headerImage} src={headerBackground} alt="" />
            <div className={styles.headerTitleContainer}>
                <h1 className={styles.headerTitle}>Bloggy Blog App</h1>
                <p className={styles.headerSubTitle}>Unleash Your Words In Writing Your Posts.</p>
                <div className={styles.headerSearchContainer}>
                    <input onChange={handleSearchChange} className={styles.headerSearchInput} />
                    <Link className={styles.headerSearchButton} to={`/?${filter}=${search}`}><i className={`fas fa-search ${styles.headerSearchIcon}`}></i> </Link>
                </div>
                <div className={styles.headerSearchFilter}>
                    <h3 className={styles.headerFilterTitle}>Search Filter: </h3>

                    {filters.map((filter) => {
                        return (
                            <div key={filter.id} className={styles.headerFilterOptionContainer}>
                                <input defaultChecked={filter.checked} className={styles.headerFilterOption} onChange={handleFilterChange} id={filter.id} name='filter' type="radio" value={filter.id} />
                                <label htmlFor={filter.id}>{filter.name}</label>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Header