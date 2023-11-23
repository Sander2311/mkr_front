import React, { useState } from "react";
import { fetchCreateMaterial } from "../../fetch";
import styles from "./CreateMaterial.module.scss";

const CreateMaterial = ({ courseId }) => {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    formData.course = courseId;

    await fetchCreateMaterial(formData);

    setFormData({
      title: "",
      url: "",
    });
  };

  return (
    <div className={styles.createCourseWrapper}>
      <div className={styles.createCourse}>
        <h2>Створити матеріал до курсу</h2>
        <form>
          <label>
            Заголовок:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Посилання:
            <input
              type="text"
              name="url"
              value={formData.url}
              onChange={handleChange}
              required
            />
          </label>
        </form>
        <button type="submit" onClick={handleSubmit}>
          Створити
        </button>
      </div>
    </div>
  );
};

export default CreateMaterial;
