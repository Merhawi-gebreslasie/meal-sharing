import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./Home";
import About from "./components/menu/About";
import ReserveForSpecificMeal from "./components/reserve/ReserveForSpecificMeal";
import MealsPage from "./components/meal/MealsPage";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/meals/:id" component={ReserveForSpecificMeal} />
            <Route exact path="/meals" component={MealsPage} />
          </Switch>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
