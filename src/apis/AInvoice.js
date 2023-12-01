import axios from "../axios";

export const apiGetAllInvoice = (status, state) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/invoice/alls",
        method: "get",
        params: { status, state },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetAllSubjcet = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/subject",
        method: "get",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiCreateInvoice = (
  name,
  itemStudent,
  itemSemester,
  expiration,
  data
) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/invoice",
        method: "post",
        data: {
          name,
          student_id: itemStudent,
          semester_id: itemSemester,
          expiration_date: expiration,
          details: data,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiEditInvoice = (
  id,
  name,
  itemStudent,
  itemSemester,
  expiration,
  listDelete,
  data
) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/invoice",
        method: "put",
        data: {
          id,
          name,
          student_id: itemStudent,
          semester_id: itemSemester,
          expiration_date: expiration,
          listDelete,
          details: data,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiDeleteInvoice = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/invoice",
        method: "delete",
        data: data,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
