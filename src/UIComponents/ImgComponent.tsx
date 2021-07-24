import { FC } from "react";
import styled from "styled-components";

interface IImgComponent {
  imgLink: string;
  height: number;
  width: number;
}

const ImgComponent: FC<IImgComponent> = ({ imgLink, width, height }) => {
  return (
    <>
      <Img src={imgLink} width={width} height={height} />
    </>
  );
};

export default ImgComponent;

interface IImg {
  height: number;
  width: number;
}
const Img = styled.img<IImg>`
  object-fit: cover;

  display: block;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 50%;
  background: #000;
  margin: 0 auto;
`;
