import PropTypes from 'prop-types';
import styled from 'styled-components';
import cx from 'classnames';
import { BsCaretUpFill, BsCaretDownFill } from 'react-icons/bs';
import { IColumn } from 'components';

const propTypes = {
  column: PropTypes.shape({
    label: PropTypes.string.isRequired,
    prop: PropTypes.string.isRequired,
    hideSortBy: PropTypes.bool,
    extraProps: PropTypes.object,
  }).isRequired,
  sortingBy: PropTypes.func,
  sorting: PropTypes.string,
};

const TableHeadCell = ({ column, sortingBy, sorting }) => {
  const { label, prop, extraProps } = column;

  return (
    <StyledTh {...extraProps} title={label} scope="row">
      <div>
        {label}
        {!column?.hideSortBy && sortingBy && (
          <div className="sorting">
            <BsCaretUpFill
              className={cx({ active: column.prop === sorting })}
              onClick={() => sortingBy(prop)}
            />
            <BsCaretDownFill
              className={cx({ active: `-${column.prop}` === sorting })}
              onClick={() => sortingBy(`-${prop}`)}
            />
          </div>
        )}
      </div>
    </StyledTh>
  );
};

TableHeadCell.propTypes = propTypes;

const StyledTh = styled.th`
  font-size: ${({ theme }) => theme.typography.small};

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2em;
  }

  .sorting {
    display: flex;
    flex-direction: column;
    gap: 0.1em;

    svg {
      width: 0.75em;
      height: 0.75em;

      :hover {
        transform: scale(1.3);
        cursor: pointer;
      }

      &.active {
        transform: scale(1.3);

        path {
          fill: ${({ theme }) => theme.colors.warning};
        }
      }
    }
  }
`;

export default TableHeadCell;
