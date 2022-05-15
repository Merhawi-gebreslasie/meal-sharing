import React from "react";
import Header from "./components/menu/Header";

import MealList from "./components/home/MealList";
function Home() {
  return (
    <div>
      <Header />
      <MealList />
    </div>
  );
}

export default Home;
