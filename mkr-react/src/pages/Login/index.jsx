import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { fetchAuthMe, fetchLogin } from '../../fetch';
import styles from './Login.module.scss';


export const Login = () => {

const [isAuth, setIsAuth] = React.useState(null);
  // State для зберігання значень полів форми
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Функція для оновлення state при зміні значень полів форми
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Функція для обробки подання форми
  const handleSubmit = async (e) => {
    e.preventDefault();

      // Ваш код для обробки подання форми тут
      const data = await fetchLogin(formData);
      if (data.token) {
         window.localStorage.setItem('token', data.token);
      }

      const authMe = await fetchAuthMe();
      setIsAuth(authMe)
        setFormData({
            email: '',
            password: '',
        })
    
    };
    
    if(isAuth) {
        return <Navigate to="/" />
  }

  return (
    <div className={styles.loginForm_wrapper}>
      <div className={styles.loginForm}>
        <h2>Вхід</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Логін/Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Пароль:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Увійти</button>
        </form>
      </div>
    </div>
  );
};