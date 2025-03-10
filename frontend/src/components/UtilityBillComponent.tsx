import { HttpStatusCode } from "axios";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BillDto, BillRequestDto } from "~/dto/bills";
import { UtilityBillTypeEnum } from "../enums/bill";
import { CREATE_UTILITY_BILLL } from "../services/bills";
import { displayEnumList } from "../utils/helpers";
import { AppCard } from "../utils/components/AppCard";

export const UtilityBillComponent: React.FC = () => {
  const [formLoader, setFormLoader] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const handliOnClickCancel = () => setFormData(initialForm);
  const { state } = useLocation();
  const property_id: string = state?.data;

  const initialForm = {
    property_id: property_id === undefined ? "" : property_id,
    utility_bill_amount: "",
    utility_bill_type: "",
    utility_bill_date: "",
  };

  const [formData, setFormData] = React.useState<BillRequestDto>(initialForm);
  return (
    <React.Fragment>
      <AppCard
        topStack={
          <div className="flex flex-row w-full gap-3">
            <button
              className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          </div>
        }
        middleStack={
          <div className="border p-5 bg-slate-50">
            <h2 className="font-sans font-bold text-2xl">Add Utility Bill</h2>

            {/* START OF UTILITY BILL FORM */}
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

              {/* START OF UTILITY BILL FORM FIELDS */}
              <div className="w-full max-w-sm min-w-[200px]">
                <label className="block mb-2 text-sm text-slate-600">
                  Bill Amount
                </label>
                <input
                  value={formData.utility_bill_amount}
                  type="number"
                  onChange={(event: any) => {
                    setFormData((prev) => ({
                      ...prev,
                      utility_bill_amount: event.target.value,
                    }));
                  }}
                  required
                  placeholder="Enter Bill Amount"
                  className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                />
              </div>

              <div className="w-full max-w-sm min-w-[200px] mt-5">
                <label className="block mb-2 text-sm text-slate-600">
                  Choose Bill Type
                </label>
                <div className="relative">
                  <select
                    className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                    onChange={(event: any) => {
                      setFormData((prev) => ({
                        ...prev,
                        utility_bill_type: event.target.value,
                      }));
                    }}
                    value={formData.utility_bill_type}
                    required
                  >
                    {["", ...displayEnumList(UtilityBillTypeEnum)].map(
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

              <div className="w-full max-w-sm min-w-[200px] mt-5">
                <label className="block mb-2 text-sm text-slate-600">
                  Date
                </label>
                <input
                  value={formData.utility_bill_date}
                  type="date"
                  onChange={(event: any) => {
                    setFormData((prev) => ({
                      ...prev,
                      utility_bill_date: event.target.value,
                    }));
                  }}
                  required
                  placeholder="Enter Date"
                  className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                />
              </div>
              {/* END OF UTILITY BILL FORM FIELDS */}

              {/* START OF ACTION BUTTONS */}
              <div className="flex flex-row justify-start gap-3 mt-5">
                <button
                  className="rounded-md bg-green-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="submit"
                >
                  Submit
                </button>
                <button
                  className="rounded-md bg-gray-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-gray-700 focus:shadow-none active:bg-gray-700 hover:bg-gray-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                  onClick={handliOnClickCancel}
                >
                  Reset
                </button>
              </div>
              {/* END OF ACTION BUTTONS */}
            </form>
            {/* END OF UTILITY BILL FORM */}
          </div>
        }
        bottomStack={<></>}
      />
    </React.Fragment>
  );
};

function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  return async function (
    data: BillRequestDto,
    setLoader: (status: boolean) => void,
    setFormData: (data: BillRequestDto) => void,
    navigate: (value: any) => void,
    initialFormData: BillRequestDto
  ) {
    e.preventDefault();
    try {
      setLoader(true);
      const response = await CREATE_UTILITY_BILLL({ data });
      const savedUtilityBill: BillDto = response.data;
      if (savedUtilityBill?.property_id !== undefined) {
        navigate(-1);
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
