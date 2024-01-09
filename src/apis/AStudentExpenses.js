import { json } from "react-router-dom";
import axios from "../axios";

export const apiGetAllStudentExpenses = (axiosPrivate, status, state) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.get("/expert/student-expenses/alls", {
        params: { status, state },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetAllStudent = (axiosPrivate) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.get("/expert/student");
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetAllSemester = (axiosPrivate) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.get("/expert/semester");
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiCreateStudentExpenses = (axiosPrivate, dataAdd) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.post(
        "/expert/student-expenses",
        JSON.stringify(dataAdd)
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiEditStudentExpenses = (axiosPrivate, dataEdit) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.put(
        "/expert/student-expenses",
        JSON.stringify(dataEdit)
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiDeleteStudentExpenses = (axiosPrivate, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.delete("/expert/student-expenses", {
        data,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiCensorExpPrice = (axiosPrivate, data) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log(data);
      const response = await axiosPrivate.put(
        "/expert/expenses-price",
        JSON.stringify(data)
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiCensorStudentExp = (axiosPrivate, data) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log(data);
      const response = await axiosPrivate.put(
        "/expert/student-expenses/censor",
        JSON.stringify(data)
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiPayCensorStudentExp = (axiosPrivate, data) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log(data);
      const response = await axiosPrivate.put(
        "/expert/student-expenses/pay/censor",
        JSON.stringify(data)
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
