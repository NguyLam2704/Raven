import React from "react";

const StatsCard = ({ title, value, icontrend, icon, trend, trendColor }) => {
    return (
      <div className="ipad:h-[160px] mobile:h-[120px] mobile:p-2 ipad:p-6 bg-white rounded-[14px] flex flex-col items-center justify-center border border-gray-200">
        <div className="flex space-x-2 w-full mt-2">
          <h3 className="ipad:text-base desktop:text-base mobile:text-[10px] font-semibold pt-1 text-left w-4/5">{title}</h3>
          <img src={icon} alt="Icon" className="desktop:w-14 desktop:h-14 ipad:w-14 ipad:h-14 mobile:w-10 mobile:h-10" />
        </div>
        <h2 className="desktop:text-3xl ipad:text-2xl mobile:text-xl font-bold w-full mobile:-mt-[10px] ipad:-mt-[10px] desktop:-mt-[10px]">
          {value}
        </h2>
        {title === 'Đang giao hàng' ? <div className={`mt-4 mb-8 flex text-[16px] font-semibold w-full `}></div> : 
        <div className="mt-1 mobile:w-auto ipad:w-full justify-center items-center desktop:flex ipad:flex">
          <div className={`ipad:w-auto flex mobile:flex-row ipad:flex-row desktop:flex-row desktop:text-[16px] ipad:text-[14px] mobile:text-[10px] font-semibold`}>
            <img src={icontrend} alt="Icon" className="mr-2"/>
            <span className={`${trendColor}  flex justify-center items-center `}>{trend}</span>
         </div>
          <div className="ipad:text-base desktop:text-base mobile:text-[10px] flex items-center mobile:w-full ipad:w-auto ipad:px-2">
            so với hôm qua
          </div>
        </div>

        }

      </div>
    );
  };

export default StatsCard;