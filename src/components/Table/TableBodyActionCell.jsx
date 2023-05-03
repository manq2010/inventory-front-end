import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { IChildrenNode } from 'types';

const TableBodyActionCell = ({ children }) => <StyledTd>{children}</StyledTd>;

TableBodyActionCell.propTypes = {
  children: PropTypes.node.isRequired,
};

const StyledTd = styled.td`
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 0.325em;
`;

export default TableBodyActionCell;
