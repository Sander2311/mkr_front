import React, { useState } from 'react';
import {  fetchCreateGroup } from '../../fetch';
import styles from './CreateGroup.module.scss';

const CreateGroup = () => {
  const [formData, setFormData] = useState({
    groupName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
    await fetchCreateGroup(formData)
      
    setFormData({
    groupName: ''
  })
    
  };

  return (
    <div className={styles.createCourseWrapper}>
      <div className={styles.createCourse}>
        <h2>Нова група</h2>
        <form >
          <label>
            Назва групи:
            <input
              type="text"
              name="groupName"
              value={formData.groupName}
              onChange={handleChange}
              required
            />
          </label>
        </form>
        <button type="submit" onClick={handleSubmit}>Створити</button>
      </div>
    </div>
  );
};

export default CreateGroup;
