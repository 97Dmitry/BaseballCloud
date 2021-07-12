import { FC } from "react";
import styled from "styled-components";

interface IProfileInfo {}

const ProfileInfo: FC<IProfileInfo> = () => {
  return (
    <>
      <Wrapper>
        <Button
          onClick={(event: any) =>
            (event.target.style.backgroundColor = "green")
          }
        >
          Batting
        </Button>
        <Button
          onClick={(event: any) =>
            (event.target.style.backgroundColor = "green")
          }
        >
          Session Reports
        </Button>
        <Button>Comparison</Button>
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
  display: flex;
`;
const Button = styled.div`
  padding: 8px;
  margin: 8px;
  border: 2px solid #788b99;
  border-radius: 40px;
  cursor: pointer;
`;
