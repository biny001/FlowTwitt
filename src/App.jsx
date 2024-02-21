import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpForm from "./_auth/Form/SignUpForm";
import SignInForm from "./_auth/Form/SignInForm";
import LoginLayout from "./_auth/LoginLayout";
import AppLayout from "./components/AppLayout";
import Home from "./Pages/Home";

const App = () => {
  return (
    <Routes>
      {/* Public */}
      <Route element={<LoginLayout />}>
        <Route
          path="/sign-up"
          element={<SignUpForm />}
        />
        <Route
          path="/sign-in"
          element={<SignInForm />}
        />
      </Route>
      {/* private */}
      <Route element={<AppLayout />}>
        <Route
          index
          path="/"
          element={<Home />}
        />
      </Route>
    </Routes>
  );
};

export default App;
