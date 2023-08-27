import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Tours from "./pages/Tours/Tours";
import Tour from "./pages/Tour/Tour";
import Login from "./pages/Login/Login";

import { useAuthContext } from "./hooks/useAuthContext";
function App() {
  const { user } = useAuthContext();
  return (
    <div className="App-container">
      <BrowserRouter>
        <Navbar />
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/tours"
              element={user ? <Tours /> : <Navigate to="/login" />}
            />
            <Route
              path="/tours/:tourId"
              element={user ? <Tour /> : <Navigate to="/login" />}
            />

            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
