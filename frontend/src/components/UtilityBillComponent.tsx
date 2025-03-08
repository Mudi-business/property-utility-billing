import { HttpStatusCode } from "axios";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BillDto, BillRequestDto } from "~/dto/bills";
import { UtilityBillTypeEnum } from "../enums/bill";
import { CREATE_UTILITY_BILLL } from "../services/bills";
import { displayEnumList } from "../utils/helpers";

export const UtilityBillComponent: React.FC = () => {
  const [formLoader, setFormLoader] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const handliOnClickCancel = () => setFormData(initialForm);

  const { state } = useLocation();
  const property_id: string = state?.data;
//   console.log("location data new bill:", property_id);
  const initialForm = {
    property_id: property_id === undefined ? "" : property_id,
    utility_bill_amount: 0,
    utility_bill_type: undefined,
    utility_bill_date: "",
  };
  const [formData, setFormData] = React.useState<BillRequestDto>(initialForm);
  return (
    <React.Fragment>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <form
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
          placeholder="Amount"
        />
        {/* <select
          onChange={(event: any) => {
            setFormData((prev) => ({
              ...prev,
              property_type: event.target.value,
            }));
          }}
          value={formData.utility_bill_type}
        >
          {displayEnumList(UtilityBillTypeEnum).map((type, index) => {
            return (
              <option key={index} value={type}>
                {type}
              </option>
            );
          })}
        </select> */}
        <select
          onChange={(event: any) => {
            setFormData((prev) => ({
              ...prev,
              utility_bill_type: event.target.value,
            }));
          }}
          value={formData.utility_bill_type}
        >
          {displayEnumList(UtilityBillTypeEnum).map((type, index) => {
            return (
              <option key={index} value={type}>
                {type}
              </option>
            );
          })}
        </select>

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
          placeholder="Date"
        />

        <button type="submit">Save</button>
        <button type="button" onClick={handliOnClickCancel}>
          Cancel
        </button>
      </form>
    </React.Fragment>
  );
};

function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  return async function (
    data: BillRequestDto,
    //   notification: (type: string, message: string) => any,
    setLoader: (status: boolean) => void,
    setFormData: (data: BillRequestDto) => void,
    navigate: (value: any) => void,
    initialFormData: BillRequestDto
  ) {
    e.preventDefault();
    try {
      setLoader(true);
      console.log("body :", data);

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
