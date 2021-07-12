import { FC } from "react";
import styled from "styled-components";

import { ReactComponent as Pencel } from "asset/svg/pencel_icon_for_profile.svg";
import { ReactComponent as Age } from "asset/svg/age_icon.svg";
import { ReactComponent as Height } from "asset/svg/height_icon.svg";
import { ReactComponent as Weight } from "asset/svg/weight_icon.svg";
import { ReactComponent as Throws } from "asset/svg/throws_icon.svg";
import { ReactComponent as Bats } from "asset/svg/bats_icon.svg";
import { SideBarItem } from "../SideBarItem";

interface ISideBar {}

const SideBar: FC<ISideBar> = () => {
  return (
    <>
      <Wrapper>
        <ImgAndName>
          <ProfileImg />
          <StyledPencel />
          <Name>
            <p>Name Name</p>
          </Name>
        </ImgAndName>
        <SideBarItem icon={<Age />} label={"Age"} value={"18"} />
        <SideBarItem icon={<Height />} label={"Height"} value={"6.7"} />
        <SideBarItem icon={<Weight />} label={"Weight"} value={"60 kg"} />
        <SideBarItem icon={<Throws />} label={"Throws"} value={"R"} />
        <SideBarItem icon={<Bats />} label={"Bats"} value={"L"} />
      </Wrapper>
    </>
  );
};

export default SideBar;

const Wrapper = styled.div`
  width: 300px;
  padding: 0 15px;
`;

const ImgAndName = styled.div`
  position: relative;
`;
const ProfileImg = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #000;
  margin: 0 auto;
`;

const StyledPencel = styled(Pencel)`
  position: absolute;
  top: 10%;
  right: 10%;
  width: 32px;
  height: 32px;
`;

const Name = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
`;
