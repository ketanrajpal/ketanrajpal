import { Switch, BrowserRouter, Route } from "react-router-dom";
import "./scss/app.scss";

import HeaderComponent from "./components/header";
import FooterComponent from "./components/footer";

import HomeComponent from "./components/home";

const app = () => {
  return (
    <div className="container">
      <HeaderComponent />
      <div className="content">
        <BrowserRouter>
          <Switch>
            <Route path="*" component={HomeComponent} />
          </Switch>
        </BrowserRouter>
      </div>
      <FooterComponent />
    </div>
  );
};

export default app;
