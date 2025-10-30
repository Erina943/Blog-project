import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./components/Login";
import List from "./components/List";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
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
