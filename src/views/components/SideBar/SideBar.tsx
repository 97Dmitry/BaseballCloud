import { FC } from "react";
import styled from "styled-components";

import { ReactComponent as Pencel } from "asset/svg/pencel_icon_for_profile.svg";
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
        <SideBarItem icon={<Pencel />} label={"label"} value={"5 kg"} />
        <SideBarItem icon={<Pencel />} label={"label"} value={"5 kg"} />
        <SideBarItem icon={<Pencel />} label={"label"} value={"5 kg"} />
        <SideBarItem icon={<Pencel />} label={"label"} value={"5 kg"} />
        <SideBarItem icon={<Pencel />} label={"label"} value={"5 kg"} />
        <SideBarItem icon={<Pencel />} label={"label"} value={"5 kg"} />
      </Wrapper>
    </>
  );
};

export default SideBar;

const Wrapper = styled.div`
  width: 30%;
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
