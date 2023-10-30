import axios from "../axios";

export const getHome = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/credit-price",
        method: "get",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const getCheck = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/invoice/",
        method: "get",
        params: { studentId: id },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
