import React, { useEffect, useState } from 'react';
import { fetchGetAllGroups } from '../../fetch';
import styles from './Groups.module.scss';

const Groups = (me) => {

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroupsData = async () => {
      const groups = await fetchGetAllGroups();
      setGroups(groups);
    };

    fetchGroupsData();
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
         {groups.map((group) => (
           <div key={group._id} className={styles.courseBlock}>
             <h2>{group.groupName}</h2>
             
                </div>
              ))}
      </>
    
  );
};

export default Groups;
