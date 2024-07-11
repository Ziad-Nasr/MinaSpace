import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Add from "./Components/Add";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/Add" element={<Add />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
