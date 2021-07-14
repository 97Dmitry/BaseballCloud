import { FC } from "react";
import styled from "styled-components";

interface IColumn {
  title: string;
  value?: number;
  load: number;
}

const BattingColumn: FC<IColumn> = ({ title, value, load }) => {
  return (
    <>
      <Wrapper>
        <Column>
          <ColumnTitle>
            <p>{title}</p> {value ? value : <strong>N/A</strong>}
          </ColumnTitle>
          <StateLine>
            <Loading load={load} />
          </StateLine>
        </Column>
      </Wrapper>
    </>
  );
};

export default BattingColumn;

const Wrapper = styled.div`
  width: 33.333%;
  padding-right: 25px;
`;

const Column = styled.div``;
const ColumnTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StateLine = styled.div``;

interface ILoading {
  load?: number;
}
const Loading = styled.div<ILoading>`
  position: relative;
  display: inline-block;
  width: 100%;
  height: 10px;
  background: #f1f1f1;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  overflow: hidden;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    width: ${(props) => props.load && props.load | 0}%;
    background-color: #21c500;
    height: 100%;
    border-radius: 4px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    animation: load 5s infinite;
  }
`;
