import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import List from "./components/List";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/list"
        element={
          <ProtectedRoute>
            <List />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
