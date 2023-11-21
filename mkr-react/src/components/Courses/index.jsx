import React, { useEffect, useState } from "react";
import { fetchGetAllCourses, fetchGetCoursesById } from "../../fetch";
import styles from "./Courses.module.scss";

const Courses = ({ me }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCoursesData = async () => {
      if (me.role === "admin") {
        const courses = await fetchGetAllCourses();
        setCourses(courses);
      } else if (me.role === "teacher") {
        const courses = await fetchGetCoursesById(me._id);
        setCourses(courses);
      }
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
          <h2 className={styles.title}>{course.title}</h2>
          <div>
            <div
              className={styles.info}
            >{`${course.teachers[0].firstName} ${course.teachers[0].lastName}`}</div>
            <div className={styles.info}>{course.groups[0].groupName}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Courses;
