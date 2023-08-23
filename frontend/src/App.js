import { BrowserRouter, Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Pane from "./components/Pane/Pane";

function App() {
  return (
    <div className="App-container">
      <BrowserRouter>
        <Navbar />
        <div className="App">
          <Hero />
          <Pane title={"Latest Tour's"} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
