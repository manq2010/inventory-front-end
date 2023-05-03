/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { TablePagination, TableErrorOverlay, TableLoadingOverlay } from 'components';
import TablePagination from './TablePagination';

const Table = ({
  columns, rows, isLoading, pagination,
}) => (
  <StyledTable>
    <TableHead>
      <TableRow>
        {columns && columns.map(({ label }) => (
          <TableHeadCell key={label}>{label}</TableHeadCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody isLoading={isLoading}>
      {rows && rows.map((row) => (
        <TableRow key={row.id}>
          {columns && columns.map(({ prop }) => (
            <TableBodyCell key={`${row.id}-${prop}`}>{row[prop]}</TableBodyCell>
          ))}
        </TableRow>
      ))}
      {rows && !isLoading && (
      <TableRow>
        <TableBodyCell colSpan={columns}>No data found.</TableBodyCell>
      </TableRow>
      )}
    </TableBody>
    {pagination && (
    <TablePagination
      itemsPerPage={pagination.itemsPerPage}
      totalItems={pagination.totalItems}
      page={pagination.page}
      changeItemsPerPageHandler={pagination.changeItemsPerPageHandler}
      changePageHandler={pagination.changePageHandler}
    />
    )}
    {/* {isLoading && <TableLoadingOverlay />} */}
    {/* {error && <TableErrorOverlay>{error}</TableErrorOverlay>} */}
  </StyledTable>
);

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
`;

const TableHead = styled.thead`
  background-color: ${({ theme }) => theme.colors.primary.normal};
  color: ${({ theme }) => theme.colors.grey.normal};
  font-weight: bold;
`;

const TableHeadCell = styled.th`
  padding: 1rem;
`;

const TableBody = styled.tbody`
  opacity: ${({ isLoading }) => (isLoading ? 0.5 : 1)};
`;

const TableRow = styled.tr``;

const TableBodyCell = styled.td`
  padding: 1rem;
`;

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      prop: PropTypes.string.isRequired,
    }),
  ).isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      [PropTypes.string]: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }),
  ).isRequired,
  isLoading: PropTypes.bool,
  //   error: PropTypes.string,
  pagination: PropTypes.shape({
    itemsPerPage: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    changeItemsPerPageHandler: PropTypes.func.isRequired,
    changePageHandler: PropTypes.func.isRequired,
  }),
};

export {
  Table, TableBody, TableBodyCell, TableHead, TableRow,
};
