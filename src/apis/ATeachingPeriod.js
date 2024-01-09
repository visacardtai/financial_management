import axios from "../axios";

export const apiGetAllTeachingPeriod = (axiosPrivate, status, is_used) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.get("/expert/teaching-period/alls", {
        params: { status, is_used },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetAllLecturer = (axiosPrivate) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.get("/expert/lecturer");
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiCreateTeachingPeriod = (axiosPrivate, dataAdd) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.post(
        "/expert/teaching-period",
        JSON.stringify(dataAdd)
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiEditTeachingPeriod = (axiosPrivate, dataEdit) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.put(
        "/expert/teaching-period",
        JSON.stringify(dataEdit)
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiDeleteTeachingPeriod = (axiosPrivate, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.delete("/expert/teaching-period", {
        data,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiCensorLecPrice = (axiosPrivate, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.put(
        "/expert/lecture-price",
        JSON.stringify(data)
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiCensorTargets = (axiosPrivate, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.put(
        "/expert/targets",
        JSON.stringify(data)
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiCensorTeachingPeriod = (axiosPrivate, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.put(
        "/expert/teaching-period/censor",
        JSON.stringify(data)
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiAddTPExcel = (axiosPrivateUpload, data, typeUpload) =>
  new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append("file", data);
      const path =
        typeUpload === 1
          ? "/expert/invoice/upload"
          : typeUpload === 2
          ? "/expert/student-expenses/upload"
          : "/expert/teaching-period/upload";
      const response = await axiosPrivateUpload.post(path, formData);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiAddAttendance = (axiosPrivate, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.post(
        "/teaching-details-sub",
        JSON.stringify(data)
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiChartTeachingPeriod = (axiosPrivate, semester_id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.get("/expert/teaching-period/chart", {
        params: { semester_id },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
