import { FC } from "react";
import styled from "styled-components";

import { useTable } from "react-table";

import { Loading } from "../UI/Loading";

interface INetworkTable {
  columns: any;
  tableData: any;
  loading: boolean;
}

const NetworkTable: FC<INetworkTable> = ({
  columns,
  tableData = [],
  loading,
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
          {!loading ? (
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
        {!tableData.length && !loading ? (
          <NoData>There's no info yet!</NoData>
        ) : null}
        {loading ? (
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
`;

const TableRow = styled.tr``;

const TableBody = styled.tbody``;

const CellWrapper = styled.tr`
  background-color: #cbcccd4e;
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
