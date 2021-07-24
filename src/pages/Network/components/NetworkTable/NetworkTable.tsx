import { FC } from "react";
import styled from "styled-components";

import { useTable } from "react-table";

import { Loading } from "../../../../UIComponents/Loading";

interface INetworkTable {
  columns: any;
  tableData: any;
  loadingData: boolean;
}

const NetworkTable: FC<INetworkTable> = ({
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
          <thead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableHeader {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </TableHeader>
                ))}
              </TableRow>
            ))}
          </thead>
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

export default NetworkTable;

const Wrapper = styled.div`
  height: 100%;
  flex: 0 1;
`;

const MainTable = styled.table`
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
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
  padding: 15px 15px;
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
