import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TableBodyCell = ({ onClick, component }) => (
  <StyledTd onClick={onClick}>{component}</StyledTd>
);

TableBodyCell.propTypes = {
  onClick: PropTypes.func,
  component: PropTypes.element.isRequired,
};

const StyledTd = styled.td`
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'normal')};
`;

export default TableBodyCell;
