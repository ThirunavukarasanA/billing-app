import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Labour from "./Components/Bill/Labour";
import Login from "./Components/Login";
import Home from "./Components/Home";

function App() {
  console.log(localStorage.token);
  return (
    <div>
      <Router>
        {localStorage.token !== null && localStorage.token !== undefined ? (
          <Routes>
            <Route path="labour" element={<Labour />} />
          </Routes>
        ) : (
          <Routes>
            {/* <Route exact path="/" element={<Home />} /> */}
            <Route exact path="/" element={<Login />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
