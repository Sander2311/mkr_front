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

  useEffect(() => {
    const fetchCriteriasData = async () => {
      const criterias = await fetchCriteriasByCourseId(course._id);
      setCriterias(criterias);
    };

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

    setFormData({
      title: "",
      maxMark: "",
    });
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

      {criterias.map((criteria) => (
        <div key={criteria._id} className={styles.chatItem}>
          <div>
            {criteria.title} {criteria.maxMark}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Criterias;
