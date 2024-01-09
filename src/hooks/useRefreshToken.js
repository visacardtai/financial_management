import axios from "../apis/axios";
import useAuth from "../context/useAuth";
import { axiosPrivate } from "../apis/axios";
import { useNavigate } from "react-router-dom";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const refresh = async () => {
    try {
      const response = await axiosPrivate.post("/auth/refresh-token");
      setAuth((prev) => {
        console.log(JSON.stringify(prev));
        console.log(response.data.accessToken);
        return { ...prev, accessToken: response.data.accessToken };
      });
      return response.data.accessToken;
    } catch (error) {
      navigate("/", { replace: true });
      return Promise.reject(error);
    }
  };
  return refresh;
};

export default useRefreshToken;
