import actionTypes from "../actions/actionTypes";

const initState = {
  isLoading: false,
  infoUser: {},
  idUser: null,
  refreshBe: false,
  role: [],
  home: false,
  isLogin: false,
  isBlur: false,
  typeBlur: -1,
  typeDelete: null,
  studentExpenses: null,
  editInvoice: null,
  editTeachingPeriod: null,
  listDelete: [],
  typeUpload: null,
  dataCalculate: {},
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SETROLE:
      return { ...state, role: action.data || [] };
    case actionTypes.REFRESHFE:
      return { ...state, refreshBe: action.flag };
    case actionTypes.INFOUSER:
      return { ...state, infoUser: action.data };
    case actionTypes.IDUSER:
      return { ...state, idUser: action.data };
    case actionTypes.ISLOGIN:
      return {
        ...state,
        isLogin: action.flag,
      };
    case actionTypes.ISBLUR:
      return { ...state, isBlur: action.flag };
    case actionTypes.TYPEDELETE:
      return { ...state, typeDelete: action.flag || null };
    case actionTypes.LISTDELETE:
      return { ...state, listDelete: action.list || [] };
    case actionTypes.TYPEBLUR:
      return { ...state, typeBlur: action.flag };
    case actionTypes.HOME:
      return { ...state, home: action.flag };
    case actionTypes.EDITSTUDENTEXPENSES:
      return { ...state, studentExpenses: action.data || null };
    case actionTypes.EDITINVOICE:
      return { ...state, editInvoice: action.data || null };
    case actionTypes.EDITTEACHINGPERIOD:
      return { ...state, editTeachingPeriod: action.data || null };
    case actionTypes.TYPEUPLOAD:
      return { ...state, typeUpload: action.data };
    case actionTypes.DATACALCULATE:
      return { ...state, dataCalculate: action.data };
    case actionTypes.LOADING:
      return {
        ...state,
        isLoading: action.flag,
      };
    default:
      return state;
  }
};

export default appReducer;
