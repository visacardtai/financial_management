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
