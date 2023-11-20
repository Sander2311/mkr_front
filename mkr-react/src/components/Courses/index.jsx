import React, { useEffect, useState } from 'react';
import { fetchGetAllCourses } from '../../fetch';
import styles from './Courses.module.scss';

const Courses = (me) => {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCoursesData = async () => {
      const courses = await fetchGetAllCourses();
      setCourses(courses);
    };

    fetchCoursesData();
  }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//       e.preventDefault();
      
//       const teacher = formData.teachers

//       formData.teachers = [teacher]

//     await fetchCreateCourse(formData)
      
//     setFormData({
//     title: '',
//     teachers: '', 
//     groups: '',
//   })
    
//   };

  return (
      <>
         {courses.map((course) => (
           <div key={course._id} className={styles.courseBlock}>
             <h2>{course.title}</h2>
             <div>{`${course.teachers[0].firstName} ${course.teachers[0].lastName}` }</div>
                </div>
              ))}
      </>
    
  );
};

export default Courses;
