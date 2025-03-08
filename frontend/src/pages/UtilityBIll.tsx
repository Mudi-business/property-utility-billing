import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BillDto, BillPageableDto } from "../dto/bills";
import {
  GET_ALL_UTILITY_BILLS,
  GET_UTILITY_BILL_BY_ID,
} from "../services/bills";
import { GET_PROPERTY_BY_ID } from "../services/property";
import { PropertyDto } from "../dto/property";

export const UtilityBill: React.FC = () => {
  const { state } = useLocation();
  const locationData: BillDto = state?.data;
  console.log("location data :", locationData);

  const navigate = useNavigate();
  const [bills, setBills] = useState<BillPageableDto | undefined>(undefined);
  const fetchBillById = async () => {
    try {
      const data: any = await GET_PROPERTY_BY_ID(locationData?.property_id);
      const propertyData: PropertyDto = data.data;
      console.log("property :", propertyData);

      // setBills(billsData);
    } catch (error) {
      console.log("error :", error);
    }
  };
  const fetchBills = async () => {
    try {
      const data: any = await GET_ALL_UTILITY_BILLS({
        page: 0,
        page_size: 10,
        search: "",
        filter: "",
      });
      const billsData: BillPageableDto = data.data;
      setBills(billsData);
    } catch (error) {
      console.log("error :", error);
    }
  };
  useEffect(() => {
    if (locationData !== undefined) fetchBillById();
    else fetchBills();
  }, []);

  return (
    <React.Fragment>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <button onClick={() => navigate("new/bill",{state:{data:locationData?.property_id}})}>Add New Utility Bill</button>
      <table>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Bill Type</th>
            <th>Bill Amount</th>
            <th>Issued Date</th>
          </tr>
        </thead>

        <tbody>
          {bills === undefined
            ? []
            : bills?.bills.map((bill: BillDto, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{bill?.utility_bill_type}</td>
                  <td>{bill?.utility_billing_amount}</td>
                  <td>{bill?.utility_bill_date}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};
