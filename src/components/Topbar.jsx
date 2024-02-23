import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useSignOutAccount } from "../lib/reactQuery/queriesAndMutations";
import { useUserContext } from "../context/AuthContext";

const Topbar = () => {
  const { mutateAsync: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);

  return (
    <section className="topbar">
      <div className=" flex-between py-4 px-5">
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
        <div className=" flex gap-4 items-center">
          <button
            onClick={signOut}
            className=" p-1 rounded-full hover:bg-slate-800 transition-colors ease-in-out duration-200"
          >
            <MdLogout size={24} />
          </button>
          <Link to={`/profile/${user.id}`}>
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              className=" h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
