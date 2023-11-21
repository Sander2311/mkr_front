import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Courses from "../../components/Courses";
import CreateCourse from "../../components/CreateCourse";
import CreateGroup from "../../components/CreateGroup";
import Groups from "../../components/Groups";
import Students from "../../components/Students";
import { fetchAuthMe } from "../../fetch";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  const [me, setMe] = useState(null);
  const [sidebarValue, setSidebarValue] = useState("courses");
  const [isCreateCourseVisible, setCreateCourseVisible] = useState(false);

  const handleButtonClick = () => {
    setCreateCourseVisible(!isCreateCourseVisible);
  };

  useEffect(() => {
    const fetchMeData = async () => {
      const me = await fetchAuthMe();
      setMe(me);
    };
    fetchMeData();
  }, []);

  const handleButtonClickCourses = () => {
    setSidebarValue("courses");
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
      <div className={styles.homePageWrraper}>
        <div className={styles.main}>
          {sidebarValue === "courses" && (
            <div>
              {me && me.role !== "student" && (
                <div className={styles.blockButtonCreateCourse}>
                  <button
                    onClick={handleButtonClick}
                    className={styles.buttonCreateCourse}
                  >
                    Створити курс
                  </button>
                </div>
              )}
              {isCreateCourseVisible && (
                <div className={styles.createCourseBlock}>
                  <CreateCourse />
                </div>
              )}
              <div className={styles.coursesBlock}>
                {me && <Courses me={me} />}
              </div>
            </div>
          )}

          {me && me.role === "admin" && sidebarValue === "groups" && (
            <div>
              <div className={styles.createCourseBlock}>
                <CreateGroup />
              </div>

              <div className={styles.groupsBlock}>
                {me && <Groups me={me} />}
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
          <div onClick={handleButtonClickCourses}>Мої курси</div>
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

export default HomePage;
