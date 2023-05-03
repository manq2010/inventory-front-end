import PropTypes from 'prop-types';
import styled from 'styled-components';

const TableBodyEllipsisCell = ({ text }) => <StyledTd>{text}</StyledTd>;

TableBodyEllipsisCell.propTypes = {
  text: PropTypes.string.isRequired,
};

const StyledTd = styled.td`
  text-overflow: ellipsis;
  max-width: 15ch;
  overflow: hidden;
`;
export default TableBodyEllipsisCell;
