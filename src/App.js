import './App.module.css';
import {BrowserRouter} from "react-router-dom";
import Header from "./common-components/Header/Header";
import Page from "./Pages/Page";
import s from "./App.module.css";

function App() {
  return (
      <BrowserRouter>
          <div className={s.app}>
              <Header/>
              <Page/>
          </div>
      </BrowserRouter>
  );
}

export default App;
