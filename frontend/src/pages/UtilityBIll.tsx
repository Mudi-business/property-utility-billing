import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BillDto } from "../dto/bills";
import { GET_PROPERTY_BY_ID } from "../services/property";
import { PropertyDto, PropertyResponseWithBillsDto } from "../dto/property";
import { AppCard } from "../utils/components/AppCard";
import { ConvertSysDateToHumanDate } from "../utils/helpers";

export const UtilityBill: React.FC = () => {
  const { state } = useLocation();
  const property_id: string = state?.data;

  const navigate = useNavigate();
  const [bills, setBills] = useState<BillDto[] | undefined>(undefined);
  const [property, setProperty] = useState<PropertyDto | undefined>(undefined);

  useEffect(() => {
    const fetchBillById = async () => {
      try {
        const data = await GET_PROPERTY_BY_ID(property_id);
        const propertyData: PropertyResponseWithBillsDto = data.data;
        await setBills(propertyData.UtilityBills);
        const property: any = { ...propertyData };
        delete property.UtilityBills;
        await setProperty(property);
      } catch (error) {
        console.log("error :", error);
      }
    };
    fetchBillById();
  }, []);

  return (
    <React.Fragment>
      <AppCard
        topStack={
          <div className="flex flex-col w-full gap-3">
            <div className="flex flex-row w-full gap-3">
              <button
                className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={() => navigate(-1)}
              >
                Go Back
              </button>
            </div>
            <div className="flex flex-row justify-start w-full gap-5 mt-5">
              <h3 className="text-xl font-sans font-semibold">Property</h3>
            </div>
            <div className="relative flex flex-col w-full h-full overflow-auto text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
            <table className="w-full text-left table-auto min-w-max text-slate-800">
              <thead>
                <tr className="text-slate-500 border-b border-slate-300 bg-slate-50">
                  <th className="p-4 bg-gray-100">
                    <p className="text-sm leading-none font-normal">
                      Property Name
                    </p>
                  </th>
                  <th className="p-4 bg-gray-100">
                    <p className="text-sm leading-none font-normal">
                      Property Address
                    </p>
                  </th>
                  <th className="p-4 bg-gray-100">
                    <p className="text-sm leading-none font-normal">
                      Property Type
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-slate-50">
                  <td className="p-4  border-b border-slate-300 bg-slate-50">
                    <p className="text-sm">{property?.property_name}</p>
                  </td>
                  <td className="p-4  border-b border-slate-300 bg-slate-50">
                    <p className="text-sm">{property?.property_address}</p>
                  </td>

                  <td className="p-4  border-b border-slate-300 bg-slate-50">
                    <p className="text-sm">{property?.property_type}</p>
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
        }
        middleStack={
          <div className="relative flex flex-col w-full h-full overflow-auto text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
            <div className="flex flex-row w-full gap-3">
              <button
                className="rounded-md bg-green-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={() =>
                  navigate("new/bill", { state: { data: property_id } })
                }
              >
                Add New Utility Bill
              </button>
            </div>
            {/* <div className="flex flex-col justify-start w-full gap-5 mt-5">
              <h3 className="text-lgl font-sans font-semibold">List utility bills</h3>
            </div> */}
            <table className="w-full text-left table-auto min-w-max text-slate-800 mt-3">
              <thead>
                <tr className="text-slate-500 border-b border-slate-300 bg-slate-50">
                  <th className="p-4 bg-gray-100">
                    <p className="text-sm leading-none font-normal">S/N</p>
                  </th>
                  <th className="p-4 bg-gray-100">
                    <p className="text-sm leading-none font-normal">
                      Bill Type
                    </p>
                  </th>
                  <th className="p-4 bg-gray-100">
                    <p className="text-sm leading-none font-normal">
                      Bill Amount
                    </p>
                  </th>
                  <th className="p-4 bg-gray-100">
                    <p className="text-sm leading-none font-normal">Bill Date</p>
                  </th>
                  <th className="p-4 bg-gray-100">
                    <p className="text-sm leading-none font-normal">
                      Created Date
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {bills === undefined
                  ? []
                  : bills.map((bill: BillDto, index: number) => (
                      <tr key={index} className="hover:bg-slate-50">
                        <td className="p-4  border-b border-slate-300 bg-slate-50">
                          <p className="text-sm font-bold">{index + 1}</p>
                        </td>
                        <td className="p-4  border-b border-slate-300 bg-slate-50">
                          <p className="text-sm">{bill?.utility_bill_type}</p>
                        </td>
                        <td className="p-4  border-b border-slate-300 bg-slate-50">
                          <p className="text-sm">{bill?.utility_bill_amount}</p>
                        </td>

                        <td className="p-4  border-b border-slate-300 bg-slate-50">
                          <p className="text-sm">
                            {ConvertSysDateToHumanDate(bill.utility_bill_date.toString())}
                          </p>
                        </td>
                        <td className="p-4  border-b border-slate-300 bg-slate-50">
                          <p className="text-sm">{ConvertSysDateToHumanDate(bill.createdAt.toString())}</p>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        }
        bottomStack={<div></div>}
      />
    </React.Fragment>
  );
};
