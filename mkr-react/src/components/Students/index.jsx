import React, { useEffect, useState } from "react";
import {
  fetchGetAllGroups,
  fetchStudents,
  fetchUpdateStudentGroup,
} from "../../fetch";
import styles from "./Students.module.scss";

const Students = (me) => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    group: "",
  });

  const [groupsOptions, setGroupsOptions] = useState([]);

  useEffect(() => {
    const fetchStudentsData = async () => {
      const students = await fetchStudents();
      setStudents(students);
    };

    const fetchGroupsData = async () => {
      const groups = await fetchGetAllGroups();
      setGroupsOptions(groups);
    };

    fetchGroupsData();
    fetchStudentsData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e, studentId) => {
    e.preventDefault();

    await fetchUpdateStudentGroup(formData, studentId);

    setFormData({
      group: "",
    });
  };

  return (
    <>
      {students.map((student) => (
        <div key={student._id} className={styles.studentItem}>
          <div>
            {student.firstName} {student.lastName}
          </div>
          <div>{student.email}</div>
          <div>
            {student.group ? (
              <div>
                <span
                  className={styles.group}
                >{`Група: ${student.group.groupName}`}</span>
                <label>
                  Оновити групу:
                  <select
                    name="group"
                    value={formData.group} // Оновлено поле для викладача
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Виберіть групу
                    </option>
                    {groupsOptions.map((group) => (
                      <option key={group._id} value={group._id}>
                        {group.groupName}
                      </option>
                    ))}
                  </select>
                  <button onClick={(e) => handleSubmit(e, student._id)}>
                    Оновити групу
                  </button>
                </label>
              </div>
            ) : (
              <label>
                Група:
                <select
                  name="group"
                  value={formData.group} // Оновлено поле для викладача
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Виберіть групу
                  </option>
                  {groupsOptions.map((group) => (
                    <option key={group._id} value={group._id}>
                      {group.groupName}
                    </option>
                  ))}
                </select>
                <button onClick={(e) => handleSubmit(e, student._id)}>
                  Оновити групу
                </button>
              </label>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Students;
