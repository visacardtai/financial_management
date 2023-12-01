import axios from "../axios";

export const apiGetNewTPByIdLecture = (lecturerId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/teaching-period/",
        method: "get",
        params: { lecturerId },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetAllTPByIdLecture = (lecturerId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/teaching-period/all",
        method: "get",
        params: { lecturerId },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetAllClassCoefficient = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/class-coefficient",
        method: "get",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetDataChartLecture = (lecturerId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/chart-lecture/subject/",
        method: "get",
        params: { lecturerId },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetAllTargets = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/targets",
        method: "get",
        params: { status: true },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetAllLecturePrice = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/lecture-price",
        method: "get",
        params: { status: true },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
