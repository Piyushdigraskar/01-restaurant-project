import React, {Fragment} from "react";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";


function App() {
  return (
    <Fragment>
      <Header></Header>
      <main>
        <Meals></Meals>
      </main>
    </Fragment>
  );
}

export default App;
