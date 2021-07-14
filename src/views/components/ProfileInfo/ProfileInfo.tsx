import { FC, useState } from "react";
import styled from "styled-components";

import {
  Batting,
  Comparison,
  SessionReports,
} from "views/components/ProfileInfoContent";

interface IProfileInfo {}

const ProfileInfo: FC<IProfileInfo> = () => {
  const [unit, setUnit] = useState(0);

  const contentButton = ["Batting", "Comparison", "SessionReports"];
  const contentArr = [<Batting />, <SessionReports />, <Comparison />];

  return (
    <>
      <Wrapper>
        <Buttons>
          {contentButton.map((el, id) => {
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
          {/* <Button
            onClick={() => {
              setUnit(0);
            }}
          >
            Batting
          </Button>
          <Button
            onClick={() => {
              setUnit(1);
            }}
          >
            Session Reports
          </Button>
          <Button
            onClick={() => {
              setUnit(2);
            }}
          >
            Comparison
          </Button> */}
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
`;

const Buttons = styled.div`
  display: flex;
`;

const Button = styled.div`
  padding: 8px;
  margin: 8px;
  color: #667784;
  width: 700;
  border: 2px solid #667784;
  border-radius: 40px;
  cursor: pointer;

  &:hover {
    background: rgba(102, 119, 132, 0.4);
  }
`;

const SelectedButton = styled(Button)`
  color: white;
  background: #667784;
`;

const Content = styled.div``;