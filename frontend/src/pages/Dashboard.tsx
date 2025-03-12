import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { AppCard } from "../utils/components/AppCard";
import { GET_ALL_PROPERTIES } from "../services/property";
import { PropertyDto, PropertyPageableDto } from "../dto/property";
import { GET_UTILITY_BILL_BY_PROPERTY_ID } from "../services/bills";
import { BillDto } from "../dto/bills";
import { ConvertSysDateToHumanDate } from "../utils/helpers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "PMS properties and Utility Bills Summary",
    },
  },
};

interface propBill {
  property: string;
  bill: string;
}
export function Dashboard() {
  const graphColor = "#006666";
  const [properties, setProperties] = useState<PropertyDto[] | undefined>(
    undefined
  );
  const [bills, setBills] = useState<BillDto[] | undefined>(undefined);
  const initialForm = {
    property: "",
    bill: "",
  };

  const [formData, setFormData] = React.useState<propBill>(initialForm);
  const [_, setLabels] = useState<string[]>([]);
  const initialData = {
    labels: [],
    datasets: [
      {
        label: "Dataset 1",
        data: [],
        backgroundColor: graphColor,
      },
    ],
  };
  const [data, setData] = useState<{
    labels: string[];
    datasets: Array<{ label: string; data: number[]; backgroundColor: string }>;
  }>(initialData);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const resp: any = await GET_ALL_PROPERTIES({
          filter: "",
          search: "",
          page: 0,
          page_size: 100000000,
        });
        const properties: PropertyPageableDto = resp.data;
        const respUt: any = await GET_UTILITY_BILL_BY_PROPERTY_ID(
          properties.properties[0].property_id
        );
        const bills: BillDto[] = respUt.data;
        await setBills(bills);
        await setProperties(properties.properties);
        await setLabels([
          ...new Set(bills.map((bill) => bill.utility_bill_type)),
        ]);
        const labels: string[] = [
          ...new Set(bills.map((bill) => bill.utility_bill_type)),
        ];
        await setData({
          labels,
          datasets: [
            {
              label: properties.properties[0].property_name,
              data: labels.map((label) => {
                const filterd = bills.filter(
                  (bill) => bill.utility_bill_type === label
                );
                return filterd.reduce(function (accumulator, currentValue) {
                  return accumulator + currentValue.utility_bill_amount;
                }, 0);
                // return bills.findIndex(bill=>bill.utility_bill_type === label)!== -1
              }),
              backgroundColor: graphColor,
            },
          ],
        });
      } catch (error) {
        console.log("Errors");
      }
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const resp: any = await GET_UTILITY_BILL_BY_PROPERTY_ID(
          formData.property
        );
        const bills: BillDto[] = resp.data;
        setBills(bills);
        await setLabels([
          ...new Set(bills.map((bill) => bill.utility_bill_type)),
        ]);
        const labels: string[] = [
          ...new Set(bills.map((bill) => bill.utility_bill_type)),
        ];
        await setData({
          labels,
          datasets: [
            {
              label: formData.property,
              data: labels.map((label) => {
                const filterd = bills.filter(
                  (bill) => bill.utility_bill_type === label
                );
                return filterd.reduce(function (accumulator, currentValue) {
                  return accumulator + currentValue.utility_bill_amount;
                }, 0);
                // return bills.findIndex(bill=>bill.utility_bill_type === label)!== -1
              }),
              backgroundColor: graphColor,
            },
          ],
        });
      } catch (error) {
        console.log("Errors");
      }
    };
    fetchBills();
  }, [formData.property]);

  useEffect(() => {
    const filterByBills = async () => {
      try {
        const newBills: BillDto[] = bills == undefined ? [] : [...bills];

        const labels: string[] = [
          ...new Set(
            newBills.map((bill) =>
              ConvertSysDateToHumanDate(bill.utility_bill_date.toString())
            )
          ),
        ];

        await setData({
          labels,
          datasets: [
            {
              label: newBills.filter(
                (bill) => bill.utility_bill_type === formData.bill
              )[0].utility_bill_type,
              data: labels.map((label) => {
                const filterd = newBills.filter(
                  (bill) =>
                    ConvertSysDateToHumanDate(
                      bill.utility_bill_date.toString()
                    ) === label &&
                    bill.utility_bill_type ===
                      newBills.filter(
                        (bill) => bill.utility_bill_type === formData.bill
                      )[0].utility_bill_type
                );
                return filterd.reduce(function (accumulator, currentValue) {
                  return accumulator + currentValue.utility_bill_amount;
                }, 0);
                // return bills.findIndex(bill=>bill.utility_bill_type === label)!== -1
              }),
              backgroundColor: graphColor,
            },
          ],
        });
      } catch (error) {
        console.log("Errors");
      }
    };
    if (formData.bill !== "") {
      filterByBills();
    }
  }, [formData.bill]);

  return (
    <AppCard
      topStack={
        <div className="flex flex-row s justify-center gap-5">
          <div className="w-full max-w-sm min-w-[150px] mt-5">
            <label className="block mb-2 text-sm text-slate-600">
              Choose Property
            </label>
            <div className="relative">
              <select
                className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                onChange={(event: any) => {
                  setFormData((prev) => ({
                    ...prev,
                    property: event.target.value,
                  }));
                }}
                defaultValue={
                  properties == undefined ? "" : properties[0].property_id
                }
                value={formData.property}
                required
              >
                {properties == undefined
                  ? []
                  : properties.map((property, index) => {
                      return (
                        <option key={index} value={property.property_id}>
                          {property.property_name}
                        </option>
                      );
                    })}
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
          <div className="w-full max-w-sm min-w-[150px] mt-5">
            <label className="block mb-2 text-sm text-slate-600">
              Choose Bill Type
            </label>
            <div className="relative">
              <select
                className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                onChange={(event: any) => {
                  setFormData((prev) => ({
                    ...prev,
                    bill: event.target.value,
                  }));
                }}
                value={formData.bill}
                required
              >
                {bills == undefined
                  ? []
                  : [
                      { utility_billing_id: "", utility_bill_type: "" },
                      ...bills,
                    ].map((bill, index) => {
                      return (
                        <option key={index} value={bill.utility_billing_id}>
                          {bill.utility_bill_type}
                        </option>
                      );
                    })}
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
        </div>
      }
      middleStack={
        <div className="relative flex flex-col justify-center p-16">
          <div className="flex flex-row justify-center w-full">
            <p className="text-center font-sans font-bold text-lg">
              Visualization of Properties and Utility Bills{" "}
            </p>
          </div>
          <div className="grid grid-cols-12 grid-rows-3 gap-4">
            <div className="col-span-3"></div>
            <div className="col-span-6 row-span-3 col-start-4">
              <Bar options={options} data={data} />
            </div>
            <div className="col-span-3 col-start-10"></div>
          </div>
        </div>
      }
      bottomStack={<></>}
    />
  );
}
