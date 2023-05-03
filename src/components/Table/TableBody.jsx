import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  IColumn,
  IRow,
  TableBodyNoData,
  LoadingAnimation,
  ISelectableRows,
  INoDataState,
  LoadingBox,
  NoContentBox,
} from 'components';

const StyledTbody = styled.tbody`
  tr {
    td.sticky {
      background-color: ${({ theme }) => theme.colors.white};
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors.grey.lighter};

      & td.sticky {
        background-color: ${({ theme }) => theme.colors.grey.lighter};
        z-index: 2;
      }
    }
  }
`;

const TableBody = ({
  isLoading,
  error,
  rows,
  columns,
  hiddenColumns,
  noDataState,
  selectableRows,
}) => {
  const toggleSelectRowHandler = (e) => {
    const { checked, name } = e.target;
    selectableRows?.setSelectedRows({
      ...selectableRows.selectedRows,
      [name]: !!checked,
    });
  };

  return (
    <StyledTbody>
      <tr className="bg-white">
        {isLoading && (
          <td colSpan={columns?.length}>
            <LoadingBox message="Fetching resources..." />
          </td>
        )}

        {error && !isLoading && (
          <td colSpan={columns?.length}>
            {' '}
            <TableBodyNoData
              iconComponent={<LoadingAnimation />}
              title={error}
              columnsCount={
                selectableRows ? columns.length + 1 : columns.length
              }
            />
          </td>
        )}

        {!isLoading && !error && !rows?.length && (
          <td colSpan={columns?.length}>
            <NoContentBox
              message={noDataState?.title || 'No resources found'}
            />
          </td>
        )}
      </tr>

      {!isLoading
        && !error
        && rows?.map((row) => (
          <tr key={row.id}>
            {selectableRows && rows?.length && (
              <th>
                <label className="d-block m-0" htmlFor={row.id}>
                  <input
                    id="row.id"
                    name={row.id}
                    type="checkbox"
                    checked={selectableRows.selectedRows[row.id]}
                    onChange={toggleSelectRowHandler}
                  />
                  <div className="mx-auto" />
                </label>
              </th>
            )}

            {columns?.map((column, index) => {
              const isVisibleColumn = !hiddenColumns?.includes(column.prop);
              if (isVisibleColumn) {
                return React.isValidElement(row[column.prop]) ? (
                  <React.Fragment key={`column-${index}`}>
                    {row[column.prop]}
                  </React.Fragment>
                ) : (
                  <td
                    key={`column-${index}`}
                    className={column.align && `text-${column.align}`}
                  >
                    {column.format
                      ? column.format(row[column.prop])
                      : row[column.prop]}
                  </td>
                );
              }
              return null;
            })}
          </tr>
        ))}
    </StyledTbody>
  );
};

TableBody.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  rows: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      prop: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      align: PropTypes.string,
      format: PropTypes.func,
    }),
  ).isRequired,
  selectableRows: PropTypes.shape({
    selectedRows: PropTypes.objectOf(PropTypes.bool),
    setSelectedRows: PropTypes.func,
  }),
  hiddenColumns: PropTypes.arrayOf(PropTypes.string),
  noDataState: PropTypes.shape({
    title: PropTypes.string.isRequired,
    iconComponent: PropTypes.elementType.isRequired,
  }),
};

export default TableBody;
