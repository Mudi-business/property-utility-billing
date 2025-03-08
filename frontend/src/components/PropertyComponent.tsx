import React from "react";
import { useNavigate } from "react-router-dom";
import { PropertyDto, PropertyRequestDto } from "../dto/property";
import { PropertyTypeEnum } from "../enums/property";
import { displayEnumList } from "../utils/helpers";
import { CREATE_PROPERTY } from "../services/property";
import { HttpStatusCode } from "axios";

export const PropertyComponent: React.FC = () => {
  const initialForm = {
    property_name: "",
    property_address: "",
    property_type: undefined,
  };
  const [formLoader, setFormLoader] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const handliOnClickCancel = () => setFormData(initialForm);
  const [formData, setFormData] =
    React.useState<PropertyRequestDto>(initialForm);
  return (
    <React.Fragment>
        <button onClick={()=>navigate(-1)}>Go Back</button>
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
          value={formData.property_name}
          type="text"
          onChange={(event: any) => {
            setFormData((prev) => ({
              ...prev,
              property_name: event.target.value,
            }));
          }}
          required
          placeholder="property name"
        />
        <input
          value={formData.property_address}
          type="text"
          required
          onChange={(event: any) => {
            setFormData((prev) => ({
              ...prev,
              property_address: event.target.value,
            }));
          }}
          placeholder="property address"
        />
        <select
          onChange={(event: any) => {
            setFormData((prev) => ({
              ...prev,
              property_type: event.target.value,
            }));
          }}
          value={formData.property_type}
        >
          {displayEnumList(PropertyTypeEnum).map((type, index) => {
            return (
              <option key={index} value={type}>
                {type}
              </option>
            );
          })}
        </select>

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
    data: PropertyRequestDto,
    //   notification: (type: string, message: string) => any,
    setLoader: (status: boolean) => void,
    setFormData: (data: PropertyRequestDto) => void,
    navigate: (value: any) => void,
    initialFormData: PropertyRequestDto
  ) {
    e.preventDefault();
    try {
      setLoader(true);
      console.log("body :", data);

      const response = await CREATE_PROPERTY({ data });
      const savedProperty: PropertyDto = response.data;
      if (savedProperty?.property_id !== undefined) {
        navigate(-1);
        setFormData(initialFormData);
      } else {
        console.log('Error occured',HttpStatusCode.NotFound);
        
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
