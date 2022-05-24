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
      },
      {
        Header: 'name',
        accessor: 'name',
      },
      {
        Header: 'price (Zcash)',
        accessor: 'priceZEC',
        Cell: props => new Intl.NumberFormat().format(props.value),
      },
      {
        Header: 'price (USD)',
        accessor: 'priceUSD',
        Cell: props => new Intl.NumberFormat().format(props.value),
      },

      {
        Header: '1h % (ZEC)',
        accessor: 'oneHrZEC',
      },
      {
        Header: '24h % (ZEC)',
        accessor: 'twentyFourHrZEC',
      },
      {
        Header: 'market cap (ZEC)',
        accessor: 'marketcapZEC',
        Cell: props => new Intl.NumberFormat().format(props.value),
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
                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
                  <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
