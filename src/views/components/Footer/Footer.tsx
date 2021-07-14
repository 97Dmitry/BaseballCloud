import { FC } from "react";
import styled from "styled-components";

interface IFooter {}

const Footer: FC<IFooter> = () => {
  return (
    <>
      <Wrapper>
        <LeftUnit>
          <Title>© 2018 BaseballCloud</Title>
          <div>
            <Link>Terms of Service</Link>
            <Link>Privacy Policy</Link>
          </div>
        </LeftUnit>
        <RightUnit>
          <Link>Blog</Link>
          <Link>Twitter</Link>
          <Link>Instagram</Link>
          <Link>Facebook</Link>
        </RightUnit>
      </Wrapper>
    </>
  );
};

export default Footer;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  position: sticky;
  bottom: 0;
  z-index: 1;

  background: #fff;
  border-top: 1px solid #979494;

  padding: 16px;
  @media (max-width: 650px) {
    flex-flow: column;
    flex-direction: column-reverse;
  }
`;

const LeftUnit = styled.div`
  display: flex;
  @media (max-width: 650px) {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
`;
const RightUnit = styled.div`
  display: flex;
  @media (max-width: 650px) {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const Title = styled.p`
  margin-right: 16px;
`;

const Link = styled.a.attrs<{ link?: string }>((props) => ({
  href: props.link || "",
}))`
  margin-right: 16px;
  color: #337ab7;
`;
