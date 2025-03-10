import { Navigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";

//OUR RESUSBLE PROTECTION ROUTE FOR OUR ENTIRE APPLICATION DEVELOPMENT
type Props = {
  children?: React.ReactNode;
};
export const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const tokenDataa = useSelector((state: any) => state.login);
  const token: { access_token: string; refresh_token: string } = JSON.parse(
    typeof tokenDataa?.token === 'object'?JSON.stringify(tokenDataa?.token):tokenDataa?.token
  );


  if (token?.access_token == "") {
    return <Navigate to="/" replace />;
  }
  return children;
};
