import React, { useEffect, useState } from "react";
import {
  fetchDeleteMaterialById,
  fetchMaterialsByCourseId,
  fetchUpdateMaterialById,
} from "../../fetch.js";
import styles from "./Materials.module.scss";

const Materials = ({ courseId }) => {
  const [materials, setMaterials] = useState([]);
  const [editMaterial, setEditMaterial] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
  });

  useEffect(() => {
    const fetchMaterialsData = async () => {
      const materials = await fetchMaterialsByCourseId(courseId);
      setMaterials(materials);
    };

    fetchMaterialsData();
  }, []);

  const handleUpdateClicks = async (e, id, clicksNumber) => {
    const newClicksNumber = clicksNumber + 1;
    await fetchUpdateMaterialById(
      {
        clicksNumber: newClicksNumber,
      },
      id
    );
  };

  const handleUpdateMaterial = async (e, id) => {
    await fetchUpdateMaterialById(formData, id);
    const materials = await fetchMaterialsByCourseId(courseId);
    setMaterials(materials);
    setEditMaterial(null);
  };

  const handleDeleteMaterial = async (e, id) => {
    await fetchDeleteMaterialById(id);
    const materials = await fetchMaterialsByCourseId(courseId);
    setMaterials(materials);
    setEditMaterial(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditMaterial = (e, material) => {
    if (editMaterial && editMaterial !== material._id) {
      setEditMaterial(material._id);
      setFormData({
        title: material.title,
        url: material.url,
      });
    } else if (editMaterial && editMaterial === material._id) {
      setEditMaterial(null);
    } else {
      setEditMaterial(material._id);
      setFormData({
        title: material.title,
        url: material.url,
      });
    }
  };

  return (
    <>
      {materials.map((material) => (
        <div key={material._id} className={styles.materialItemWrapper}>
          <div className={styles.materialItem}>
            {editMaterial !== material._id && (
              <a
                href={material.url}
                target="_blank"
                onClick={(e) =>
                  handleUpdateClicks(e, material._id, material.clicksNumber)
                }
              >
                {material.title}
              </a>
            )}
            {editMaterial !== material._id && (
              <div>
                Кількість перегляді:{" "}
                {material.clicksNumber ? material.clicksNumber : 0}
              </div>
            )}

            {editMaterial === material._id && (
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            )}

            {editMaterial === material._id && (
              <input
                type="text"
                name="url"
                value={formData.url}
                onChange={handleChange}
              />
            )}

            {editMaterial === material._id && (
              <button onClick={(e) => handleUpdateMaterial(e, material._id)}>
                Редагувати
              </button>
            )}
            {editMaterial === material._id && (
              <button
                className={styles.cencele}
                onClick={(e) => handleEditMaterial(e, material)}
              >
                Відмінити
              </button>
            )}
          </div>

          {editMaterial !== material._id && (
            <div className={styles.buttons}>
              <button
                className={styles.edit}
                onClick={(e) => handleEditMaterial(e, material)}
              >
                Редагувати
              </button>
              <button
                className={styles.delete}
                onClick={(e) => handleDeleteMaterial(e, material._id)}
              >
                Видалити
              </button>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default Materials;
