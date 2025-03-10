import { HttpStatusCode } from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { UserDto, UserRequestDto } from "~/dto/user";
import { CREATE_USER } from "../../services/user";

export const RegisterAccount: React.FC = () => {
  const navigate = useNavigate();
  const [formLoader, setFormLoader] = React.useState<boolean>(false);
  const handliOnClickCancel = () => setFormData(initialForm);
  const initialForm = {
    email: "",
    first_name: "",
    last_name: "",
    address: "",
    password: "",
  };

  const [formData, setFormData] = React.useState<UserRequestDto>(initialForm);
  return (
    <div className="flex flex-row justify-center w-full">
      <div className="shadow-lg p-5">
        <h3 className="font-sans font-semibold text-center text-xl">
          Register Account
        </h3>

        {/* START OF ACCOUNT REGISTRATION FORM */}
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={(e) =>
            onSubmit(e)(
              formData,
              //   FormNotification,
              setFormLoader,
              setFormData,
              navigate,
              initialForm
            )
          }
        >

          {/* START OF ACCOUNT REGISTRATION FORM FIELDS */}
          <div className="mb-1 flex flex-col gap-6">
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">
                First Name
              </label>
              <input
                onChange={(event: any) => {
                  setFormData((prev) => ({
                    ...prev,
                    first_name: event.target.value,
                  }));
                }}
                required
                type="text"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Enter first name"
              />
            </div>

            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">
                Last Name
              </label>
              <input
                onChange={(event: any) => {
                  setFormData((prev) => ({
                    ...prev,
                    last_name: event.target.value,
                  }));
                }}
                required
                type="text"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Enter last name"
              />
            </div>

            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">Email</label>
              <input
                onChange={(event: any) => {
                  setFormData((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }));
                }}
                required
                type="email"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Enter email"
              />
            </div>

            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">
                Address
              </label>
              <input
                onChange={(event: any) => {
                  setFormData((prev) => ({
                    ...prev,
                    address: event.target.value,
                  }));
                }}
                required
                type="text"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Enter address"
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
          {/* END OF ACCOUNT REGISTRATION FORM FIELDS */}

          {/* START OF ACTION BUTTONS */}
          <div className="flex flex-row justify-center gap-5">
            <button
              className="mt-4 w-full rounded-md bg-green-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
            >
              Register
            </button>

            <button
              className="mt-4 w-full rounded-md bg-slate-800 opacity-70 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={handliOnClickCancel}
            >
              Reset
            </button>
          </div>
          <p className="flex justify-center mt-6 text-sm text-slate-600">
            Already have an account?
            <a
              role="button"
              className="ml-1 text-sm font-semibold text-slate-700 underline"
              onClick={() => navigate("/")}
            >
              Sign in
            </a>
          </p>
         {/* END OF ACTION BUTTONS */}
        </form>
        {/* END OF ACCOUNT REGISTRATION FORM */}
      </div>
    </div>
  );
};

function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  return async function (
    data: UserRequestDto,
    //   notification: (type: string, message: string) => any,
    setLoader: (status: boolean) => void,
    setFormData: (data: UserRequestDto) => void,
    navigate: (value: any) => void,
    initialFormData: UserRequestDto
  ) {
    e.preventDefault();
    try {
      setLoader(true);
      console.log("body :", data);

      const response = await CREATE_USER({ data });
      const savedUser: UserDto = response.data;
      if (savedUser?.user_id !== undefined) {
        navigate("/");
        setFormData(initialFormData);
      } else {
        console.log("Error occured", HttpStatusCode.NotFound);
      }
    } catch (error: any) {
      // console.log('error :',error);

      if (typeof error?.response?.data !== "object") {
        //   await notification(NotificationEnum.error, error?.response?.data);
      } else {
        if (error?.response?.data?.message !== undefined) {
          // await notification(
          //   NotificationEnum.error,
          //   error?.response?.data?.message
          // );
        } else {
          // await notification(
          //   NotificationEnum.error,
          //   error?.response?.data?.error
          // );
        }
      }
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };
}
