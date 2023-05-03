import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// components
import {
  TableHead,
  TableBody,
  TablePagination,
  IColumn,
  IPagination,
  ISelectableRows,
  INoDataState,
  ISort,
} from 'components';

const propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  rows: PropTypes.array,
  columns: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    type: PropTypes.string,
    accessor: PropTypes.string,
  })),
  sort: PropTypes.shape({
    current: PropTypes.string,
    sortByHandler: PropTypes.func,
  }),
  pagination: PropTypes.shape({
    total: PropTypes.number,
    page: PropTypes.number,
    size: PropTypes.number,
    setPage: PropTypes.func,
    setSize: PropTypes.func,
  }),
  hiddenColumns: PropTypes.arrayOf(PropTypes.string),
  noDataState: PropTypes.shape({
    icon: PropTypes.node,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  selectableRows: PropTypes.shape({
    selectedRows: PropTypes.object,
    setSelectedRows: PropTypes.func,
    onSelectAll: PropTypes.func,
    onSelectNone: PropTypes.func,
  }),
};

const defaultProps = {
  isLoading: false,
  error: null,
  rows: null,
  columns: [],
  sort: null,
  pagination: null,
  hiddenColumns: [],
  noDataState: null,
  selectableRows: null,
};

export const Table = ({
  isLoading,
  error,
  rows,
  columns,
  sort,
  pagination,
  hiddenColumns,
  noDataState,
  selectableRows,
}) => {
  // local state
  const [sorting, setSorting] = useState(sort?.current || '');
  const allRowsDeselected = {};
  const allRowsSelected = {};
  rows?.forEach((row) => (allRowsDeselected[row.id] = false));
  rows?.forEach((row) => (allRowsSelected[row.id] = true));
  if (selectableRows) selectableRows.setSelectedRows(allRowsDeselected);

  // handlers
  const sortingBy = (type) => {
    setSorting(type === sorting ? '' : type);
    sort?.sortByHandler(type === sorting ? '' : type);
  };

  return (
    <StyledDiv>
      <table>
        <TableHead
          columns={columns}
          hiddenColumns={hiddenColumns}
          rows={rows}
          sortingBy={sort && sortingBy}
          sorting={sorting}
          selectableRows={selectableRows
            && { allRowsSelected, allRowsDeselected, ...selectableRows }}
        />
        <TableBody
          columns={columns}
          hiddenColumns={hiddenColumns}
          rows={rows}
          isLoading={isLoading}
          error={error}
          noDataState={noDataState}
          selectableRows={selectableRows}
        />
      </table>

      {pagination && !isLoading && !!rows?.length && (
        <TablePagination pagination={pagination} hasResults={!!rows?.length} />
      )}
    </StyledDiv>
  );
};

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

const StyledDiv = styled.div`
  white-space: nowrap;
  width: 100%;
  height: 100%;
  overflow: auto;

  table {
    border-spacing: 0;
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    border: none;

    tbody tr,
    thead tr {
      line-height: 1rem;
      min-height: 1rem;
    }

    tbody td,
    thead th {
      text-overflow: ellipsis;
      vertical-align: middle;
      padding: 0.25rem 1rem;

      &:first-child {
        padding-left: 1.25rem;
      }
    }

    thead th {
      padding-block: 0.5rem;
    }
  }

  .action-icon {
    cursor: pointer;

    &:hover {
      transform: scale(1.2);
      transition: all 0.2s ease;
    }
  }

  .action-icon:hover {
    svg {
      path {
        stroke: ${({ theme }) => theme.colors.error};
      }
    }
  }
`;

export default Table;
