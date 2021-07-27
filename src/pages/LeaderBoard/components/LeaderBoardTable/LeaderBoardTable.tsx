import { FC } from "react";
import styled from "styled-components";

import { useTable } from "react-table";

import { Loading } from "UIComponents/Loading";

interface ILeaderBoardTable {
  columns: any;
  tableData: any;
  loadingData: boolean;
}

const LeaderBoardTable: FC<ILeaderBoardTable> = ({
  columns,
  tableData = [],
  loadingData,
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    //@ts-ignore
    useTable({ columns, data: tableData });
  return (
    <>
      <Wrapper>
        <MainTable {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableHeader {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </TableHeader>
                ))}
              </TableRow>
            ))}
          </Thead>
          {!loadingData ? (
            tableData.length ? (
              <TableBody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <>
                      <CellWrapper {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <Cell {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </Cell>
                          );
                        })}
                      </CellWrapper>
                      <BetweenCell />
                    </>
                  );
                })}
              </TableBody>
            ) : null
          ) : null}
        </MainTable>
        {!tableData.length && !loadingData ? (
          <NoData>There's no info yet!</NoData>
        ) : null}
        {loadingData ? (
          <NoData>
            <Loading fullScreen={true} />
          </NoData>
        ) : null}
      </Wrapper>
    </>
  );
};

export default LeaderBoardTable;

const Wrapper = styled.div`
  height: 100%;
  flex: 0 1;

  @media (max-width: 700px) {
    table,
    thead,
    tbody,
    th,
    td,
    tr {
      display: block;
    }
  } ;
`;

const MainTable = styled.table`
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  @media (max-width: 700px) {
    tr {
      display: none;
    }
  }
`;

const TableHeader = styled.th`
  background: white;
  text-align: start;
  font-size: 14px;
  line-height: 1;
  padding: 15px 15px;
  font-weight: 300;
  color: #667784;
  position: sticky;
  top: 0;

  @media (max-width: 700px) {
    padding: 15px 5px;
  }
`;

const TableRow = styled.tr``;

const TableBody = styled.tbody``;

const CellWrapper = styled.tr`
  background-color: #cbcccd4e;

  &:hover {
    background-color: #ecf8ff;
  }
`;

const Cell = styled.td`
  padding: 5px 15px;

  @media (max-width: 700px) {
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 40%;
    &:nth-of-type(1):before {
      content: "Rank";
    }
    &:nth-of-type(2):before {
      content: "Batter Name";
    }
    &:nth-of-type(3):before {
      content: "Age";
    }
    &:nth-of-type(4):before {
      content: "School";
    }
    &:nth-of-type(5):before {
      content: "Teams";
    }
    &:nth-of-type(6):before {
      content: "Exit Velocity";
    }
    &:nth-of-type(7):before {
      content: "Launch Angle";
    }
    &:nth-of-type(8):before {
      content: "Favorite";
    }
    &:nth-of-type(9):before {
      content: "Distance";
    }
  }
  &:before {
    @media (max-width: 700px) {
      position: absolute;
      top: 0;
      left: 6px;
      width: 25%;
      padding: 5px 15px;
      white-space: nowrap;
    }
  }
`;
const BetweenCell = styled.div`
  height: 4px;
`;

const NoData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 100%;
  min-height: 550px;
  height: 100%;
  color: #667784;
  font-size: 16px;
`;
