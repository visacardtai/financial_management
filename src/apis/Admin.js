import axios from "../axios";

export const apiGetCreditPriceByStatus = (status) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/credit-price",
        method: "get",
        params: { status },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetAllBranch = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/branch",
        method: "get",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiAddCreditPrice = (name, study, price, itemBranch) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/credit-price",
        method: "post",
        data: { name, price, type: study, branch_id: itemBranch },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiDeleteCreditPrice = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/credit-price",
        method: "delete",
        data: data,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// Api Expenses Price with role admin
export const apiGetExpPriceByStatus = (status) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/expenses-price",
        method: "get",
        params: { status },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiAddExPrice = (name, price, description) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/expenses-price",
        method: "post",
        data: { name, price, description },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiDeleteExPrice = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/expenses-price",
        method: "delete",
        data: data,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// Api Targets with role admin
export const apiGetTargetsByStatus = (status) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/targets",
        method: "get",
        params: { status },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiAddTargets = (name, quantity, description) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/targets",
        method: "post",
        data: { name, quantity, description },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiDeleteTargets = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/targets",
        method: "delete",
        data: data,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// Api LecturePrice with role admin
export const apiGetLecturePriceByStatus = (status) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/lecture-price",
        method: "get",
        params: { status },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiAddLecturePrice = (name, coefficient, price, description) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/lecture-price",
        method: "post",
        data: { name, basic_price: price, coefficient, description },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiDeleteLecturePrice = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/lecture-price",
        method: "delete",
        data: data,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
