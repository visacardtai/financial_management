import axios from "../axios";
const token = localStorage.getItem("token");

export const apiGetNewTPByIdLecture = (axiosPrivate, lecturerId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.get("/lecturer/teaching-period/", {
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
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        url: "/lecturer/teaching-period/all",
        method: "get",
        params: { lecturerId },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetAllClassCoefficient = (axiosPrivate) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.get("/expert/class-coefficient");
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetDataChartLecture = (axiosPrivate, lecturerId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.get(
        "/lecturer/chart-lecture/subject/",
        { params: { lecturerId } }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetAllTargets = (axiosPrivate) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.get("/expert/targets", {
        params: { status: true },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetAllLecturePrice = (axiosPrivate) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.get("/lecturer/lecture-price", {
        params: { status: true },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
