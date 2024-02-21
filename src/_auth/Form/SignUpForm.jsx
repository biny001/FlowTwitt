import React from "react";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  return (
    <div className=" flex  items-end  ">
      <form className=" md:min-w-96 md:px-3">
        <div className=" flex flex-col items-center mb-6     md:flex-row">
          <img
            src="src\assets\logo.png"
            className=" w-32 h-32"
          />
          <h1 className=" text-3xl">TwittFlow</h1>
        </div>
        <div className=" label">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="input"
          />
        </div>
        <div className="label">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="input"
          />
        </div>
        <div className="label">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="input"
          />
        </div>
        <div className="label">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="input"
          />
        </div>

        <button
          type="submit"
          className=" mb-3 w-full py-2 mt-4 text-white bg-primary-500 rounded-md hover:bg-primary-600"
        >
          Sign up
        </button>
        <p className="py-3 text-sm text-slate-200 ">
          Already have an account?{" "}
          <Link
            className=" underline text-blue-300"
            to="/sign-in"
          >
            Log In
          </Link>
        </p>
      </form>
      <div className=" hidden md:block  transition-all ease-in-out">
        <img
          className=" w-[400px]"
          src="src\assets\Design inspiration-pana.png"
        />
      </div>
    </div>
  );
};

export default SignUpForm;
