import React from "react";
import { useNavigate } from "react-router-dom";
import { LoginDto, LoginRequestDto, tokenSuccessDto } from "~/dto/login";
import { LOGIN_USER } from "../../services/login";
import { LoginActions } from "../../store/slices/LoginSlice";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { Bounce, toast } from "react-toastify";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [_, setFormLoader] = React.useState<boolean>(false);
  const initialForm = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = React.useState<LoginRequestDto>(initialForm);
  return (
    <div className="flex flex-row justify-center w-full">
      <div className="shadow-lg p-5">
        <h3 className="font-sans font-semibold text-center text-xl ">
          Property Management System
        </h3>

        {/* START OF LOGIN FORM */}
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={(e) =>
            onSubmit(e)(
              formData,
              // FormNotification,
              setFormLoader,
              setFormData,
              navigate,
              dispatch,
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
    // notification: (type: string, message: string) => any,
    setLoader: (status: boolean) => void,
    setFormData: (data: LoginRequestDto) => void,
    navigate: (value: any) => void,
    dispatch: (value: any) => void,
    initialFormData: LoginRequestDto
  ) {
    e.preventDefault();
    try {
      setLoader(true);
      const response = await LOGIN_USER({ data });
      const loginResponse: LoginDto = response.data;
      if (loginResponse?.access_token !== undefined) {
        if (loginResponse?.access_token !== null) {
          const data: tokenSuccessDto = jwtDecode(loginResponse?.access_token);
          dispatch(LoginActions.setToken(JSON.stringify(loginResponse)));
          setFormData(initialFormData);

          navigate("/home");
          toast.success(`Welcome ${data.iss}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        } else {
          toast.error(`Something went wrong, Please contact administrator`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      } else {
        toast.error(`user not found`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error: any) {
      if (typeof error?.response?.data !== "object") {
        toast.error(error?.response?.data, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        if (error?.response?.data?.message !== undefined) {
          toast.error(error?.response?.data?.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        } else {
          toast.error(error?.response?.data?.error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      }
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };
}
