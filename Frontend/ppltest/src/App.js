import "./App.css";
import "./bootstrap-responsive.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Nav from "./components/Navbar/Nav";
import Footer from "./components/Footer/Footer";
import Welcome from "./components/Welcome/Welcome";
import Timeline from "./components/Timeline/Timeline";
import Single_Post from "./components/Single_Post/Single_post";
import { withRouter } from "react-router-dom";
import ScrollToTop from "./components/Scroll_top/Scroll_top";
import Reset_password from "./components/ResetPassword/Reset_password";
import AppWrapper from "./components/AppWrapper /AppWrapper";

function App() {
  return (
    <Router>
      <ScrollToTop>
        <Nav />

        <Switch>
          <Route path="/" exact component={Register} />
          <Route path="/Login" component={Login} />
          
          <Route path="/Timeline" exact component={AppWrapper} />
          <Route path="/Timeline/:Number" component={AppWrapper} />
          <Route path="/reset/:token" component={Reset_password} />
        </Switch>
        <Footer />
      </ScrollToTop>
    </Router>
  );
}

export default App;
