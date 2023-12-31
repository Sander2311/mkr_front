import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchGetAllCourses,
  fetchGetCoursesByGroupId,
  fetchGetCoursesById,
} from "../../fetch";
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
      } else if (me.role === "student") {
        const courses = await fetchGetCoursesByGroupId(me.group);
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
          <h2>
            <Link className={styles.title} to={`/course/${course._id}`}>
              {course.title}
            </Link>
          </h2>
          <div>
            Викладач курсу:
            <div className={styles.info}>
              <img src={course.teachers[0].avatarUrl} width={45} height={45} />
              {` ${course.teachers[0].firstName} ${course.teachers[0].lastName}`}
            </div>
            Група:
            <div className={styles.info}>{course.groups[0].groupName}</div>
            Кількість студентів:
            <div className={styles.info}>{course.groups[0].studentsNumber}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Courses;
