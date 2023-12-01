import actionTypes from "../actions/actionTypes";

const initState = {
  home: false,
  isLogin: false,
  isBlur: false,
  typeBlur: -1,
  typeDelete: null,
  studentExpenses: null,
  editInvoice: null,
  editTeachingPeriod: null,
  listDelete: [],
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ISLOGIN:
      return {
        ...state,
        isLogin: action.flag,
      };
    // case actionTypes.GET_HOME:
    //   return {
    //     ...state,
    //     // banner:
    //     //   action.homeData?.find((item) => item.sectionId === "hSlider")
    //     //     ?.items || null,
    //     banner: action.homeData.slice(0, 5) || null,
    //     Friday: action.homeData.slice(6, 11) || null,
    //     hArtistTheme: action.homeData.slice(12, 17) || null,
    //     hEditorTheme: action.homeData?.slice(18, 23) || null,

    //     h100: action.homeData.slice(24, 29) || null,
    //     hAlbum: action.homeData.slice(30, 35) || null,
    //   };
    // case actionTypes.NEW_RELEASE:
    //   return {
    //     ...state,
    //     newRelease: action.newrelease || {},
    //   };
    // case actionTypes.LOADING:
    //   return {
    //     ...state,
    //     isLoading: action.flag,
    //   };
    // case actionTypes.NEW_SONG:
    //   return {
    //     ...state,
    //     newSong: action.newsong || {},
    //   };
    // case actionTypes.ALBUM:
    //   return {
    //     ...state,
    //     album: action.album || {},
    //   };
    // case actionTypes.GENRE:
    //   return {
    //     ...state,
    //     genre: action.genre || {},
    //   };
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
    default:
      return state;
  }
};

export default appReducer;
