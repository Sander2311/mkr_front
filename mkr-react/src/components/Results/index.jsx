import React, { useState } from "react";
import { useEffect } from "react";
import {
  fetchMarksByCourseId,
  fetchStudentsByGroupId,
  fetchUpdateMark,
} from "../../fetch";
import styles from "./Results.module.scss";

const Results = ({ course, me }) => {
  const [formData, setFormData] = useState({
    mark: "",
  });

  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState([]);
  const [editMark, setEditMark] = useState(null);

  const fetchChatUsersData = async () => {
    const students = await fetchStudentsByGroupId(course.groups[0]._id);
    setStudents(students);
  };

  const fetchUsersMarksData = async () => {
    const marks = await fetchMarksByCourseId(course._id);
    setMarks(marks);
  };

  useEffect(() => {
    fetchChatUsersData();
    fetchUsersMarksData();
  }, []);

  const handleEditMark = (e, mark) => {
    if (editMark && editMark !== mark._id) {
      setEditMark(mark._id);
      setFormData({
        mark: mark.mark,
      });
    } else if (editMark && editMark === mark._id) {
      setEditMark(null);
    } else {
      setEditMark(mark._id);
      setFormData({
        mark: mark.mark,
      });
    }
  };

  const handleUpdateMark = async (e, id) => {
    await fetchUpdateMark(formData, id);
    fetchUsersMarksData();
    setEditMark(null);
  };
  // const fetchCriteriasData = async () => {
  //   const criterias = await fetchCriteriasByCourseId(course._id);
  //   setCriterias(criterias);
  //
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   formData.course = course._id;

  //   await fetchCreateCriteria(formData);

  //   await fetchCriteriasData();

  //   setFormData({
  //     title: "",
  //     maxMark: "",
  //   });
  // };

  return (
    <div className={styles.createCourseWrapper}>
      {students &&
        students.map((student) => (
          <div className={styles.criteriaItemWrapper}>
            {me.role === "student" && me._id === student._id && (
              <div key={student._id} className={styles.criteriaItem}>
                <div className={styles.userInfo}>
                  <div className={styles.userName}>
                    <img src={student.avatarUrl} width={50} />
                    <div>{student.firstName}</div>
                    <div>{student.lastName}</div>
                  </div>
                  <div>Email: {student.email}</div>
                  <div>Група: {student.group.groupName}</div>
                </div>
                <div className={styles.usersMarkBlockWrapper}>
                  {marks &&
                    marks.map((mark) => (
                      <div key={mark._id}>
                        {mark.user === student._id && (
                          <div className={styles.usersMarkBlock}>
                            <div className={styles.usersMarkTitle}>
                              {mark.criteria.title}
                            </div>
                            {editMark !== mark._id && (
                              <div className={styles.usersMark}>
                                {`${mark.mark} / ${mark.criteria.maxMark}`}
                              </div>
                            )}

                            {me &&
                              me.role === "teacher" &&
                              editMark === mark._id && (
                                <div className={styles.usersMark}>
                                  <input
                                    type="number"
                                    name="mark"
                                    value={formData.mark}
                                    onChange={handleChange}
                                  />
                                  {`/ ${mark.criteria.maxMark}`}
                                </div>
                              )}

                            <div>
                              {me &&
                                me.role === "teacher" &&
                                editMark !== mark._id && (
                                  <div className={styles.buttons}>
                                    <button
                                      className={styles.edit}
                                      onClick={(e) => handleEditMark(e, mark)}
                                    >
                                      Редагувати
                                    </button>
                                  </div>
                                )}
                              {me &&
                                me.role === "teacher" &&
                                editMark === mark._id && (
                                  <button
                                    onClick={(e) =>
                                      handleUpdateMark(e, mark._id)
                                    }
                                  >
                                    Зберегти
                                  </button>
                                )}
                              {me &&
                                me.role === "teacher" &&
                                editMark === mark._id && (
                                  <button
                                    className={styles.cencele}
                                    onClick={(e) => handleEditMark(e, mark)}
                                  >
                                    Відмінити
                                  </button>
                                )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}
            {me.role !== "student" && (
              <div key={student._id} className={styles.criteriaItem}>
                <div className={styles.userInfo}>
                  <div className={styles.userName}>
                    <img src={student.avatarUrl} width={50} />
                    <div>{student.firstName}</div>
                    <div>{student.lastName}</div>
                  </div>
                  <div>Email: {student.email}</div>
                  <div>Група: {student.group.groupName}</div>
                </div>
                <div className={styles.usersMarkBlockWrapper}>
                  {marks &&
                    marks.map((mark) => (
                      <div key={mark._id}>
                        {mark.user === student._id && (
                          <div className={styles.usersMarkBlock}>
                            <div className={styles.usersMarkTitle}>
                              {mark.criteria.title}
                            </div>
                            {editMark !== mark._id && (
                              <div className={styles.usersMark}>
                                {`${mark.mark} / ${mark.criteria.maxMark}`}
                              </div>
                            )}

                            {me &&
                              me.role === "teacher" &&
                              editMark === mark._id && (
                                <div className={styles.usersMark}>
                                  <input
                                    type="number"
                                    name="mark"
                                    value={formData.mark}
                                    onChange={handleChange}
                                  />
                                  {`/ ${mark.criteria.maxMark}`}
                                </div>
                              )}

                            <div>
                              {me &&
                                me.role === "teacher" &&
                                editMark !== mark._id && (
                                  <div className={styles.buttons}>
                                    <button
                                      className={styles.edit}
                                      onClick={(e) => handleEditMark(e, mark)}
                                    >
                                      Редагувати
                                    </button>
                                  </div>
                                )}
                              {me &&
                                me.role === "teacher" &&
                                editMark === mark._id && (
                                  <button
                                    onClick={(e) =>
                                      handleUpdateMark(e, mark._id)
                                    }
                                  >
                                    Зберегти
                                  </button>
                                )}
                              {me &&
                                me.role === "teacher" &&
                                editMark === mark._id && (
                                  <button
                                    className={styles.cencele}
                                    onClick={(e) => handleEditMark(e, mark)}
                                  >
                                    Відмінити
                                  </button>
                                )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default Results;
