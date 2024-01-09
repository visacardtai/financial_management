import appReducer from "./appReducer";
import { combineReducers } from "redux";
// import musicReducer from "./musicReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const commonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const appConfig = {
  ...commonConfig,
  key: "app",
  whitelist: ["role", "idUser", "infoUser"],
};

const rootReducer = combineReducers({
  app: persistReducer(appConfig, appReducer),
});

export default rootReducer;
