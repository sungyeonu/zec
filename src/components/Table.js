import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
  Box,
  chakra,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { useSortBy, useTable } from 'react-table';

function compareNumericString(rowA, rowB, id, desc) {
  let a = Number.parseFloat(rowA.values[id]);
  let b = Number.parseFloat(rowB.values[id]);
  if (Number.isNaN(a)) {
    // Blanks and non-numeric strings to bottom
    a = desc ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
  }
  if (Number.isNaN(b)) {
    b = desc ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
  }
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
}

export default function MainTable({ data }) {
  const columns = useMemo(
    () => [
      {
        Header: '#',
        accessor: 'id',
      },
      {
        Header: 'name',
        accessor: d => `${d.name} ${d.symbol}`,
        Cell: props => (
          <Flex>
            <Text>{props.row.original.name + ' '}</Text>
            {/* trying to add a space here like this won't fuckign work, I added artifical space by adding margin to this other text sigh */}
            <Text color="gray.500" marginLeft={2}>
              {props.row.original.symbol}
            </Text>
          </Flex>
        ),
      },
      {
        Header: 'price (Zcash)',
        accessor: 'priceZEC',
        Cell: props => 'ⓩ' + new Intl.NumberFormat().format(props.value),
      },
      {
        Header: 'price (USD)',
        accessor: 'priceUSD',
        Cell: props => '$' + new Intl.NumberFormat().format(props.value),
      },
      {
        Header: '1h % (ZEC)',
        accessor: 'oneHrZEC',
        sortType: compareNumericString,
        Cell: props =>
          props.value > 0 ? (
            <Box color="green">
              <ChevronUpIcon aria-label="sorted ascending" />
              {props.value.toFixed(2)}%
            </Box>
          ) : (
            <Box color="red">
              <ChevronDownIcon aria-label="sorted descending" />
              {Math.abs(props.value.toFixed(2))}%
            </Box>
          ),
      },
      {
        Header: '24h % (ZEC)',
        accessor: 'twentyFourHrZEC',
        sortType: compareNumericString,
        Cell: props =>
          props.value > 0 ? (
            <Box color="green">
              <ChevronUpIcon aria-label="sorted ascending" />
              {props.value.toFixed(2)}%
            </Box>
          ) : (
            <Box color="red">
              <ChevronDownIcon aria-label="sorted descending" />
              {Math.abs(props.value.toFixed(2))}%
            </Box>
          ),
      },
      {
        Header: 'market cap (ZEC)',
        accessor: 'marketcapZEC',
        Cell: props => 'ⓩ' + new Intl.NumberFormat().format(props.value),
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
                  isNumeric={column.isNumeric}
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
