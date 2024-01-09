import axios from "../axios";

export const apiLogin = (username, password) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        headers: {
          "Content-Type": "application/json",
        },
        // withCredentials: true,
        url: "/auth/authenticate",
        method: "post",
        data: { username, password },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// export const apiRefreshToken = () =>
//   new Promise(async (resolve, reject) => {
//     try {
//       const response = await axios({
//         url: "/auth/refresh-token",
//         method: "post",
//       });
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }
//   });
