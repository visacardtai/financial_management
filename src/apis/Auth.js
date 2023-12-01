import axios from "../axios";

export const apiLogin = (username, password) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/auth/authenticate",
        method: "post",
        data: { username, password },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
