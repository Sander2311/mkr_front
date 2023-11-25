import React, { useState } from "react";
import { useEffect } from "react";
import { fetchCreateCriteria, fetchCriteriasByCourseId } from "../../fetch";
import styles from "./Criterias.module.scss";

const Criterias = ({ course, me }) => {
  const [formData, setFormData] = useState({
    title: "",
    maxMark: "",
  });

  const [criterias, setCriterias] = useState([]);
  const [editCriteria, setEditCriteria] = useState(null);
  const [totalMark, settotalMark] = useState(0);

  const fetchCriteriasData = async () => {
    const criterias = await fetchCriteriasByCourseId(course._id);
    setCriterias(criterias);
    const total = criterias.reduce(
      (accumulator, currentValue) => accumulator + currentValue.maxMark,
      0
    );
    settotalMark(total);
  };

  useEffect(() => {
    fetchCriteriasData();
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

    formData.course = course._id;

    await fetchCreateCriteria(formData);

    await fetchCriteriasData();

    setFormData({
      title: "",
      maxMark: "",
    });
  };

  const handleUpdateCriteria = async (e, id) => {
    // await fetchUpdateMaterialById(formData, id);
    const materials = await fetchCriteriasByCourseId(course._id);
    setCriterias(materials);
    setEditCriteria(null);
  };

  const handleDeleteCriterias = async (e, id) => {
    // await fetchDeleteMaterialById(id);
    const materials = await fetchCriteriasByCourseId(course._id);
    setCriterias(materials);
    setEditCriteria(null);
  };

  const handleEditCriterias = (e, criteria) => {
    if (editCriteria && editCriteria !== criteria._id) {
      setEditCriteria(criteria._id);
      setFormData({
        title: criteria.title,
        maxMark: criteria.maxMark,
      });
    } else if (editCriteria && editCriteria === criteria._id) {
      setEditCriteria(null);
    } else {
      setEditCriteria(criteria._id);
      setFormData({
        title: criteria.title,
        maxMark: criteria.maxMark,
      });
    }
  };

  return (
    <div className={styles.createCourseWrapper}>
      <div className={styles.createCourse}>
        <h2>Створити критерій оцінювання</h2>
        <form>
          <label>
            Назва критерію:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className={styles.text}
            />
          </label>
          <label>
            Максимальна кількість балів:
            <input
              type="number"
              name="maxMark"
              value={formData.maxMark}
              onChange={handleChange}
              required
              className={styles.number}
            />
          </label>
        </form>
        <button type="submit" onClick={handleSubmit}>
          Створити
        </button>
      </div>
      <div className={styles.criteriaItem}>
        <div>Максимальний бал за курс: {totalMark}</div>{" "}
      </div>

      {criterias.map((criteria) => (
        <div className={styles.criteriaItemWrapper}>
          <div key={criteria._id} className={styles.criteriaItem}>
            <div>
              {editCriteria !== criteria._id && (
                <div>Назва: {criteria.title}</div>
              )}

              {editCriteria !== criteria._id && (
                <div> Максимальна кількість балів: {criteria.maxMark}</div>
              )}
              {editCriteria === criteria._id && (
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              )}

              {editCriteria === criteria._id && (
                <input
                  type="number"
                  name="maxMark"
                  value={formData.maxMark}
                  onChange={handleChange}
                />
              )}

              {editCriteria === criteria._id && (
                <button onClick={(e) => handleUpdateCriteria(e, criteria._id)}>
                  Редагувати
                </button>
              )}
              {editCriteria === criteria._id && (
                <button
                  className={styles.cencele}
                  onClick={(e) => handleEditCriterias(e, criteria)}
                >
                  Відмінити
                </button>
              )}
            </div>
          </div>
          {editCriteria !== criteria._id && (
            <div className={styles.buttons}>
              <button
                className={styles.edit}
                onClick={(e) => handleEditCriterias(e, criteria)}
              >
                Редагувати
              </button>
              <button
                className={styles.delete}
                onClick={(e) => handleDeleteCriterias(e, criteria._id)}
              >
                Видалити
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Criterias;
