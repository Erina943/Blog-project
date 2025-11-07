import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import List from "./components/List";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

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
