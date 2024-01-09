import axios from "../axios";
const token = localStorage.getItem("token");

export const apiGetCreditPriceByStatus = (axiosPrivate, status) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.get("/expert/credit-price", {
        params: { status },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetAllBranch = (axiosPrivate) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.get("/expert/branch");
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiAddCreditPrice = (axiosPrivate, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.post(
        "/expert/credit-price",
        JSON.stringify(data)
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiDeleteCreditPrice = (axiosPrivate, data) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log("ahdsdsds " + data);
      const response = await axiosPrivate.delete("/expert/credit-price", {
        data,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// Api Expenses Price with role admin
export const apiGetExpPriceByStatus = (axiosPrivate, status) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.get("/expert/expenses-price", {
        params: { status },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetExpPriceNew = (axiosPrivate) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.get("/expert/expenses-price/news");
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiAddExPrice = (axiosPrivate, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.post(
        "/expert/expenses-price",
        JSON.stringify(data)
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiDeleteExPrice = (axiosPrivate, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.delete("/expert/expenses-price", {
        data,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// Api Targets with role admin
export const apiGetTargetsByStatus = (axiosPrivate, status) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.get("/expert/targets", {
        params: { status },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiAddTargets = (axiosPrivate, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.post(
        "/expert/targets",
        JSON.stringify(data)
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiDeleteTargets = (axiosPrivate, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.delete("/expert/targets", { data });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// Api LecturePrice with role admin
export const apiGetLecturePriceByStatus = (axiosPrivate, status) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.get("/lecturer/lecture-price", {
        params: { status },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiAddLecturePrice = (axiosPrivate, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.post(
        "/expert/lecture-price",
        JSON.stringify(data)
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiDeleteLecturePrice = (axiosPrivate, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.delete("/expert/lecture-price", {
        data,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// 9704198526191432198
// NGUYEN VAN A
// 07/15
