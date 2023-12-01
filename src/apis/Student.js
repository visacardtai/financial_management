import axios from "../axios";

export const apiGetInvoiceByStatus = (studentId, status) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/invoice/",
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
      const response = await axios({
        url: "/student-expenses/",
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
        url: "/pay",
        method: "get",
        params: { amount, invoiceId },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
