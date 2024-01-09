import axios from "../axios";

export const apiGetAllInvoice = (axiosPrivate, status, state) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.get("/expert/invoice/alls", {
        params: { status, state },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetAllSubjcet = (axiosPrivate) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.get("/expert/subject");
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiCreateInvoice = (axiosPrivate, dataAdd) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.post(
        "/expert/invoice",
        JSON.stringify(dataAdd)
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiEditInvoice = (axiosPrivate, dataEdit) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.put(
        "/expert/invoice",
        JSON.stringify(dataEdit)
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiDeleteInvoice = (axiosPrivate, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.delete("/expert/invoice", { data });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiCensorCreditPrice = (axiosPrivate, data) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log(data);
      const response = await axiosPrivate.put(
        "/expert/credit-price",
        JSON.stringify(data)
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiCensorInvoice = (axiosPrivate, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.put(
        "/expert/invoice/censor",
        JSON.stringify(data)
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiChartInvoice = (axiosPrivate, semester_id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.get("/expert/invoice/chart", {
        params: { semester_id },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
