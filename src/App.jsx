import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpForm from "./_auth/Form/SignUpForm";
import SignInForm from "./_auth/Form/SignInForm";
import LoginLayout from "./_auth/LoginLayout";
import AppLayout from "./components/AppLayout";
import Home from "./Pages/Home";
import Explore from "./Pages/Explore";
import Saved from "./Pages/Saved";
import AllUsers from "./Pages/AllUsers";
import CreatePost from "./Pages/CreatePost";
import EditPost from "./Pages/EditPost";
import PostDetails from "./Pages/PostDetails";
import Profile from "./Pages/Profile";
import UpdateProfile from "./Pages/UpdateProfile";

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
        <Route
          path="/explore"
          element={<Explore />}
        />
        <Route
          path="/saved"
          element={<Saved />}
        />
        <Route
          path="/all-users"
          element={<AllUsers />}
        />
        <Route
          path="/create-post"
          element={<CreatePost />}
        />
        <Route
          path="/update-post/:id"
          element={<EditPost />}
        />
        <Route
          path="/posts/:id"
          element={<PostDetails />}
        />
        <Route
          path="/profile/:id/*"
          element={<Profile />}
        />
        <Route
          path="/update-profile/:id"
          element={<UpdateProfile />}
        />
      </Route>
    </Routes>
  );
};

export default App;
