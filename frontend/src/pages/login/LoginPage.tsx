import React from "react";
import { useNavigate } from "react-router-dom";

export const  LoginPage:React.FC =()=> { 
  const navigate =useNavigate()
  return (
    <React.Fragment>
      <div>LoginPage</div>
      <button onClick={()=>navigate("/home")}>Login</button>
    </React.Fragment>
  );
}
