import axios from "../axios";
const token = localStorage.getItem("token");

export const apiGetInvoiceByStatus = (studentId, status) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/public/invoice/",
        method: "get",
        params: { studentId, status },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetExpensesByIdStudent = (studentId) =>
  new Promise(async (resolve, reject) => {
    try {
      // console.log(token);
      const response = await axios({
        // headers: {
        //   Authorization: `Bearer ${token}`,
        //   "Content-Type": "application/json",
        // },
        url: "/student/student-expenses/",
        method: "get",
        params: { studentId },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiPayment = (amount, invoiceId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/public/student/pay",
        method: "get",
        params: { amount, invoiceId },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetChartStudent = (axiosPrivate, studentId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPrivate.get("/student/invoice/chart", {
        params: { studentId },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
