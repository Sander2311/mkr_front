import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {

   const handleLogout = () => {
    localStorage.removeItem('token');
  };
  return (
      <header className={styles.header}>
      <div className={styles.logo}>LearnSphere</div>
      {!window.localStorage.getItem('token') &&
        <div className={styles.buttons}>
        <Link to="/login">
            <button className={styles.loginButton}>Увійти</button>
        </Link>
        <Link to="/register">
            <button className={styles.registerButton}>Зареєструватись</button>
        </Link>
        </div>}
      
      {window.localStorage.getItem('token') &&
      <div className={styles.buttons}>
          <button className={styles.logOutButton} onClick={handleLogout}>Вихід</button>
      </div>}
    </header>
  );
};

export default Header;