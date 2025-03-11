import { HttpStatusCode } from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginDto, LoginRequestDto } from "~/dto/login";
import { LOGIN_USER } from "../../services/login";
import { LoginActions } from "../../store/slices/LoginSlice";
import { useDispatch } from "react-redux";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState<string>("");
  const [formLoader, setFormLoader] = React.useState<boolean>(false);
  const initialForm = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = React.useState<LoginRequestDto>(initialForm);
  return (
    <div className="flex flex-row justify-center w-full">
  
      <div className="shadow-lg p-5">
      <p className="flex justify-center mt-6 text-sm font-semibold text-red-500 mb-3">
        {error}
      </p>
        <h3 className="font-sans font-semibold text-center text-xl ">
          Property Management System
        </h3>

        {/* START OF LOGIN FORM */}
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={(e) =>
            onSubmit(e)(
              formData,
              //FormNotification,
              setFormLoader,
              setFormData,
              navigate,
              dispatch,
              setError,
              initialForm
            )
          }
        >
          {/* START OF LOGIN FORM FIELDS */}
          <div className="mb-1 flex flex-col gap-6">
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">
                Username
              </label>
              <input
                onChange={(event: any) => {
                  setFormData((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }));
                }}
                required
                type="text"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Username"
              />
            </div>

            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">
                Password
              </label>
              <input
                onChange={(event: any) => {
                  setFormData((prev) => ({
                    ...prev,
                    password: event.target.value,
                  }));
                }}
                required
                type="password"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Password"
              />
            </div>
          </div>
          {/* END OF LOGIN FORM FIELDS */}

          {/* START OF ACTION BUTTONS */}
          <button
            className="mt-4 w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="submit"
          >
            Sign In
          </button>
          <p className="flex justify-center mt-6 text-sm text-slate-600">
            Don&apos;t have an account?
            <a
              role="button"
              className="ml-1 text-sm font-semibold text-slate-700 underline"
              onClick={() => navigate("register")}
            >
              Sign up
            </a>
          </p>
          {/* END OF ACTION BUTTONS */}
        </form>
        {/* END OF LOGIN FORM */}
      </div>
    </div>
  );
};

function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  return async function (
    data: LoginRequestDto,
    setLoader: (status: boolean) => void,
    setFormData: (data: LoginRequestDto) => void,
    navigate: (value: any) => void,
    dispatch: (value: any) => void,
    setError: (value: any) => void,
    initialFormData: LoginRequestDto
  ) {
    e.preventDefault();
    try {
      setLoader(true);
      const response = await LOGIN_USER({ data });
      const loginResponse: LoginDto = response.data;
      if (loginResponse?.access_token !== undefined) {
        if (loginResponse?.access_token !== null) {
          dispatch(LoginActions.setToken(JSON.stringify(loginResponse)));
          navigate("/home");
          setFormData(initialFormData);
        } else {
          setError("Something went wrong, Please contact administrator")
          // console.log("Contact Administrator", HttpStatusCode.InternalServerError);
        }
      } else {
        setError("user not found")
        // console.log("Error occured", HttpStatusCode.NotFound);
      }
    } catch (error: any) {
      // console.log('error :',error);

      if (typeof error?.response?.data !== "object") {
        setError(error?.response?.data)
        //   await notification(NotificationEnum.error, error?.response?.data);
      } else {
        if (error?.response?.data?.message !== undefined) {
          setError(error?.response?.data?.message)
          // await notification(
          //   NotificationEnum.error,
          //   error?.response?.data?.message
          // );
        } else {
          setError(error?.response?.data?.error)
          // await notification(
          //   NotificationEnum.error,
          //   error?.response?.data?.error
          // );
        }
      }
      setLoader(false);
    } finally {
      setTimeout(() => {
        setError("")
      }, 2000);
      setLoader(false);
    }
  };
}
