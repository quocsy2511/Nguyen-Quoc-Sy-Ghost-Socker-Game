"use client";
import { technicalSkillProps } from "@/app/page";
import Image from "next/image";
import React from "react";
import { twMerge } from "tailwind-merge";

type InforPlayerProps = {
  namePlayer: string;
  defender: number;
  jerseyNumber: number;
  technicalSkill: technicalSkillProps[];
  point: number;
  className?: string;
};

type InforItemProps = {
  className?: string;
  title: string;
  iconUrl: string;
  value: string | null | number;
  wrapClassName?: string;
};

const InforPlayerItem = ({
  className,
  iconUrl,
  title,
  value,
  wrapClassName,
}: InforItemProps) => {
  return (
    <div
      className={twMerge(
        "flex flex-col px-4 py-3 gap-y-1 h-fit w-full",
        wrapClassName
      )}
    >
      <p className="font-BeVietnamPro font-normal text-[11px] text-gray-2">
        {title}
      </p>

      <div
        className={twMerge(
          "flex flex-row justify-start items-center gap-x-[10px]",
          className
        )}
      >
        <Image
          src={iconUrl}
          width={0}
          height={0}
          alt="national logo"
          className=" h-[24px] w-[24px] "
          sizes="100vw"
        />
        <div className="flex flex-col">
          {value ? (
            <span className="uppercase text-white text-[13px] font-BeVietnamPro font-bold">
              {value}
            </span>
          ) : (
            <p className="font-BeVietnamPro font-normal text-[11px] text-gray-2">
              update soon
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const InforPlayer = ({
  defender,
  namePlayer,
  jerseyNumber,
  technicalSkill,
  point,
  className,
}: InforPlayerProps) => {
  return (
    <div className="bg-background-secondary flex flex-row items-start rounded-lg overflow-hidden mb-4 mdd:flex-col h-fit">
      <div className="w-[50%] px-4 py-3 flex flex-col mdd:w-full">
        {/* like */}
        <div className="w-full place-items-end flex flex-row  items-center justify-end gap-x-2">
          <p
            className={twMerge(
              "font-BeVietnamPro font-semibold text-xl",
              className
            )}
          >
            {point} point
          </p>
        </div>
        {/* player */}
        <div className="flex flex-row justify-start items-center gap-x-3 pb-6">
          <div className="relative w-[90px] h-[90px] bg-white rounded-full border-white border-2 place-items-center place-content-center">
            <Image
              src={"/images/defaultAvatarPlayer.webp"}
              alt="player logo"
              className="rounded-full"
              sizes="100vw"
              fill
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-y-[9px]">
              <p
                className={twMerge(
                  "font-Oswald font-medium text-[32px] text-white",
                  className
                )}
              >
                {namePlayer}{" "}
              </p>
              <div className="flex flex-row justify-start items-center gap-x-3">
                <div>
                  <Image
                    src={"/images/logo-clb.webp"}
                    width={0}
                    height={0}
                    alt="clb logo"
                    className=" h-[40px] w-[40px] "
                    sizes="100vw"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-white font-BeVietnamPro text-[13px] font-semibold">
                    Uni Score
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* infor */}
      <div className="flex-1 mdd:w-full">
        <div className="flex flex-col">
          <div className="flex flex-row w-full">
            <InforPlayerItem
              title="Defender"
              iconUrl="/images/Height.svg"
              value={`${defender} point`}
              wrapClassName="border-b border-border-1 border-l mdd:border-l-0 "
            />

            <InforPlayerItem
              title="Jersey number"
              iconUrl="/images/Jersey.svg"
              value={jerseyNumber}
              wrapClassName="border-b  border-border-1 border-l mdd:border-l-0"
            />
          </div>

          <div className="flex flex-col gap-y-3 mt-3">
            <span className="uppercase text-white text-[13px] font-BeVietnamPro font-bold">
              Technical Skill
            </span>

            {technicalSkill.map((technical) => (
              <div
                className="flex flex-row gap-x-3 border-b border-border-1 mb-2 px-5 pb-2"
                key={technical.id}
              >
                <p className="font-BeVietnamPro font-semibold text-[12px] text-white">
                  {technical.name}
                </p>
                <p className="font-BeVietnamPro font-normal text-[11px] text-gray-2">
                  ({technical.level} point) / số lần sử dụng:{" "}
                  {technical.usageCount}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InforPlayer;
