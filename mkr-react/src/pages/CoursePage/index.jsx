import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import CreateMaterial from "../../components/CreateMaterial";
import Materials from "../../components/Materials";
import Students from "../../components/Students";
import { fetchAuthMe, fetchGetCourseById } from "../../fetch";
import styles from "./CoursePage.module.scss";

const CoursePage = () => {
  const [me, setMe] = useState(null);
  const { id } = useParams();
  const [currentCourse, setCurrentCourse] = useState(null);
  const [sidebarValue, setSidebarValue] = useState("materials");
  const [isCreateCourseVisible, setCreateCourseVisible] = useState(false);

  const handleButtonClick = () => {
    setCreateCourseVisible(!isCreateCourseVisible);
  };

  useEffect(() => {
    const fetchMeData = async () => {
      const me = await fetchAuthMe();
      setMe(me);
    };

    const fetchCourseData = async () => {
      const course = await fetchGetCourseById(id);
      setCurrentCourse(course);
    };

    fetchCourseData();
    fetchMeData();
  }, []);

  const handleButtonClickMaterials = () => {
    setSidebarValue("materials");
  };

  const handleButtonClickGroups = () => {
    setSidebarValue("groups");
  };

  const handleButtonClickStudents = () => {
    setSidebarValue("students");
  };

  if (!window.localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className={styles.coursePageWrraper}>
        <div className={styles.main}>
          <div className={styles.courseBlock}>
            <h1>Тема курсу: {currentCourse && currentCourse.title}</h1>
            <div className={styles.info}>
              Викладач курсу:
              <img
                src={currentCourse && currentCourse.teachers[0].avatarUrl}
                width={45}
                height={45}
              />
              {` ${currentCourse && currentCourse.teachers[0].firstName} ${
                currentCourse && currentCourse.teachers[0].lastName
              }`}
            </div>

            <div className={styles.info}>
              Група:
              {currentCourse && currentCourse.groups[0].groupName}
            </div>
          </div>

          {sidebarValue === "materials" && (
            <div>
              <div className={styles.createCourseBlock}>
                {me && me.role === "teacher" && currentCourse && (
                  <CreateMaterial courseId={currentCourse._id} />
                )}
              </div>

              <div className={styles.groupsBlock}>
                {currentCourse && <Materials courseId={currentCourse._id} />}
              </div>
            </div>
          )}

          {me && me.role !== "student" && sidebarValue === "students" && (
            <div>
              <div className={styles.studentsBlock}>
                {me && <Students me={me} />}
              </div>
            </div>
          )}
        </div>
        <div className={styles.sidebar}>
          <div onClick={handleButtonClickMaterials}>Матеріали</div>
          {me && me.role === "admin" && (
            <div onClick={handleButtonClickGroups}>Групи</div>
          )}
          {me && me.role !== "student" && (
            <div onClick={handleButtonClickStudents}>Студенти</div>
          )}
        </div>
      </div>
    </>
  );
};

export default CoursePage;
