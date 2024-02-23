import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useState } from "react";
import {
  CreateAccountMutation,
  useSignInAccount,
} from "../../lib/reactQuery/queriesAndMutations";
import { useUserContext } from "../../context/AuthContext";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync: createAccount, isPending: isLoading } =
    CreateAccountMutation();
  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccount();
  const { checkAuthUser, isPending: isUserLoading } = useUserContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function onSubmit(data) {
    const newUser = await createAccount(data);

    if (!newUser) {
      return console.log("Unable to sign up");
    }

    const session = await signInAccount(data);

    if (!session) {
      return console.log("sign-in failed please try again");
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      reset();
      navigate("/");
    } else {
      return console.log("cant login. please try again");
    }
  }

  return (
    <div className="flex items-end">
      <form
        className="md:min-w-96 md:px-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center mb-6 md:flex-row">
          <img
            src="src\assets\logo.png"
            className="w-32 h-32"
            alt="Logo"
          />
          <h1 className="text-3xl">TwittFlow</h1>
        </div>
        <h2 className=" text-xl px-2 mb-4">Create a new Account</h2>
        <div className="label">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="input"
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>
        <div className="label">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="input"
            {...register("username", {
              required: "Username is required",
            })}
          />
          {errors.username && (
            <p className="error">{errors.username.message}</p>
          )}
        </div>
        <div className="label">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="input"
            {...register("email", {
              required: "Email is required",
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <div className="label">
          <label htmlFor="password">Password</label>
          <div className=" flex items-center relative  ">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="input"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message:
                    "Password must have at least one uppercase letter, one digit, and be at least 8 characters long.",
                },
              })}
            />
            <p
              className=" bg-transparent absolute right-2 cursor-pointer"
              onClick={() => setShowPassword((pass) => !pass)}
            >
              {showPassword ? <IoEye /> : <IoEyeOff />}
            </p>
          </div>
          {errors.password && (
            <p className=" error">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="mb-3 w-full py-2 mt-4 text-white bg-primary-500 rounded-md hover:bg-primary-600"
        >
          {isLoading ? "Creating Account..." : "Sign Up"}
        </button>
        <p className="py-3 text-sm text-slate-200 ">
          Already have an account?{" "}
          <Link
            className="underline text-blue-300"
            to="/sign-in"
          >
            Log In
          </Link>
        </p>
      </form>
      <div className="hidden md:block  transition-all ease-in-out">
        <img
          className="w-[400px]"
          src="src\assets\Design inspiration-pana.png"
          alt="Design inspiration"
        />
      </div>
    </div>
  );
};

export default SignUpForm;
