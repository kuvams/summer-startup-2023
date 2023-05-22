import './App.module.css';
import Header from "./common-components/Header/Header";
import Page from "./Pages/Page";
import s from "./App.module.css";
import {HashRouter} from "react-router-dom";

function App() {
  return (
      <HashRouter>
          <div className={s.app}>
              <Header/>
              <Page/>
          </div>
      </HashRouter>
  );
}

export default App;
