import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TableBodyCellCustom = ({ children, onClick }) => (
  <StyledTd onClick={onClick}>
    {children}
  </StyledTd>
);

TableBodyCellCustom.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
};

const StyledTd = styled.td`
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'normal')};
`;

export default TableBodyCellCustom;
