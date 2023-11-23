import axiosInstance from "./axios.js";

export const fetchRegister = async (params) => {
  try {
    const { data } = await axiosInstance.post("/auth/register", params);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const fetchLogin = async (params) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", params);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const fetchAuthMe = async () => {
  try {
    const { data } = await axiosInstance.get("/users/me");
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const fetchTeachers = async () => {
  try {
    const { data } = await axiosInstance.get("/users/teachers");
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const fetchStudents = async () => {
  try {
    const { data } = await axiosInstance.get("/users/students");
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const fetchCreateCourse = async (params) => {
  try {
    const { data } = await axiosInstance.post("/courses/", params);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const fetchGetAllCourses = async () => {
  try {
    const { data } = await axiosInstance.get("/courses/");
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const fetchGetCoursesById = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/courses/${id}`);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const fetchGetCourseById = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/course/${id}`);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const fetchGetCoursesByGroupId = async (groupId) => {
  try {
    console.log(groupId);
    const { data } = await axiosInstance.get(`/courses/group/${groupId}`);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const fetchCreateGroup = async (params) => {
  try {
    const { data } = await axiosInstance.post("/groups/", params);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const fetchCreateMaterial = async (params) => {
  try {
    const { data } = await axiosInstance.post("/materials/", params);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const fetchGetAllGroups = async () => {
  try {
    const { data } = await axiosInstance.get("/groups/");
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const fetchMaterialsByCourseId = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/materials/${id}`);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const fetchDeleteMaterialById = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`/materials/${id}`);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const fetchUpdateMaterialById = async (params, id) => {
  try {
    const { data } = await axiosInstance.patch(`/materials/${id}`, params);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const fetchUpdateStudentGroup = async (params, id) => {
  try {
    const { data } = await axiosInstance.patch(`/users/${id}`, params);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
