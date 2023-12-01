import actionTypes from "./actionTypes";

export const checkRedux = (flag) => ({
  type: actionTypes.HOME,
  flag,
});

export const isLogin = (flag) => ({
  type: actionTypes.ISLOGIN,
  flag,
});
