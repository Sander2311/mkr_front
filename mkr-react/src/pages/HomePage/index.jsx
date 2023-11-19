import React from 'react';
import CreateCourse from '../../components/CreateCourse';
import styles from './HomePage.module.scss';

const HomePage = () => {
    return (
    <>
        <div className={styles.header}>
            <div className={styles.createCourseBlock}>
                    <CreateCourse />
            </div>
            <div className={styles.coursesBlock}>
            
            </div>
        </div>
        </>
    )
};

export default HomePage;