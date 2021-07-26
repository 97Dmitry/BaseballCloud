import { FC } from "react";
import styled from "styled-components";

interface ISideBarTextItem {
  title: string;
  subtitle: any; //string | Record<string, string>;
  object: boolean;
  fatTitleWithLine?: boolean;
}

const SideBarTextItem: FC<ISideBarTextItem> = ({
  title,
  subtitle,
  object,
  fatTitleWithLine = false,
}) => {
  return (
    <>
      <Wrapper>
        <Title fat={fatTitleWithLine}>
          <TitleText fat={fatTitleWithLine}>{title}</TitleText>
        </Title>

        {object ? (
          Object.keys(subtitle).map((id) => {
            return (
              <ObjectSubtitle key={subtitle[id].id}>
                {subtitle[id].name || subtitle[id].u_name}
                {"⠀"}
              </ObjectSubtitle>
            );
          })
        ) : (
          <Subtitle>{subtitle}</Subtitle>
        )}
      </Wrapper>
    </>
  );
};

export default SideBarTextItem;

const Wrapper = styled.div``;

interface ITitle {
  fat: boolean;
}

const Title = styled.div<ITitle>`
  display: flex;
  position: relative;
  vertical-align: middle;
  margin-bottom: 6px;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    right: 0;
    top: 50%;
    z-index: -1;
    height: 1px;
    background: #e7ebef;
  }
`;

const TitleText = styled.div<ITitle>`
  position: relative;

  background-color: #ffffff;
  font-size: ${(props) => (props.fat ? "19px" : "14px")};
  line-height: 17px;
  font-weight: ${(props) => (props.fat ? "700" : "300")};
  color: ${(props) => (props.fat ? "black" : "#667784")};
  padding-right: 15px;
`;

const Subtitle = styled.div`
  font-size: 16px;
  color: #667784;
  word-wrap: break-word;
  margin-bottom: 11px;
`;

const ObjectSubtitle = styled.p`
  display: inline-block;
  font-size: 16px;
  color: #667784;
  word-wrap: break-word;
  margin-bottom: 11px;
`;
