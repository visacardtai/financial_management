import "./App.css";
import { Route, Routes } from "react-router-dom";

import { Public, Home, Pay, Debt, Receipt, Pub } from "./containers/public";
import path from "./util/path";
import {
  HomeLec,
  PubLecturer,
  TeachingHours,
} from "./containers/public/lecturer";
import { PublicAd, HomeAd } from "./containers/system";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path={path?.HOME} element={<Pub />}></Route>

          <Route path={path?.PUBLIC} element={<Public />}>
            <Route path={path?.HOME} element={<Home />} />
            <Route path={path?.PAY} element={<Pay />} />
            <Route path={path?.DEBT} element={<Debt />} />
            <Route path={path?.RECEIPT} element={<Receipt />} />
          </Route>
          <Route path={path?.LECTURER} element={<PubLecturer />}>
            <Route path={path?.HOME} element={<HomeLec />} />
            <Route path={path?.TEACHINGHOURS} element={<TeachingHours />} />
          </Route>
          <Route path={path?.PUBLICAD} element={<PublicAd />}>
            <Route path={path?.HOME} element={<HomeAd />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
