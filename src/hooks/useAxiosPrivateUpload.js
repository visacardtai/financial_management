import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "../context/useAuth";
import { axiosPrivateUpload } from "../apis/axios";
import { useNavigate } from "react-router-dom";

const useAxiosPrivateUpload = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivateUpload.interceptors.request.use(
      (config) => {
        console.log(config.headers);
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivateUpload.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 417 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          console.log("Nguyen Tien Tai" + newAccessToken);
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivateUpload(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivateUpload.interceptors.request.eject(requestIntercept);
      axiosPrivateUpload.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivateUpload;
};

export default useAxiosPrivateUpload;
