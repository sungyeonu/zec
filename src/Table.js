import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Box, chakra, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useSortBy, useTable } from 'react-table';

export default function MainTable({ data }) {
  const columns = useMemo(
    () => [
      {
        Header: '#',
        accessor: 'id',
        // isNumeric: true,
      },
      {
        Header: 'name',
        accessor: 'name',
        // isNumeric: false,
      },
      {
        Header: 'price (Zcash)',
        accessor: 'priceZEC',
        // isNumeric: true,
      },
      {
        Header: 'price (USD)',
        accessor: 'priceUSD',
        // isNumeric: true,
      },

      {
        Header: '% 1h (ZEC)',
        accessor: 'oneHrZEC',
        // isNumeric: true,
      },
      {
        Header: '% 24h (ZEC)',
        accessor: 'twentyFourHrZEC',
        // isNumeric: true,
      },
      {
        Header: 'market cap (ZEC)',
        accessor: 'marketcapZEC',
        // isNumeric: true,
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <Box overflowX="auto">
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  //   isNumeric={column.isNumeric}
                >
                  {column.render('Header')}
                  <chakra.span pl="4">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <ChevronDownIcon aria-label="sorted descending" />
                      ) : (
                        <ChevronUpIcon aria-label="sorted ascending" />
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
                  <Td
                    {...cell.getCellProps()}
                    // isNumeric={cell.column.isNumeric}
                  >
                    {cell.render('Cell')}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
