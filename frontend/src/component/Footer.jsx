import React from 'react'
import styles from './Footer.module.css'

const Footer = () => {
    return (
        <div className={styles.footerContainer}>
            <div className={styles.footerLeft}>
                <span className={styles.footerTitle}>Bloggy Blog App</span>
                <p className={styles.footerDesc}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable.</p>
            </div>
            <div className={styles.footerCenter}>
                <span className={styles.footerHeadLine}>Useful Links</span>
                <ul className={styles.footerList}>
                    <li className={styles.footerListItems}>Home</li>
                    <li className={styles.footerListItems}>Contact</li>
                    <li className={styles.footerListItems}>About</li>
                    <li className={styles.footerListItems}>My Account</li>
                </ul>
            </div>
            <div className={styles.footerRight}>
                <span className={styles.footerHeadLine}>Follow Us : </span>
                <div className={styles.footerSocialContainer}>
                    <i className={`fa-brands fa-facebook ${styles.footerSocialIcon}`} style={{ backgroundColor: "#3b5998" }}></i>
                    <i className={`fa-brands fa-instagram ${styles.footerSocialIcon}`} style={{ backgroundColor: "#fb3958" }}></i>
                    <i className={`fa-brands fa-twitter ${styles.footerSocialIcon}`} style={{ backgroundColor: "#1DA1F2" }}></i>
                    <i className={`fa-brands fa-pinterest ${styles.footerSocialIcon}`} style={{ backgroundColor: "#E60023" }}></i>
                </div>
            </div>
        </div>
    )
}

export default Footer