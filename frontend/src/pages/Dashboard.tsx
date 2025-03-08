import { useNavigate } from "react-router-dom";
import React from "react";
export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  console.log('process :',process.env.API_URL);
  
  return (
    <div>
      <button
        onClick={() => {
          navigate("properties");
        }}
      >
        Properties
      </button>
    </div>
  );
};
