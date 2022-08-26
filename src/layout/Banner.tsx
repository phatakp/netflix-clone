import React from "react";

type BannerProps = {
  children: React.ReactNode;
  img: string;
  showBanner: boolean;
};

export const Banner = ({ children, img, showBanner }: BannerProps) => {
  return (
    <div className="relative w-full h-screen md:h-[700px] z-10">
      <img
        src={img}
        alt=""
        className={`${
          showBanner ? "block" : "hidden"
        } absolute object-cover w-full h-full`}
      />
      <div
        className={`${
          showBanner ? "block" : "hidden"
        } absolute w-full h-full bg-gradient-to-r from-black/90`}></div>
      <div className="absolute z-50 flex items-center justify-center w-full h-full">
        {children}
      </div>
    </div>
  );
};
