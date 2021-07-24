import { FC } from "react";
import styled from "styled-components";

interface IPagination {
  currentIndex: number;
  totalPages: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: FC<IPagination> = ({
  currentIndex,
  totalPages,
  setIndex,
}) => {
  const countItems = [1, 2, 3, 4];

  return (
    <>
      <Wrapper>
        <Ul>
          {currentIndex > 0 ? (
            <Item onClick={() => setIndex(currentIndex - 1)}>{`<<`}</Item>
          ) : (
            <DisableItem>{`<<`}</DisableItem>
          )}
          {currentIndex > 2 ? (
            <Item onClick={() => setIndex(0)}>{`1`}</Item>
          ) : null}
          {currentIndex < 3
            ? countItems.map((el) => {
                if (currentIndex + 1 === el) {
                  return <SelectedItem>{el}</SelectedItem>;
                }
                return <Item onClick={() => setIndex(el - 1)}>{el}</Item>;
              })
            : null}
          {currentIndex > 2 ? <DisableItem>{`...`}</DisableItem> : null}

          {currentIndex > 2 && currentIndex < totalPages ? (
            <>
              <Item onClick={() => setIndex(currentIndex - 1)}>
                {currentIndex}
              </Item>
              <SelectedItem>{currentIndex + 1}</SelectedItem>
              {currentIndex < totalPages - 1 ? (
                <Item onClick={() => setIndex(currentIndex + 1)}>
                  {currentIndex + 2}
                </Item>
              ) : null}
            </>
          ) : null}

          {currentIndex < totalPages - 3 ? (
            <DisableItem>{`...`}</DisableItem>
          ) : null}
          {currentIndex < totalPages - 3 ? (
            <Item onClick={() => setIndex(totalPages - 1)}>{totalPages}</Item>
          ) : null}
          {currentIndex + 1 < totalPages ? (
            <Item onClick={() => setIndex(currentIndex + 1)}>{`>>`}</Item>
          ) : (
            <DisableItem>{`>>`}</DisableItem>
          )}
        </Ul>
      </Wrapper>
    </>
  );
};

export default Pagination;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: sticky;
  bottom: 0;
`;

const Ul = styled.ul`
  padding: 10px 0;
`;

const Item = styled.li`
  display: inline;
  cursor: pointer;

  padding: 6px 12px;
  border-radius: 4px;
  margin: 0 2px;
  background-color: #45c954;
`;

const SelectedItem = styled(Item)`
  background: #48bbff;
`;

const DisableItem = styled.li`
  display: inline;
  cursor: not-allowed;

  padding: 6px 12px;
  border-radius: 4px;
  margin: 0 2px;
`;
