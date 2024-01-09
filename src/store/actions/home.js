import actionTypes from "./actionTypes";

export const checkRedux = (flag) => ({
  type: actionTypes.HOME,
  flag,
});

export const isLogin = (flag) => ({
  type: actionTypes.ISLOGIN,
  flag,
});

export const setRole = (data) => ({
  type: actionTypes.SETROLE,
  data,
});

export const refreshBe = (flag) => ({
  type: actionTypes.REFRESHFE,
  flag,
});

export const setIdUser = (data) => ({
  type: actionTypes.IDUSER,
  data,
});

export const setInfoUser = (data) => ({
  type: actionTypes.INFOUSER,
  data,
});

export const setDataCalculate = (data) => ({
  type: actionTypes.DATACALCULATE,
  data,
});

export const loading = (flag) => ({
  type: actionTypes.LOADING,
  flag,
});
