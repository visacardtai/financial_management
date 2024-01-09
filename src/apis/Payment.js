import axios from "../axios";

export const apiUpdateHistoryPayment = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/public/student/vnpay_jsp/vnpay_return" + data,
        method: "get",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
