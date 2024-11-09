import React from "react";

const StatsCard = ({ title, value, icontrend, icon, trend, trendColor }) => {
    return (
      <div className="h-[160px] p-6 bg-white rounded-[14px] flex flex-col items-center justify-center border border-gray-200">
        <div className="flex space-x-2 w-full mt-2">
          <h3 className="text-base font-semibold pt-1 text-left w-4/5">{title}</h3>
          <img src={icon} alt="Icon" className="w-14 h-14" />
        </div>
        <h2 className="text-3xl font-bold w-full -mt-[10px]">{value}</h2>
        <div className={`mt-4 mb-2 flex text-[16px] font-semibold w-full `}>
          <img src={icontrend} alt="Icon" className="mr-2"/>
          <span className={`${trendColor} `}>{trend}</span>&nbsp; so với hôm qua
        </div>
      </div>
    );
  };

export default StatsCard;