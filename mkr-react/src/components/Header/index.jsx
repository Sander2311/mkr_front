import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {
  return (
      <header className={styles.header}>
      <div className={styles.logo}>LearnSphere</div>
      <div className={styles.buttons}>
        <Link to="/login">
            <button className={styles.loginButton}>Увійти</button>
        </Link>
        <Link to="/register">
            <button className={styles.registerButton}>Зареєструватись</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;