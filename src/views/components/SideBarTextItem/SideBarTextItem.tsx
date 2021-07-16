import { FC } from "react";
import styled from "styled-components";

interface ISideBarTextItem {
  title: string;
  subtitle: any; //string | Record<string, string>;
  object: boolean;
  fat?: boolean;
}

const SideBarTextItem: FC<ISideBarTextItem> = ({
  title,
  subtitle,
  object,
  fat = false,
}) => {
  return (
    <>
      <Wrapper>
        <Title fat={fat}>{title}</Title>
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
  font-size: 14px;
  line-height: 17px;
  font-weight: ${(props) => (props.fat ? "700" : "300")};
  color: #667784;
  margin-bottom: 6px;
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
