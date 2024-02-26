import React, { useEffect } from "react";
import { NavLink, useNavigate, useLocation, Link } from "react-router-dom";
import { useUserContext } from "../context/AuthContext";
import { useSignOutAccount } from "../lib/reactQuery/queriesAndMutations";
import { sidebarLinks } from "../constants/index";
import { MdLogout } from "react-icons/md";

const LeftSideBar = () => {
  const { pathname } = useLocation();
  const { mutateAsync: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);
  return (
    <nav className="leftsidebar">
      <div className=" flex flex-col gap-11">
        <Link
          className="flex gap-3 items-center"
          to="/"
        >
          <div className=" flex space-x-2 items-center">
            <img
              src="src\assets\logo.png"
              alt="logo"
              width={50}
              height={75}
            />
            <h1 className=" font-bold text-xl">TwittFlow</h1>
          </div>
        </Link>
        <Link
          to={`/profile/${user?.id}`}
          className=" flex gap-3 items-center"
        >
          <img
            to={`/profile/${user?.id}`}
            src={user?.imageUrl || "/assets/icons/profile-placeholder.svg"}
            className=" h-8 w-8 rounded-full"
          />
          <div className=" flex flex-col ">
            <p className="body-bold">{user?.name}</p>
            <p className="small-regular text-light-3">@{user?.username}</p>
          </div>
        </Link>

        <ul className=" flex flex-col gap-6">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={` group leftsidebar-link flex ${
                  isActive && "bg-primary-500"
                }`}
              >
                <NavLink
                  className="flex gap-4 items-center p-4"
                  to={link.route}
                >
                  <img
                    src={link.imgURL}
                    className={` group-hover:invert group-hover:brightness-0 transition 
                      ${isActive && "invert-white"}
                    `}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
        <button
          onClick={signOut}
          className=" flex items-center space-x-4 px-5 py-3 rounded-md hover:bg-slate-800 transition-colors ease-in-out duration-200"
        >
          <MdLogout size={24} />
          <p className=" small-medium lg:base-medium">Logout</p>
        </button>
      </div>
    </nav>
  );
};

export default LeftSideBar;
