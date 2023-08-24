import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Tours from "./pages/Tours/Tours";

function App() {
  return (
    <div className="App-container">
      <BrowserRouter>
        <Navbar />
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tours" element={<Tours />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
