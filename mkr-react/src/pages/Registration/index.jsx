// Registration.js
import React, { useState } from 'react';
import { fetchRegister } from '../../fetch';
import styles from './Registration.module.scss';


export const Registration = () => {
  // State для зберігання значень полів форми
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student', // Змінено значення за замовчуванням
  });

  // State для слідкування невалідних полів
  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
    role: false,
  });

  // Функція для оновлення state при зміні значень полів форми
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Встановлюємо, що поле не є невалідним, якщо користувач вже ввів дані
    setFormErrors({
      ...formErrors,
      [name]: value.trim() === '',
    });
  };

  // Функція для обробки подання форми
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Перевіряємо, чи всі поля заповнені
    const isFormValid = Object.values(formErrors).every((field) => !field);

    if (isFormValid) {
      // Ваш код для обробки подання форми тут
      const data = await fetchRegister(formData);
      if (data) {
        console.log(data.user);
      }
      

        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'student', // або встановте значення за замовчуванням
        })
    } else {
      console.log('Form contains errors. Please fill in all required fields.');
    }
  };

  return (
    <div className={styles.registrationForm_wrapper}>
      <div className={styles.registrationForm}>
        <h2>Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Role:
            <select name="role" value={formData.role} onChange={handleChange} required>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};
