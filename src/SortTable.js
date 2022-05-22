import * as React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useTable, useSortBy } from 'react-table';
const data = [
  {
    id: 1,
    toUnit: 'millimetres (mm)',
    factor: 25.4,
  },
  {
    id: 2,
    toUnit: 'centimetres (cm)',
    factor: 30.48,
  },
  {
    id: 3,
    toUnit: 'metres (m)',
    factor: 0.91444,
  },
];

// see https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-table
// to configure react-table typings
const columns = [
  {
    Header: '#',
    accessor: 'id',
  },
  {
    Header: 'Into',
    accessor: 'toUnit',
  },
  {
    Header: 'Multiply by',
    accessor: 'factor',
    isNumeric: true,
  },
];
export default function DataTable() {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <Table {...getTableProps()}>
      <Thead>
        {headerGroups.map(headerGroup => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <Th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                isNumeric={column.isNumeric}
              >
                {column.render('Header')}
                <chakra.span pl="4">
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <TriangleDownIcon aria-label="sorted descending" />
                    ) : (
                      <TriangleUpIcon aria-label="sorted ascending" />
                    )
                  ) : null}
                </chakra.span>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                  {cell.render('Cell')}
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
