import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropertyDto, PropertyRequestDto } from "../dto/property";
import { PropertyTypeEnum } from "../enums/property";
import { displayEnumList } from "../utils/helpers";
import { CREATE_PROPERTY } from "../services/property";
import { AppCard } from "../utils/components/AppCard";
import { Bounce, toast } from "react-toastify";

export const PropertyComponent: React.FC = () => {
  const initialForm = {
    property_name: "",
    property_address: "",
    property_type: "",
  };
  const [_, setFormLoader] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const handliOnClickCancel = () => setFormData(initialForm);
  const [formData, setFormData] =
    React.useState<PropertyRequestDto>(initialForm);
  return (
    <AppCard
      topStack={
        <div className="flex flex-row w-full gap-3">
          <button
            role="button"
            className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      }
      middleStack={
        <div className="border p-5 bg-slate-50">


          <h2 className="font-sans font-bold text-2xl">Add Property</h2>

          {/* START PROPERTY FORM */}
          <form
            className="mt-8"
            onSubmit={(e) =>
              onSubmit(e)(
                formData,
                //FormNotification,
                setFormLoader,
                setFormData,
                navigate,
                initialForm
              )
            }
          >
            {/* START OF FORM FIELD */}
            <div className="w-full max-w-sm min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">
                Property Name
              </label>
              <input
                value={formData.property_name}
                type="text"
                onChange={(event: any) => {
                  setFormData((prev) => ({
                    ...prev,
                    property_name: event.target.value,
                  }));
                }}
                required
                className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Enter property name..."
              />
            </div>

            <div className="w-full max-w-sm min-w-[200px] mt-5">
              <label className="block mb-2 text-sm text-slate-600">
                Property Address
              </label>
              <input
                value={formData.property_address}
                type="text"
                onChange={(event: any) => {
                  setFormData((prev) => ({
                    ...prev,
                    property_address: event.target.value,
                  }));
                }}
                required
                className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Enter property address..."
              />
            </div>

            <div className="w-full max-w-sm min-w-[200px] mt-5">
              <label className="block mb-2 text-sm text-slate-600">
                Choose Property Type
              </label>
              <div className="relative">
                <select
                  className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                  value={formData.property_type}
                  onChange={(event: any) => {
                    setFormData((prev) => ({
                      ...prev,
                      property_type: event.target.value,
                    }));
                  }}
                  required
                >
                  {["", ...displayEnumList(PropertyTypeEnum)].map(
                    (type, index) => {
                      return (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      );
                    }
                  )}
                </select>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.2"
                  stroke="currentColor"
                  className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                  />
                </svg>
              </div>
            </div>
            {/* END OF FORM FIELDS */}

            {/* START OF ACTION FORM BUTTON */}
            <div className="flex flex-row justify-start gap-3 mt-5">
              <button
                className="rounded-md bg-green-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="submit"
              >
                Submit
              </button>
              <button
                className="rounded-md bg-gray-800 opacity-70 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-gray-700 focus:shadow-none active:bg-gray-700 hover:bg-gray-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={handliOnClickCancel}
              >
                Reset
              </button>
            </div>
            {/* END OF ACTION FORM BUTTON */}
          </form>
          {/* END PROPERTY FORM */}
        </div>
      }
      bottomStack={<></>}
    />
  );
};

function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  return async function (
    data: PropertyRequestDto,
    setLoader: (status: boolean) => void,
    setFormData: (data: PropertyRequestDto) => void,
    navigate: (value: any) => void,
    initialFormData: PropertyRequestDto
  ) {
    e.preventDefault();
    try {
      setLoader(true);
      const response = await CREATE_PROPERTY({ data });
      const savedProperty: PropertyDto = response.data;
      if (savedProperty?.property_id !== undefined) {
        navigate(-1);
        setFormData(initialFormData);
        toast.success(`Property has been registerd`, {
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
        toast.error("Failed to Register Property", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          })
       
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
          })
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
            })
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
            })
        }
      }
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };
}
