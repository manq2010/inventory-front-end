import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const TableBodyCellWithTooltip = ({ text, tooltipText, onClick }) => (
  <StyledTd onClick={onClick}>
    <OverlayTrigger placement="top" overlay={<Tooltip id="table-cell-tooltip-top">{tooltipText}</Tooltip>}>
      <span>{text}</span>
    </OverlayTrigger>
  </StyledTd>
);

TableBodyCellWithTooltip.propTypes = {
  text: PropTypes.string.isRequired,
  tooltipText: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

const StyledTd = styled.td`
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'normal')};
`;
export default TableBodyCellWithTooltip;
