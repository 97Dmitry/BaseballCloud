import { FC } from "react";
import styled from "styled-components";

interface IFooter {}

const Footer: FC<IFooter> = ({}) => {
  return (
    <>
      <Wrapper>
        <LeftUnit>
          <Title>© 2018 BaseballCloud</Title>
          <Link>Terms of Service</Link>
          <Link>Privacy Policy</Link>
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

  padding: 16px;
`;

const LeftUnit = styled.div`
  display: flex;
`;
const RightUnit = styled.div`
  display: flex;
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
