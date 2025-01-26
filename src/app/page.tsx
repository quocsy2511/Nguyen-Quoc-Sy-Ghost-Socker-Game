"use client";
import "@ant-design/v5-patch-for-react-19";
import Header from "@/components/Header";
import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Modal } from "antd";
import { technicalSkillList } from "@/data/technicalSkill";
import InforPlayer from "@/components/InforPlayer";
import { twMerge } from "tailwind-merge";
import {
  getRandomPlayer,
  getRandomDefenderScore,
  getRandomListTechnicalSkill,
} from "@/utils/ramdom";
import BarChart from "@/components/Chart";

type Values = {
  name: string;
  jerseyNumber: number;
};

export type technicalSkillProps = {
  id: number;
  name: string;
  level: number;
  usageCount: number;
};

export type playerInfoProps = {
  name: string;
  jerseyNumber: number;
  defenderScore: number;
  listTechnicalSkill: technicalSkillProps[];
  point: number;
};

export default function Home() {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [listPlayer, setListPlayer] = useState<playerInfoProps[]>([]);
  const [listTechnicalSkillUsage, setListTechnicalSkillUsage] = useState<
    technicalSkillProps[]
  >([]);

  const [isStartGame, setIsStartGame] = useState(false);

  //hàm kiểm tra chuyền bóng thành công hay không
  const checkPassing = (technicalPoint: number, defenderScore: number) => {
    const defenderRattio = defenderScore / (technicalPoint + defenderScore);
    return Math.random() < defenderRattio ? 0 : 1;
  };

  //hàm tính số lần sử dụng kỹ năng
  const countTechnicalSkillUsage = (listPlayer: playerInfoProps[]) => {
    const technicalSkill: technicalSkillProps[] = [];
    listPlayer.forEach((player) => {
      player.listTechnicalSkill.forEach((skill) => {
        const existingSkill = technicalSkill.find(
          (item) => item.name === skill.name
        );

        if (existingSkill) {
          existingSkill.usageCount += skill.usageCount;
        } else {
          technicalSkill.push({ ...skill, usageCount: skill.usageCount });
        }
      });
    });

    return technicalSkill;
  };

  //hàm tính điểm số cho cầu thủ
  const handlePlayerScoring = (
    indexArrestPlayer: number,
    technicalPoint: number
  ) => {
    const point = 10 - indexArrestPlayer + technicalPoint;
    return point;
  };

  //hàm tạo cầu thủ mới
  const onCreate = (values: Values) => {
    if (listPlayer.length >= 1) {
      const isExist = listPlayer.some(
        (player) => player.jerseyNumber === values.jerseyNumber
      );
      if (isExist) {
        alert("Số áo đã tồn tại");
        return;
      }
    }

    const defenderScore = getRandomDefenderScore();
    const technicalSkill = getRandomListTechnicalSkill(technicalSkillList, 5);
    const player = {
      ...values,
      defenderScore: defenderScore,
      listTechnicalSkill: technicalSkill,
      point: 0,
    };
    setListPlayer((prevList) => [...prevList, player]);
    form.resetFields();
    setOpen(false);
  };

  //hàm xử lí logic game
  const handleStartGame = () => {
    const currentListPlayer = [...listPlayer];
    let finalListPlayer: playerInfoProps[] = [...listPlayer];
    const listArrestedPlayer: playerInfoProps[] = [];
    let round = 1;

    //xử lí logic của mỗi vòng đấu
    const processRound = (
      currentListPlayer: playerInfoProps[],
      listArrestedPlayer: playerInfoProps[]
    ) => {
      let currentArrestPlayer: playerInfoProps | undefined;
      let indexCurrentArrestPlayer = 1;
      let previousPasser: playerInfoProps | undefined;

      //lọc ra danh sách cầu thủ chưa bị phạt ở vòng trước
      const eligiblePlayers = currentListPlayer.filter(
        (player) =>
          !listArrestedPlayer.some(
            (arrested) => arrested.jerseyNumber === player.jerseyNumber
          )
      );

      while (currentListPlayer.length > 1) {
        // Lấy random cầu thủ bị phạt từ danh sách đã lọc của mỗi round
        if (!currentArrestPlayer) {
          currentArrestPlayer = getRandomPlayer(eligiblePlayers);
          listArrestedPlayer.push(currentArrestPlayer);
        }

        // Loại bỏ cầu thủ bị phạt khỏi danh sách và lấy ngẫu nhiên 1 cầu thu khác để chuyền bóng
        currentListPlayer = currentListPlayer.filter(
          (player) => player.jerseyNumber !== currentArrestPlayer?.jerseyNumber
        );
        if (currentListPlayer.length === 1) break; // nêu chỉ còn 1 cầu thủ và 1 cầu thủ bị phạt thì sẽ dừng round

        //lọc ra cầu thủ đã chuyền bóng trước đó
        const possiblePassers = currentListPlayer.filter(
          (player) => player.jerseyNumber !== previousPasser?.jerseyNumber
        );

        const passer = getRandomPlayer(possiblePassers);

        if (passer) previousPasser = passer; //cập nhật cầu thủ đã chuyền bóng trước đó

        // Chọn kỹ năng chuyền bóng ngẫu nhiên của passer
        const technicalSkill =
          passer.listTechnicalSkill[
            Math.floor(Math.random() * passer.listTechnicalSkill.length)
          ];
        const technicalPoint = technicalSkill.level;

        // Kiểm tra chuyền bóng thành công hay không
        const isPassingSuccess = checkPassing(
          technicalPoint,
          currentArrestPlayer.defenderScore
        );

        // cập nhật số lần dùng kĩ năng của cầu thủ
        finalListPlayer = finalListPlayer.map((player) => {
          if (player.jerseyNumber === passer.jerseyNumber) {
            const updatedTechnicalSkills = player.listTechnicalSkill.map(
              (skill) => {
                if (skill.name === technicalSkill.name) {
                  return {
                    ...skill,
                    usageCount: skill.usageCount + 1,
                  };
                }
                return skill;
              }
            );
            return {
              ...player,
              listTechnicalSkill: updatedTechnicalSkills,
            };
          }

          return player;
        });

        if (isPassingSuccess) {
          // Nếu chuyền bóng thành công, ghi điểm cho passer
          const earnedPoint = handlePlayerScoring(
            indexCurrentArrestPlayer,
            technicalPoint
          );

          //cập nhật điểm cho cầu thủ khi chuyền bóng thành công
          finalListPlayer = finalListPlayer.map((player) => {
            const findPlayer = player.jerseyNumber === passer.jerseyNumber;
            return findPlayer
              ? {
                  ...player,
                  point: player.point + earnedPoint,
                }
              : player;
          });
        } else {
          // Nếu chuyền bóng thất bại, passer trở thành người bị phạt và tăng thứ tự bị phạt lên

          currentArrestPlayer = passer;
          indexCurrentArrestPlayer++;
        }
      }

      console.log("Danh sách cầu thủ hiện tại:", finalListPlayer);
    };

    while (round <= 3) {
      processRound(currentListPlayer, listArrestedPlayer);
      round++;
    }

    finalListPlayer.sort((a, b) => b.point - a.point);
    const listTechnicalSkillUsage = countTechnicalSkillUsage(finalListPlayer); //cập nhật số lần sử dụng từng kỹ năng của cầu thủ
    setListTechnicalSkillUsage(listTechnicalSkillUsage);
    setListPlayer(finalListPlayer);
    setIsStartGame(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 px-8 pb-8 mt-4">
        <div className=" flex flex-row items-center justify-center rounded-lg overflow-hidden mb-4  mt-4 py-4 bg-gray-400 ">
          <div className="flex flex-row items-center justify-between w-full px-4">
            <Button
              type="primary"
              onClick={() => setOpen(true)}
              disabled={listPlayer.length >= 10}
              className="text-white"
            >
              Tạo Cầu thủ
            </Button>

            {listPlayer.length < 10 ? (
              <h3 className="font-BeVietnamPro font-normal text-lg text-red-700 w-full text-center">
                (Bạn cần tạo đủ 10 cầu thủ để bắt đầu chơi bóng ma)
              </h3>
            ) : (
              <h3 className="font-BeVietnamPro font-normal text-lg text-green-2 w-full text-center">
                (Giờ đã đủ đội hình bạn có thể nhấn bắt đầu)
              </h3>
            )}

            <Button
              type="primary"
              onClick={handleStartGame}
              disabled={listPlayer.length < 10}
            >
              Bắt đầu
            </Button>
          </div>
        </div>

        {listTechnicalSkillUsage.length > 0 && (
          <div className="w-full h-[450px] mb-9 place-content-center content-center">
            <p
              className={twMerge(
                "font-BeVietnamPro font-semibold text-xl text-white"
              )}
            >
              Thống kế kỹ năng được sử dụng
            </p>
            <BarChart data={listTechnicalSkillUsage} />
          </div>
        )}

        {listPlayer.length > 0 && (
          <div className="flex-1">
            <p
              className={twMerge(
                "font-BeVietnamPro font-semibold text-xl text-white"
              )}
            >
              Danh sách cầu thủ
            </p>
            {listPlayer.map((player, index) => {
              const isTop3 = index < 3;
              return (
                <InforPlayer
                  key={index}
                  namePlayer={player.name}
                  defender={player.defenderScore}
                  jerseyNumber={player.jerseyNumber}
                  technicalSkill={player.listTechnicalSkill}
                  point={player.point}
                  className={
                    isTop3 && isStartGame ? "text-red-400 italic font-bold" : ""
                  }
                />
              );
            })}
          </div>
        )}
      </div>
      <Modal
        open={open}
        title="Cầu thủ mới"
        okText="Tạo"
        cancelText="Huỷ"
        okButtonProps={{ autoFocus: true, htmlType: "submit" }}
        onCancel={() => setOpen(false)}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            initialValues={{ modifier: "public" }}
            clearOnDestroy
            onFinish={(values) => onCreate(values)}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="name"
          label="Tên cầu thủ"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên cầu thủ!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="jerseyNumber"
          label="Số áo"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số áo của cầu thủ!",
            },
          ]}
        >
          <InputNumber className="w-full" max={99} min={0} />
        </Form.Item>
      </Modal>
    </div>
  );
}
