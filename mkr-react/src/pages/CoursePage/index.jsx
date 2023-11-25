import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Chats from "../../components/Chats";
import CreateMaterial from "../../components/CreateMaterial";
import Criterias from "../../components/Criterias";
import Materials from "../../components/Materials";
import Results from "../../components/Results";
import { fetchAuthMe, fetchGetCourseById } from "../../fetch";
import styles from "./CoursePage.module.scss";

const CoursePage = () => {
  const [me, setMe] = useState(null);
  const { id } = useParams();
  const [currentCourse, setCurrentCourse] = useState(null);
  const [sidebarValue, setSidebarValue] = useState("materials");

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

  const handleButtonClickChats = () => {
    setSidebarValue("chats");
  };

  const handleButtonClickResults = () => {
    setSidebarValue("results");
  };

  const handleButtonClickCriteria = () => {
    setSidebarValue("criteria");
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
                {currentCourse && (
                  <Materials courseId={currentCourse._id} me={me} />
                )}
              </div>
            </div>
          )}

          {sidebarValue === "chats" && (
            <div>
              <div className={styles.chatsBlock}>
                {me && currentCourse && (
                  <Chats course={currentCourse} me={me} />
                )}
              </div>
            </div>
          )}

          {sidebarValue === "criteria" && (
            <div>
              <div className={styles.chatsBlock}>
                {me && currentCourse && (
                  <Criterias course={currentCourse} me={me} />
                )}
              </div>
            </div>
          )}

          {sidebarValue === "results" && (
            <div>
              <div className={styles.chatsBlock}>
                {me && currentCourse && (
                  <Results course={currentCourse} me={me} />
                )}
              </div>
            </div>
          )}
        </div>
        <div className={styles.sidebar}>
          <div onClick={handleButtonClickMaterials}>Матеріали</div>
          <div onClick={handleButtonClickChats}>Чати</div>
          {me && me.role === "teacher" && (
            <div onClick={handleButtonClickCriteria}>Критерії оцінювання</div>
          )}
          <div onClick={handleButtonClickResults}>Результати</div>
        </div>
      </div>
    </>
  );
};

export default CoursePage;
