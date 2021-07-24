import { FC } from "react";
import styled from "styled-components";
import { useTable } from "react-table";

import { Loading } from "../../../../../../UIComponents/Loading";

interface IBattingTable {
  columns: any;
  tableData: any;
  loading: boolean;
}

const BattingTable: FC<IBattingTable> = ({
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
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <Cell {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </Cell>
                        );
                      })}
                    </tr>
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
            <Loading />
          </NoData>
        ) : null}
      </Wrapper>
    </>
  );
};

export default BattingTable;

const Wrapper = styled.div``;

const MainTable = styled.table`
  position: sticky;
  width: 100%;
`;

const TableHeader = styled.th`
  text-align: start;
  font-size: 14px;
  line-height: 1;
  font-weight: 300;
  color: #667784;
`;

const TableRow = styled.tr`
  display: flex;
  justify-content: space-between;
`;

const TableBody = styled.tbody`
  min-height: 300px;
`;

const Cell = styled.td``;

const NoData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 100%;
  min-height: 300px;
  height: 100%;
  color: #667784;
  font-size: 16px;
`;
