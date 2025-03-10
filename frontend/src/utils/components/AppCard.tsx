import React, { ReactNode } from "react";

//RESUSBLE APP CARD FOR OUR ENTIRE APPLICATION DEVELOPMENT
export const AppCard: React.FC<{
  topStack: ReactNode;
  middleStack: ReactNode;
  bottomStack: ReactNode;
}> = (props) => {
  return (
    <div className="w-full flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg">
      <div className="p-4">{props.topStack}</div>
      <div className="p-4">{props.middleStack}</div>
      <div className="px-4 pb-4 pt-0 mt-2">{props.bottomStack}</div>
    </div>
  );
};
