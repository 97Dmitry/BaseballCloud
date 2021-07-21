import { FC, useState } from "react";
import styled from "styled-components";

interface IProfileInfoBattingButton {
  id: number;
  el: string;
  unit: number;
  setUnit: any;
  Button: any;
  SelectedButton: any;
  setBattingContent: any;
}

const ProfileInfoBattingButton: FC<IProfileInfoBattingButton> = ({
  id,
  el,
  unit,
  setUnit,
  Button,
  SelectedButton,
  setBattingContent,
}) => {
  const [battingDropdown, setBattingDropdown] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  return (
    <>
      <Wrapper
        onMouseOver={() => setBattingDropdown(true)}
        onMouseLeave={() => setBattingDropdown(false)}
      >
        {unit === 0 ? (
          <SelectedButton
            onClick={() => {
              setUnit(id);
            }}
          >
            {el}
          </SelectedButton>
        ) : (
          <Button
            onClick={() => {
              setUnit(id);
            }}
            key={id}
          >
            {el}
          </Button>
        )}
        {(battingDropdown || dropdown) && (
          <PopUp
            onMouseOver={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
          >
            <Link
              onClick={() => {
                setBattingContent(1);
                setDropdown(false);
                setBattingDropdown(false);
              }}
            >
              Summary
            </Link>
            <Link
              onClick={() => {
                setBattingContent(2);
                setDropdown(false);
                setBattingDropdown(false);
              }}
            >
              Charts
            </Link>
            <Link
              onClick={() => {
                setBattingContent(3);
                setDropdown(false);
                setBattingDropdown(false);
              }}
            >
              Log
            </Link>
          </PopUp>
        )}
      </Wrapper>
    </>
  );
};

export default ProfileInfoBattingButton;

const Wrapper = styled.div`
  position: relative;
`;

const PopUp = styled.div`
  width: 178px;
  position: absolute;
  top: 100%;
  left: -15px;
  padding-top: 12px;
  padding: 8px 0;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0 3px 8px 0 rgb(0 0 0 / 15%);
  border: solid 1px #ebebeb;
  z-index: 100;
  top: inherit;
`;

const Link = styled.div`
  display: block;
  padding: 8px 16px;
  background: #fff;
  line-height: 1;
  color: #788b99;
  cursor: pointer;

  &:hover {
    background: #ecf8ff;
  }

  &:active {
    background: #788b99;
    color: #fff;
  }
`;
