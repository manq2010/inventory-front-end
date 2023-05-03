import PropTypes from 'prop-types';
import styled from 'styled-components';

const TableImage = ({ src, alt }) => <Img src={src} alt={alt} />;

const Img = styled.img`
  max-width: 6rem;
  max-height: 6rem;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

TableImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default TableImage;
