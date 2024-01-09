import actionTypes from "./actionTypes";

export const checkBlur = (flag) => ({
  type: actionTypes.ISBLUR,
  flag,
});

export const changeTypeBlur = (flag) => ({
  type: actionTypes.TYPEBLUR,
  flag,
});

export const changeTypeDelete = (flag) => ({
  type: actionTypes.TYPEDELETE,
  flag,
});

export const listDelete = (list) => ({
  type: actionTypes.LISTDELETE,
  list,
});

export const getDataEditStudentExp = (data) => ({
  type: actionTypes.EDITSTUDENTEXPENSES,
  data,
});

export const getDataEditInvoice = (data) => ({
  type: actionTypes.EDITINVOICE,
  data,
});

export const getDataEditTeachingPeriod = (data) => ({
  type: actionTypes.EDITTEACHINGPERIOD,
  data,
});

// upload file excel
export const setTypeUpload = (data) => ({
  type: actionTypes.TYPEUPLOAD,
  data,
});
