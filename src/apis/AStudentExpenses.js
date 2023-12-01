import axios from "../axios";

export const apiGetAllStudentExpenses = (status, state) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/student-expenses/alls",
        method: "get",
        params: { status, state },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetAllStudent = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/student",
        method: "get",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetAllSemester = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/semester",
        method: "get",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiCreateStudentExpenses = (
  name,
  itemStudent,
  itemSemester,
  data
) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/student-expenses",
        method: "post",
        data: {
          name,
          student_id: itemStudent,
          semester_id: itemSemester,
          details: data,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiEditStudentExpenses = (
  id,
  name,
  itemStudent,
  itemSemester,
  different
) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/student-expenses",
        method: "put",
        data: {
          id,
          name,
          student_id: itemStudent,
          semester_id: itemSemester,
          details: different,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiDeleteStudentExpenses = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/student-expenses",
        method: "delete",
        data: data,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
