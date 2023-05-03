import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import {
  IColumn, IRow, ISelectableRows, TableHeadCell,
} from 'components';

const TableHead = ({
  sortingBy, columns, sorting, rows, hiddenColumns, selectableRows,
}) => {
  const handleChange = (e) => {
    const { checked } = e.target;
    selectableRows?.setSelectedRows(
      checked
        ? selectableRows?.allRowsSelected
        : selectableRows?.allRowsDeselected,
    );
  };

  return (
    <StyledThead>
      <tr>
        {selectableRows && !!rows?.length && (
          <th>
            <label htmlFor="label_id">
              <input
                id="label_id"
                name="toggle-select-all"
                type="checkbox"
                checked={
                  !isEmpty(selectableRows.selectedRows)
                  && Object.keys(selectableRows.selectedRows)
                    .every((rowId) => selectableRows.selectedRows[rowId])
                }
                onChange={handleChange}
              />
              <div className="sf-custom-checkbox-input mx-auto" />
            </label>
          </th>
        )}

        {columns?.map(
          (column) => !hiddenColumns?.includes(column.prop) && (
          <TableHeadCell
            key={column.prop}
            column={column}
            sortingBy={sortingBy}
            s
            orting={sorting}
          />
          ),
        )}
      </tr>
    </StyledThead>
  );
};

TableHead.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    prop: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    sortable: PropTypes.bool,
    sortValue: PropTypes.string,
    tooltip: PropTypes.string,
    width: PropTypes.string,
    align: PropTypes.oneOf(['left', 'center', 'right']),
  })).isRequired,
  hiddenColumns: PropTypes.arrayOf(PropTypes.string),
  rows: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    cells: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
      component: PropTypes.elementType,
    })).isRequired,
  })),
  sortingBy: PropTypes.func,
  sorting: PropTypes.oneOf(['asc', 'desc']),
  selectableRows: PropTypes.shape({
    allRowsSelected: PropTypes.objectOf(PropTypes.bool).isRequired,
    allRowsDeselected: PropTypes.objectOf(PropTypes.bool).isRequired,
    selectedRows: PropTypes.objectOf(PropTypes.bool).isRequired,
    setSelectedRows: PropTypes.func.isRequired,
  }),
};

const StyledThead = styled.thead`
  text-transform: capitalize;
  font-size: 13px;
  line-height: 19px;
  color: ${({ theme }) => theme.colors.grey.light};
  letter-spacing: 0.4px;
  position: relative;

  > tr {
    > th {
      position: sticky;
      top: 0;
      text-align: left;
      background-color: ${({ theme }) => theme.colors.white};

      &.sticky {
        z-index: 2;
        left: 2px;
      }

      &.action-cell {
        > div {
          justify-content: center;
        }
      }
    }
  }
`;

export default TableHead;
