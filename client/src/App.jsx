// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import PrivateRoute from "./components/PrivatRoute";
import Dashboard from "./pages/Dashboard";

function App() {

  return (
    <div>
      <BrowserRouter>
        {/* navbar */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute>
            <Dashboard />
          </PrivateRoute>
          } />
        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App
