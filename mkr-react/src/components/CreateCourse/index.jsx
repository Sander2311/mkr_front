import React, { useEffect, useState } from 'react';
import { fetchCreateCourse, fetchTeachers } from '../../fetch';
import styles from './CreateCourse.module.scss';

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    title: '',
    teachers: '', // Оновлено поле для викладача
    groups: '',
  });

  const [teacherOptions, setTeacherOptions] = useState([]);

  useEffect(() => {
    const fetchTeachersData = async () => {
      const teachers = await fetchTeachers();
      setTeacherOptions(teachers);
    };

    fetchTeachersData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      
      const teacher = formData.teachers

      formData.teachers = [teacher]

    const newCourse = await fetchCreateCourse(formData)
      
    console.log(newCourse);

    
  };

  return (
    <div className={styles.createCourseWrapper}>
      <div className={styles.createCourse}>
        <h2>Новий курс</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Назва курсу:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Викладач:
            <select
              name="teachers"
              value={formData.teachers} // Оновлено поле для викладача
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Виберіть викладача
              </option>
              {teacherOptions.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {`${teacher.firstName} ${teacher.lastName}`}
                </option>
              ))}
            </select>
          </label>
          <label>
            Група:
            <input
              type="text"
              name="groups"
              value={formData.groups}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Створити</button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
