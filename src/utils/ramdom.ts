import { playerInfoProps, technicalSkillProps } from "@/app/page";

export const getRandomDefenderScore = () => {
  return Math.floor(Math.random() * 5) + 1;
};

export const getRandomListTechnicalSkill = (
  list: technicalSkillProps[],
  count: number
) => {
  const technicalSkillListTemp = [...list];
  const shuffled = technicalSkillListTemp.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getRandomPlayer = (list: playerInfoProps[]) => {
  const technicalPlayerTemp = [...list];
  const shuffled = technicalPlayerTemp.sort(() => 0.5 - Math.random());
  return shuffled[0];
};
