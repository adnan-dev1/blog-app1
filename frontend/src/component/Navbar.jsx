import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const PF = process.env.REACT_APP_API_ENDPOINT;

const Navbar = ({ user }) => {
  const linksList = [
    {
      name: 'HOME',
      path: '/'
    },
    {
      name: 'WRITE',
      path: '/write'
    },
    {
      name: 'ABOUT',
      path: '/about'
    }
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.replace('/');
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>

        <Link className={styles.link} to='/'>
          <i className={`fas fa-solid fa-blog ${styles.logo}`}></i>
          <h2 className={styles.logo}>BLOG</h2>
        </Link>
      </div>

      <input style={{ display: "none" }} type="checkbox" id="checkbox_toggle" />

      <div className={styles.navCenter}>

        <ul className={styles.navList}>
          {linksList.map((link) => {
            return <Link className={styles.link} key={link.name} to={link.path}>
              <li className={styles.navListItems}>{link.name}</li>
            </Link>
          })}

          {user && <Link className={styles.link} to='/'>
            <li onClick={handleLogout} className={styles.navListItems}>LOGOUT</li>

          </Link>
          }

        </ul>
      </div>
      <label htmlFor="checkbox_toggle" className={styles.hamburger}>&#9776;</label>
      <div className={styles.navRight}>
        {user ?
          <Link className={styles.link} to='/settings'>
            <img className={styles.profileImg} src={PF + user.profilePic} alt="" />
          </Link> :
          <ul className={styles.navList}>
            <Link className={styles.link} to='/login'>
              <li className={styles.navListItems}>LOGIN</li>
            </Link>
            <Link className={styles.link} to='/register'>
              <li className={styles.navListItems}>REGISTER</li>
            </Link>
          </ul>}

      </div>
    </nav>
  );
};

export default Navbar;
