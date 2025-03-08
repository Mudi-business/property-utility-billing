import React, { useEffect, useState } from "react";
import { GET_ALL_PROPERTIES } from "../services/property";
import { PropertyDto, PropertyPageableDto } from "../dto/property";
import { useNavigate } from "react-router-dom";

export const Property: React.FC = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<PropertyPageableDto | undefined>(
    undefined
  );
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data: any = await GET_ALL_PROPERTIES({
          page: 0,
          page_size: 10,
          search: "",
          filter: "",
        });
        const propertiesData: PropertyPageableDto = data.data;
        setProperties(propertiesData);
      } catch (error) {
        console.log("error :", error);
      }
    };
    fetchProperties();
  }, []);

  return (
    <React.Fragment>
      <button onClick={()=>navigate("new/property")}>Add New Property</button>
      <table>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Name</th>
            <th>Address</th>
            <th>Type</th>
            <th>More</th>
          </tr>
        </thead>

        <tbody>
          {properties === undefined
            ? []
            : properties?.properties.map(
                (property: PropertyDto, index: number) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{property?.property_name}</td>
                    <td>{property?.property_address}</td>
                    <td>{property?.property_type}</td>
                    <td><button onClick={()=>navigate("utility/bills",{state:{data:property}})}>Bills</button></td>
                  </tr>
                )
              )}
        </tbody>
      </table>
    </React.Fragment>
  );
};
