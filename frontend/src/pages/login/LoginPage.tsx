import React from "react";
import { useNavigate } from "react-router-dom";


export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row justify-center w-full">
        <div className="shadow-lg p-5">
        <h3 className="font-sans font-semibold text-center text-xl">Property Management System</h3>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">

            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">
                Username
              </label>
              <input type="text" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Username" />
            </div>

            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">
                Password
              </label>
              <input type="password" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Password" />
            </div>
          </div>

          <button onClick={()=>navigate("home")} className="mt-4 w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
            Sign In
          </button>
          <p className="flex justify-center mt-6 text-sm text-slate-600">
            Don&apos;t have an account?
            <a href="#signup" className="ml-1 text-sm font-semibold text-slate-700 underline">
              Sign up
            </a>
          </p>
      </form>
        </div>
    </div>
  );
};
