import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="bg-linear-header w-full">
      <div className="flex flex-row justify-between items-center py-3 px-8">
        <div className="flex flex-row justify-between items-center gap-x-10">
          <Image
            src={"/images/logo.svg"}
            width={0}
            height={0}
            alt="uni-score logo"
            className=" lg:h-[38px] lg:w-[130px] h-[53.48px] w-[150px] cursor-pointer"
            priority={true}
            sizes="100vw"
            loading="eager"
          />
          <div className="lg:w-[95px] lg:h-[38px] rounded-[87px] bg-linear-border-logo p-[2px] overflow-hidden cursor-pointer">
            <div className="bg-linear-background-logo rounded-[87px] w-full h-full flex justify-center items-center flex-row gap-x-1 ">
              <Image
                src={"/images/Football-icon.svg"}
                width={0}
                height={0}
                alt="uni-score logo"
                className=" lg:h-[18px] lg:w-[17px] h-[18px] w-[17px] "
                priority={true}
                sizes="100vw"
                loading="eager"
              />
              <span className="font-Oswald text-xs font-medium text-white uppercase">
                FOOTBALL
              </span>
            </div>
          </div>
        </div>
        <div className="p-[11px] bg-background-blueDark-1 rounded-full cursor-pointer">
          <Image
            src={"/images/user.svg"}
            width={0}
            height={0}
            alt="user logo"
            className=" lg:h-[14px] lg:w-[14px] h-[14px] w-[14px] text-white"
            priority={true}
            sizes="100vw"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
