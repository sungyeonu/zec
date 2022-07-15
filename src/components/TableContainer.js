import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Table,
  chakra,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  IconButton,
  Select,
  Tooltip,
  Tr,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { useSortBy, useTable, usePagination } from 'react-table';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';

const options = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

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
            <Text color="gray.500" marginLeft={2}>
              {props.row.original.symbol}
            </Text>
          </Flex>
        ),
      },
      {
        Header: 'price (Zcash)',
        accessor: 'priceZEC',
        Cell: props => 'ⓩ' + props.value.toFixed(2),
      },
      {
        Header: 'price (USD)',
        accessor: 'priceUSD',
        Cell: props => '$' + Number(props.value).toLocaleString('en', options),
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
              {Math.abs(props.value).toFixed(2)}%
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
              {Math.abs(props.value).toFixed(2)}%
            </Box>
          ),
      },
      {
        Header: 'market cap (ZEC)',
        accessor: 'marketcapZEC',
        Cell: props => 'ⓩ' + Number(props.value).toLocaleString('en'),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useSortBy,
    usePagination
  );

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
          {page.map(row => {
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
      <Flex justifyContent="space-between" m={4} alignItems="center">
        <Flex>
          <Tooltip label="First Page">
            <IconButton
              onClick={() => gotoPage(0)}
              isDisabled={!canPreviousPage}
              icon={<ArrowLeftIcon h={3} w={3} />}
              mr={4}
            />
          </Tooltip>
          <Tooltip label="Previous Page">
            <IconButton
              onClick={previousPage}
              isDisabled={!canPreviousPage}
              icon={<ChevronLeftIcon h={6} w={6} />}
            />
          </Tooltip>
        </Flex>

        <Flex alignItems="center">
          <Text flexShrink="0" mr={8}>
            Page{' '}
            <Text fontWeight="bold" as="span">
              {pageIndex + 1}
            </Text>{' '}
            of{' '}
            <Text fontWeight="bold" as="span">
              {pageOptions.length}
            </Text>
          </Text>

          <Select
            w={32}
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </Flex>

        <Flex>
          <Tooltip label="Next Page">
            <IconButton
              onClick={nextPage}
              isDisabled={!canNextPage}
              icon={<ChevronRightIcon h={6} w={6} />}
            />
          </Tooltip>
          <Tooltip label="Last Page">
            <IconButton
              onClick={() => gotoPage(pageCount - 1)}
              isDisabled={!canNextPage}
              icon={<ArrowRightIcon h={3} w={3} />}
              ml={4}
            />
          </Tooltip>
        </Flex>
      </Flex>
    </Box>
  );
}
