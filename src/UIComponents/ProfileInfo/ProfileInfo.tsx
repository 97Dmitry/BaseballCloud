import { FC, useState } from "react";
import styled from "styled-components";

import {
  Batting,
  Comparison,
  SessionReports,
} from "./components/ProfileInfoContent";
import { ProfileInfoBattingButton } from "./components/ProfileInfoBattingButton";

interface IProfileInfo {
  userId: number;
  position: string;
  avatar: string;
  first_name: string;
  last_name: string;
  age: number;
  feet: number;
  inches: number;
  weight: number;
}

const ProfileInfo: FC<IProfileInfo> = ({
  userId,
  avatar,
  first_name,
  last_name,
  position,
  age,
  feet,
  inches,
  weight,
}) => {
  const [unit, setUnit] = useState(0);

  const [battingContent, setBattingContent] = useState(1);
  const contentButton = ["Batting", "Session Reports", "Comparison"];
  const contentArr = [
    <Batting userId={userId} contentNum={battingContent} />,
    <SessionReports userId={userId} />,
    <Comparison
      age={age}
      avatar={avatar}
      feet={feet}
      first_name={first_name}
      inches={inches}
      weight={weight}
      last_name={last_name}
      position={position}
    />,
  ];

  return (
    <>
      <Wrapper>
        <Buttons>
          {contentButton.map((el, id) => {
            if (el === "Batting") {
              return (
                <ProfileInfoBattingButton
                  Button={Button}
                  SelectedButton={SelectedButton}
                  el={el}
                  id={id}
                  key={id}
                  setUnit={setUnit}
                  unit={unit}
                  setBattingContent={setBattingContent}
                />
              );
            }
            if (id === unit) {
              return (
                <SelectedButton
                  onClick={() => {
                    setUnit(id);
                  }}
                  key={id}
                >
                  {el}
                </SelectedButton>
              );
            }
            return (
              <Button
                onClick={() => {
                  setUnit(id);
                }}
                key={id}
              >
                {el}
              </Button>
            );
          })}
        </Buttons>
        <Content>{contentArr[unit]}</Content>
      </Wrapper>
    </>
  );
};

export default ProfileInfo;

const Wrapper = styled.div`
  background: #fff;
  margin: 16px;
  padding: 16px;
  border-radius: 8px;
  @media (max-width: 700px) {
    padding: 5px;
  }
`;

const Buttons = styled.div`
  display: flex;
`;

const Button = styled.div`
  padding: 8px;
  margin: 8px;
  color: #667784;
  font-weight: 700;
  border: 2px solid #667784;
  border-radius: 40px;
  cursor: pointer;

  &:hover {
    background: rgba(102, 119, 132, 0.4);
  }

  @media (max-width: 700px) {
    height: 55px;
  }
`;

const SelectedButton = styled(Button)`
  color: white;
  background: #667784;
`;

const Content = styled.div``;
