import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateProfile from "./pages/CreateProfile";
import Home from "./Home";
import ProtectedRoute from "./components/ProtectedRoute";
export default function App() {
  return (
    <Routes>

      <Route path="/" element={<Landing />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

     <Route
  path="/create-profile"
  element={
    <ProtectedRoute>
      <CreateProfile />
    </ProtectedRoute>
  }
/>

<Route
  path="/home"
  element={
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  }
/>

    </Routes>
  );
}